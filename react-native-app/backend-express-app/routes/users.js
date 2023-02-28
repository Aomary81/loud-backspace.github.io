const router = require('express').Router();
const MongoClient = require(require('mongodb').MongoClient;
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:'+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/edit/:emailHash/:passwordHash/desc').post((req,res) => {
	const emailHash = req.params.emailHash;
	const passwordHash = req.params.passwordHash;
	
	MongoClient.connect(url, function(err,db){
		
		if(err)throw err;
		
		//blocking collection name
		const collection = db.collection('needs_name');
		
		collection.updateOne({email_hash: emailHash},{$set: {desc: req.body.desc}}, function(err,result){
			
			if(err) throw err;
			
			db.close();
			
			res.send("Description for " + emailHash + " updated");
		});
		
	});
});

module.exports = router;