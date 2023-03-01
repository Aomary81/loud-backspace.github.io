import * as React from 'react';

const GetUserName = () =>{
	App.get('/api/data',function(req,res){
		const collection = db.collection('users');
		const query = {
			first: first_name,
			last: last_name
		};

		collection.find({query}).toArray(function(err,data){
			if(err) throw err;

			res.send(data);
		})
	})
};

