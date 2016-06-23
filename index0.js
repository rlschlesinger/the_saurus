var Botkit = require('botkit');
var request = require('request');
var controller = Botkit.slackbot();


controller.hears(['find me synonyms for (.*)', 'what\'s a synonym for (.*)', 'another word for (.*)', 'look up words for (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    //Collects requested word
    var word = match[1];
    //Inserts word into API URL
    var call_url= "http://words.bighugelabs.com/api/2/7392cb19fe886bdec50889e5daa11166/"+ word + "/json";
    //Bot starts conversation

    //Calls API
    request(call_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        api_object = JSON.parse(body);
        var index = 0;
        var synonyms = null;
        var synonym_length = null;
      }

      else {
        console.log(error);
        bot.reply(message, 'I don\'t know what you are saying');
        convo.stop();
      }
      bot.startConversation(message,function(err,convo) {
        convo.ask('Are you looking for an adjective, a noun, or a verb?',function(response,convo) {
          if (response.text === 'Adjective' || response.text === 'adjective' || response.text === 'Adj' || response.text === 'adj'){
            if(api_object.hasOwnProperty('adjective')){
              var synonyms = api_object.adjective.syn;
              var synonym_length = synonyms.length;
              convo.stop();
              bot.startConversation(message,function(err,convo) {
                convo.ask('How about ' + synonyms[index] + '?',function(response,convo) {
                  if (response.text !== 'yes'){
                    bot.reply(message, 'Not biting huh?');
                    convo.next();
                  }
                  else {
                    bot.reply(message, 'Happy to help!');
                  convo.stop();
                  }
                });
                index++;
                convo.ask('Ok, what about ' + synonyms[index] + '?',function(response,convo) {
                  if (response.text !== 'yes'){
                    bot.reply(message, 'C\'mon, I\'m going extinct here.');
                    convo.next();
                  }
                  else {
                    bot.reply(message, 'Happy to help!');
                    convo.stop();
                  }
                });
                index++;
                convo.ask('Last one. How about ' + synonyms[index] + '?',function(response,convo) {
                  if (response.text !== 'yes'){
                    bot.reply(message, 'That\'s all I got. Try asking another word.');
                    convo.stop();
                  }
                  else {
                    bot.reply(message, 'Happy to help!');
                    convo.stop();
                  }
                });
              })
            }
            else{
              bot.reply(message, 'I couldn\'t dig up what you were looking for. Why don\'t you try another word?');
              convo.stop();
            }
          }
          else if(response.text === 'Noun' || response.text === 'noun') {
            if(api_object.hasOwnProperty('noun')){
              var synonyms = api_object.noun.syn;
              var synonym_length = synonyms.length;
              convo.stop();
              bot.startConversation(message,function(err,convo) {
              convo.ask('How about ' + synonyms[index] + '?',function(response,convo) {
                if (response.text !== 'yes'){
                  bot.reply(message, 'Not biting huh?');
                  convo.next();
                }
                else {
                bot.reply(message, 'Happy to help!');
                convo.stop();
                }
              });
              index++;
              convo.ask('Ok, what about ' + synonyms[index] + '?',function(response,convo) {
                if (response.text !== 'yes'){
                  bot.reply(message, 'C\'mon, I\'m going extinct here.');
                  convo.next();
                }
                else {
                bot.reply(message, 'Happy to help!');
                convo.stop();
                }
              });
              index++;
              convo.ask('Last one. How about ' + synonyms[index] + '?',function(response,convo) {
                if (response.text !== 'yes'){
                  bot.reply(message, 'That\'s all I got. Try asking another word.');
                  convo.stop();
                }
                else {
                bot.reply(message, 'Happy to help!');
                convo.stop();
                }
              });
              })
            }
            else{
              bot.reply(message, 'I couldn\'t dig up what you were looking for. Why don\'t you try another word?');
              convo.stop();
            }
          }
          else if(response.text === 'Verb' || response.text === 'verb') {
            if(api_object.hasOwnProperty('verb')){
              var synonyms = api_object.verb.syn;
              var synonym_length = synonyms.length;
              convo.stop();
              bot.startConversation(message,function(err,convo) {
              convo.ask('How about ' + synonyms[index] + '?',function(response,convo) {
                if (response.text !== 'yes'){
                  bot.reply(message, 'Not biting huh?');
                  convo.next();
                }
                else {
                bot.reply(message, 'Happy to help!');
                convo.stop();
                }
              });
              index++;
              convo.ask('Ok, what about ' + synonyms[index] + '?',function(response,convo) {
                if (response.text !== 'yes'){
                  bot.reply(message, 'C\'mon, I\'m going extinct here.');
                  convo.next();
                }
                else {
                bot.reply(message, 'Happy to help!');
                convo.stop();
                }
              });
              index++;
              convo.ask('Last one. How about ' + synonyms[index] + '?',function(response,convo) {
                if (response.text !== 'yes'){
                  bot.reply(message, 'That\'s all I got. Try asking another word.');
                  convo.stop();
                }
                else {
                bot.reply(message, 'Happy to help!');
                convo.stop();
                }
              });
              })
            }
            else {
              bot.reply(message, 'I couldn\'t dig up what you were looking for. Why don\'t you try another word?');
              convo.stop();
            }
          }
          else {
            bot.reply(message, 'I\'m only a dinosaur; I can only find adjectives, nouns, or verbs. Try another word.');
            convo.stop();
          }
        });
      })
    })
});

var bot = controller.spawn({
  token:require('./config').token
});

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});
