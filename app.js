const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
const apiRoutes = require('./src/modules/routes/routes')
app.use('/', apiRoutes);
const url = 'mongodb+srv://Storchak:Storchak123@snexceedteam.2jz2o.mongodb.net/SNExceedTeam?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(8000, () => {
  console.log('app is listening on port 8000');
});