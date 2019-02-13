const Clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: 'b60c3f919c674bfbad76549811c52d94'
});


const handleApiCall = (req, res) => {
  app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
  .then(data=>{
    res.json(data)
  })
  .catch(err=>res.status(400).json('unable to work with API'))
}

const handleImageUpload = (req, res, db)=>{
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries)
    })
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
  handleImageUpload: handleImageUpload,
  handleApiCall: handleApiCall
}
