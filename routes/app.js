var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.post("/api/Upload", function(req, res) {
//     return res.end("File uploaded sucessfully!.");
//     // upload(req, res, function(err) {
//     //     if (err) {
//     //         return res.end("Something went wrong!");
//     //     }
//     //     return res.end("File uploaded sucessfully!.");
//     // });
// });
module.exports = router;
