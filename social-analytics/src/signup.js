const express = require('express')
const app = express()

const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

app.get('/', (req, res) => 
		{
			console.log("starting user data entry");
			let params = {
		        TableName: "Users",
		        Item: {
		            "username":  req.query.name,
		            "email": req.query.email,
		            "password": req.query.password,
		            "int id":  4
		        }
		    };
			//console.log(req.query.name)
			docClient.put(params, function(err, data) {
		       if (err) {
		           console.error("Unable to add user", req.query.name, ". Error JSON:", JSON.stringify(err, null, 2));
		       } else {
		           console.log("PutItem succeeded:", req.query.name);
		       }
		    });

		}

	)

app.listen(3000, () => console.log('Example app listening on port 3000!'))