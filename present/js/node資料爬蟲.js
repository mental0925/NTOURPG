var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

request({
  url: "http://www.cwb.gov.tw/V7/observe/24real/Data/46694.htm",
  method: "GET"
}, function(error,response,body){
	if(error || !body){ return; }
	var $ = cheerio.load(body);
	var time = [];
	var degreesC = [];
	var degreesF = [];
	var weather = [];
	var result;
	var th = $("th");
	var td = $("td");
	time.push($(th[12]).text());
	degreesC.push($(td[0]).text());
	degreesF.push($(td[1]).text());
	weather.push($(td[2]).text())
	result = "time: " + time + ", " + "degrees C: " + degreesC + ", " + "degrees F: " + degreesF + ", " + "weather: " + weather;

	fs.writeFileSync("result.json", JSON.stringify(result));
});