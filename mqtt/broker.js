var mosca = require('mosca');
var options = {
  http: {
    port: 1234,
    bundle: true,
    static: './'
  }
}
var broker = new mosca.Server(options);

var listaEstadistica = [];

broker.on('ready', () => {
  console.log('Broker ready!!');
})

// cuando se publica un topico
broker.on('published', (packet) => {
  console.log(packet.topic, ":", packet.payload.toString());
  if (packet.topic.toString() == "estadistica") {
    listaEstadistica.push(JSON.parse(packet.payload.toString()));
    var message = {
      topic: 'nuevaLista',
      payload: JSON.stringify(listaEstadistica)
    };
    broker.publish(message);
  }
})

broker.on('clientConnected', (client) => {
  console.log('Client connected: ', client.id);
})