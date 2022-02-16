const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const Schema = mongoose.Schema

const placesScheme = new Schema({
  place: String,
  date: String,
  price: Number
})
app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb+srv://Storchak:Storchak123@snexceedteam.2jz2o.mongodb.net/SNExceedTeam?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const Places = mongoose.model('places', placesScheme);
app.post('/add', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const place = new Places({
    place: req.query.place,
    date: req.query.date,
    price: req.query.price
  });
  place.save().then(result => {
    res.send(result);
  });
});
app.get('/show', (req, res) => {
  Places.find().then((result) => {
    res.send(result);
  }).catch((err) => {
      res.send(err);
  });
})
app.patch('/update', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
    Places.updateOne({_id: req.query._id}, {
      $set: {
        place: req.query.place,
        date: req.query.date,
        price: req.query.price
      },
    }).then(resu => {
      Places.find().then((result) => {
        res.send(result);
      });  
    })
})
app.delete('/delete', (req, res) => {
  const id = req.query._id;
  if (id) {
    Places.deleteOne({ _id: id }).then((result) => {     
      res.send(result);
    }).catch((err) => {
        res.send(err);
    });
  }
})
app.listen(8000, () => {
  console.log('app is listening on port 8000')
})