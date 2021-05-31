// login
var request = require('request');
var id = 'testid'
var pw = 'testpw'
var ip = '192.168.0.2'
var port = 3000
request.post({
	url: `http://${ip}:${port}/login`,
	body: { id: id, password: pw },
	json: true
}, (error, response, body) => {
	if (body === 'login success') {
		console.log(body + '\n');
	}
	else {
		console.log('login error: ' + body + '\n');
		process.exit(1);
	}
});

// apollo-server start
var apolloServer = require('./apollo');
apolloServer.listen().then(({ url }) => {
	console.log(`Listening at ${url}\n`);
});
