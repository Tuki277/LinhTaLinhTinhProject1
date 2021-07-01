var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/sentMessage', function(req, res, next) {
  const { message, username } = req.body
  res.status(201).json({ success: true })
  req.app.io.emit('data', { message: message, username: username })
  next()
});

module.exports = router;