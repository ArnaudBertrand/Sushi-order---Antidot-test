// This should be replace by a database, it is just a temporary in memory saving
Orders = [];

var order = {
  create: function create(req, res) {
    var sushis = req.body.sushis;
    console.log(req.body);

    // ID generator -- from stackoverflow
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    // Check if we have the ingredient
    for(var i = 0; i < sushis.length; i++){
      if(['Hotategai','Tobiko','Koni','Unaghi'].indexOf([sushis[i]]) > -1){
        return res.send({
            error: {
              type: 'Sushi not existing',
              message: 'We do not have make any ' + sushis[i] + ' sushis.'
            }
          }, 404);
      }
    }

    // 30% we are missing salmon
    if(Math.random()< 0.3) {
      return res.send({
          error: {
            type: 'Missing ingredient',
            message: 'No more salmon'
          }
        }, 503);
    }

    // Create the order with the ID + keep it in memory
    var order = {sushis: sushis, customer: req.body.customer};
    order.orderId = (S4()+"-"+S4());
    // Estimated end 10m +0 to 5m
    order.estimateEnd = Date.now() + 1000*60*(10+Math.random()*5);
    console.log(order);
    Orders.push(order);

    // Send back the ID
    res.send(order.orderId);

    // Print the id in the console
    console.log(order.orderId);
  }
};

var status = {
  get: function get(req,res){
    var id = req.query.orderId;
    // Check if we have the order
    for(var i = 0; i < Orders.length; i++){
      var order = Orders[i];
      console.log('tbleau'+ order.orderId);
      if(order.orderId === id){
        // Add estimate time
        order.eta = Math.round((order.estimateEnd - Date.now())/60000);
        if(order.eta < 0) order.eta = 0;
        // Add status
        order.status = order.eta? 'busy': 'ready';
        return res.send(order);
      }
    }

    // In case nothing is found
    return res.send({
      error: {
        type: 'Order not existing',
        message: 'Please verify order ID.'
      }
    }, 404);
  }
};


var handler = {
  order: order,
  status: status
};

module.exports = handler;