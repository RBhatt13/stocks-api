/**
* Add/Insert new record into MongoDB 
*
* Prerequisites:
  1. Download and install mongodb package:
	C:\Users\Your Name>npm install mongodb
*/

//Create object of MongoClient
var MongoClient = require('mongodb').MongoClient;

//Specify a connection URL with the ip address
var url = "mongodb://localhost:27017/";

//Make connection to mydb database
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { stock: "AA", date: "7/14/2020" , percent_change_price: "2.0"};
  dbo.collection("dow_jones_index").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("record inserted");
    db.close();
  });
});
