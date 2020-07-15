/**
* Upload bulk of data into MongoDB 
* 1. Read bulk data from CSV using csvtojson
* 2. Import CSV data to MongoDB Database using mongodb module
* 
* Run command
* npm install csvtojson
*/

//Create object of MongoClient
const mongodb = require("mongodb").MongoClient;

//Create object of csvtojson
const csvtojson = require("csvtojson");

//Specify a connection URL with the ip address
let url = "mongodb://localhost:27017/";

//Parse the data to JSON format from a CSV file
csvtojson()
  .fromFile("dow_jones_index.csv")
  .then(csvData => {
    console.log(csvData);

	//Make connection to mydb database and insert JSON data	
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("mydb")
          .collection("dow_jones_index")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });