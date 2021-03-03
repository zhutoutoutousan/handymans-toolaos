const unirest = require("unirest");
const http = require("http");


const host = 'localhost';
const port = 8000;

const req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("Damn first server!")
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})


req.headers({
	"x-rapidapi-key": "01d2e20bdcmsh8a5d12dca861bd4p143d8ajsn0451386595eb",
	"x-rapidapi-host": "covid-193.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});