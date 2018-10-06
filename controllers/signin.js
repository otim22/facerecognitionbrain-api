const jwt = require('jsonwebtoken');
const redis = require("redis");

// Setup redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (dbConnect, bcrypt, req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return Promise.reject('Incorrect form submission');
    }
    return dbConnect.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return dbConnect.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject('Unable to get user.'))
            } else {
                Promise.reject('Wrong credentials');
            }
        })
        .catch(err => Promise.reject('Wrong credentials'))
}

const getAuthTokenId = () => {
    console.log('auth okay');
    const { authorization } = req.headers;
    redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorized')
        }
        return res.json({ id: reply })
    })
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days'});
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
    // JWT Token, return user data
    const { email, id } = user;
    const token = signToken(email);
    return setToken(token, id )
        .then(() => { 
            return { success: 'true', userId:id, token } 
        })
        .catch(consoe.log)
}

const signinAuthentication = (dbConnect, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId() : 
        handleSignin(dbConnect, bcrypt, req, res)
            .then(data => {
                return data.id && data.email ? createSessions(data) : Promise.reject(data)
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    signinAuthentication: signinAuthentication
};


