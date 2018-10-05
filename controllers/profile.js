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

const handleProfileUpdate = (req, res) => {
    const {id} = req.params;
    const { name, age, pet } = req.body.formInput;
    dbConnect('users')
        .where({id})
        .update({name})
        .then(resp => {
            if (resp) {
                res.json("success")
            } else {
                res.status(400).json("Unable to update")
            }
        })
        .catch(err => res.status(400).json("Error Updating user"))
}

module.exports = {
    handleProfileGet,
    handleProfileUpdate
};