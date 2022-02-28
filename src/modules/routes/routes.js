const express = require('express');
const router = express.Router();

const {
  add,
  show,
  update,
  del
} = require('../controllers/list.controller');

router.post('/add', add)
router.get('/show', show)
router.patch('/update', update)
router.delete('/delete', del)

module.exports = router