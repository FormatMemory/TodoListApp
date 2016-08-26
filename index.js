//home page
var express = require('express');
var app = express();
var router = express.Router();
/* GET HOME PAGE Hello World page.  */
router.get('/', function(req, res) {
    res.send('This site is under construction....');
});

/* GET ABOUT PAGE*/
router.get('/about', function(req, res){
    res.send('About me: contact me via: davidthinkleding AT Gmail');
});
module.exports = router;
