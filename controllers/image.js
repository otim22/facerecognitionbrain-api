const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b0a3eb28e59241b59a56c2cf0378634e'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL, 
            req.body.input
        )   
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}
const handleImage = (req, res, dbConnect) => {
    const { id } = req.body;
    dbConnect('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};