var faye         = require('faye'),
    express      = require('express'),
    bayeux       = new faye.NodeAdapter({mount: '/faye'})
    serverClient = bayeux.getClient(),
    app      = express();


// serverClient.subscribe('')
var chatLogs = []
var consoleLogger = function(type) {
  return function(message, callback) {
    console.log(type + ': ' + JSON.stringify(message, null, 4))

    callback(message)
  }
}

var consoleLoggerExtension = {
  incoming: consoleLogger('incoming'),
  outgoing: consoleLogger('outgoing'),
}
bayeux.addExtension(consoleLoggerExtension)

// Configure and start the app
app.use(express.static(__dirname));
app.use(bayeux);

app.listen(3000);
