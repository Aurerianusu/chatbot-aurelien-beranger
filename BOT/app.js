var restify = require('restify');
var botbuilder = require('botbuilder');

//we setup restify

var server = restify.createServer();
	server.listen(process.env.port || process.env.PORT || 3987, function(){
	console.log('%s bot started at %s', server.name, server.url);
});

//Chat connector
var connector = new botbuilder.ChatConnector({
	appId: process.env.APP_ID,
	appPassword: process.env.APP_SECRET
})


//Listenning
server.post('/api/messages', connector.listen());

// Create bot and default message handler
var bot = new botbuilder.UniversalBot(connector, function (session) {
    session.sendTyping();
    setTimeout(function () {
        session.send("tu écris lentement...");
    }, 10000);
});
