const Places = require('../../db/models/list/index')

module.exports.add = (req, res) => {
  const body = req.query
  res.set('Access-Control-Allow-Origin', '*');
  const place = new Places({
    place: body.place,
    date: body.date,
    price: body.price
  });
  place.save().then(result => {
    res.send(result);
  });

};
module.exports.show = (req, res) => {
  Places.find().then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });

};
module.exports.update = (req, res) => {
  const body = req.query
  res.set('Access-Control-Allow-Origin', '*');
    Places.updateOne({_id: body._id}, {
      $set: {
        place: body.place,
        date: body.date,
        price: body.price
      },
    }).then(result => {
      Places.find().then((result) => {
        res.send(result);
      });  
    });

};
module.exports.del = (req, res) => {
  const id = req.query._id;
  if (id) {
    Places.deleteOne({ _id: id }).then((result) => {     
      res.send(result);
    }).catch((err) => {
        res.send(err);
    });

  }
};