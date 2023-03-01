import * as React from 'react';

const GetUserZip = () =>{
	App.get('/api/data/:zipcode',function(req,res){
		const collection = db.collection('users');

		collection.find({zipcode:req.params.zipcode}).toArray(function(err,data){
			if(err) throw err;

			res.send(data);
		})
	})
};

