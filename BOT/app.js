var restify = require('restify');
var botbuilder = require('botbuilder');


// setup restify server

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 39887, function(){
    console.log('%s bot started at %s', server.name, server.url);
});

// create chat connector
var connector = new botbuilder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_SECRET
});

// listening for user inputs
server.post('/api/messages', connector.listen());

var bot = new botbuilder.UniversalBot(connector, function(session){
    session.send('tu as dis " %s " Le nombre de caractères de cette phrase est de %s ', session.message.text, session.message.text.length);
    bot.on('typing', function () {
        session.send('Tu es en train de chercher tes mots ?');
    });

   bot.on('conversationUpdate', function(message) {

   if (message.membersAdded && message.membersAdded.length > 0) {

       var membersAdded = message.membersAdded.map(function (x) {
                var isSelf = x.id == message.address.bot.id;
                return (isSelf ? message.address.bot.name : x.name) || ' ' + '(Id=' + x.id + ' )'
            }).join(', ');

       bot.send(new botbuilder.Message()
            .address(message.address)
            .text('Bienvenue dans le salon ' + membersAdded));
        }
        if (message.membersRemoved[i].id === botId) {
            // Say goodbye
            var reply = new builder.Message()
                    .address(message.address)
                    .text('Goodbye' + membersRemoved);
            bot.send(reply);
        
        }
   });
});
