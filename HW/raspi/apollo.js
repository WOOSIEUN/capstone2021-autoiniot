// apollo
var { ApolloServer, gql, PubSub } = require("apollo-server");
var pubsub = new PubSub();

// arduino
var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
var serial = new SerialPort('/dev/ttyACM0', 9600);
var parser = serial.pipe(new Readline({ delimiter: '\r\n' }));

// mysql
var db = require('./db');

// graphql
var typeDefs = gql`
  type Query {
    _: String
  }
  type Subscription {
    value: String
  }
`;
var resolvers = {
	Subscription: {
		value: {
			subscribe: () => pubsub.asyncIterator("monitoring")
		},
	},
};

// publish
parser.on('data', (data) => {
	var rfid = data.substring(0, 8);
	var monitoringData = data.substr(9);
	var monitoringArr = monitoringData.split('#');  // db로 올리기?
	pubsub.publish("monitoring", { value: monitoringData });
	if (rfid !== 'FFFFFFFF') {
		db.query(`UPDATE warehouse SET received = 1 WHERE rfid = '${rfid}';`, (err, result) => {
			if (err) throw err;
		});
	}
	console.log(data); // print
});

module.exports = new ApolloServer({
	typeDefs,
	resolvers,
});
