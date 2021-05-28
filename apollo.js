var { ApolloServer, gql, PubSub } = require("apollo-server-express");
var pubsub = new PubSub();

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

setInterval(() => {
	var x = Math.floor(Math.random() * 30);  // 센서 데이터 자리, 일단 랜덤
	pubsub.publish("monitoring", {
		value: x,
	});
	console.log(x);  // test
}, 1000);

var apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

module.exports = apolloServer;
