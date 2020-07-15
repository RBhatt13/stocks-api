/**
* Query for data by stock ticker and save data into Google sheet document 
*
* Prerequisites:
  1. NodeJS
  2. npm install request
  3. npm install cheerio
  4. npm install edit-google-spreadsheet
*/
//Global Parameters
var request     = require('request');
var cheerio     = require('cheerio');
var googleSpreadsheet = require('edit-google-spreadsheet');
var ticker  = "LVS";
var yahooUrl    = "http://finance.yahoo.com/q/ks?s=" + ticker;
var financeDetails = new Array();
var kerString         = new Array();

// Fetch data from yahoo finance 
request(yahooUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);

    // get the keys
    var td = $('.yfnc_tablehead1');
    $(td).each(function(j, val) {
      kerString[j] = $(val).text();
    });

    // get the values
    var tData = $('.yfnc_tabledata1');
    $(tData).each(function(j, val) {
      financeDetails[j] = $(val).text();
    });

    for (var i=0; i < financeDetails.length; i++) {
      console.log (i + ") " + kerString[i] + " " + financeDetails[i]);
    }

    // create googlesheet and upload data to Google sheet
    googleSpreadsheet.create({
      debug: true,
      username: 'TODO-enter username',
      password: 'TODO-enter password',
      debug: true,
      spreadsheetName: 'TODO-enter sheetName',
      worksheetName: 'TODO-enter worksheet name',
      callback: sheetReady
    });
  }

// Upload data to GoogleSheet
function sheetReady(err, spreadsheet) {
    if (err) throw err;
    spreadsheet.add({ 1: { 1: "Attribute" } });
    spreadsheet.add({ 1: { 2: "Value" } });
   
    spreadsheet.add({ 
      2: {
        1: kerString
      }
    });
    spreadsheet.add({ 
      2: {
        2: financeDetails
      }
    });

    spreadsheet.send(function(err) {
      if(err) throw err;
      console.log("Updated " + financeDetails.length + " Items with data");
    });
  }
  
});