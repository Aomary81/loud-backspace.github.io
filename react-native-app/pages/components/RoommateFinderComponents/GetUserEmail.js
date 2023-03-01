import * as React from 'react';

const GetUserEmail = () =>{
	App.get('/api/data/:email',function(req,res){
		const collection = db.collection('users');

		collection.find({email:req.params.email}).toArray(function(err,data){
			if(err) throw err;

			res.send(data);
		})
	})
};

