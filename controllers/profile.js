const handleProfileGet = (req, res) => {
    const { id } = req.params;
    dbConnect.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Profile not found');
            }
        })
        .catch(err => err.status(400).json('Error getting user'))
}

module.exports = {
    handleProfileGet
};