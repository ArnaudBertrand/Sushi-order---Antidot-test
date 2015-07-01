# Subject of the test
Test objective:
Develop Client module for Sushi ordering and knowing when they are ready.

### Conditions: 
Client will rely on a REST Server which is not ready yet

We know that it will implement:

### Ordering a sushi : order?{sushi=....}+
Example: order?sushi=Hotategai&sushi=Kani.

Available sushis: Hotategai, Tobiko, Kani, Unagi.
Return: 
- Success: 200 along with order ID
- Fail: 404 if sushi not existing
- Fail: 503 if order cannot be done with an explication (ex: No more salmon)

### Know if an order is ready : status?orderId=...
Return:
- Success: 200 along with JSON order details such as { orderId : 10, status : 'ready' or 'busy', eta : number_of_min_remaining }
- Fail: 404, order not found

Bonus : Add synchronous mode to alert client when order is ready

---

# Overall implementation
In order to realise the application properly I decide to make a sample of a REST server to be able to have an actual communication between Client and Server.

All the Client application is available in the Client folder.
All the Server application is available in the Server folder.
The server being just a prototype will not implement any Database, the order informations will be stocked in memory until the program runs and then disappear when the program stop.
By default the Server will listen on port 3000.
By default the Client app will query the server on localhost:3000

Client part has been developed under AngularJS
Server part has been developed under NodeJS (Express)

# How to test the application
In order to test the application:
- Download NodeJS if you do not have it already
- Launch the server app.js with NodeJs*
- Open the Client page: client/bin/index.html*

Feel free to modify the server part to create new errors and see how the application reacts.

*go into the server repository with the node command and type "node app.js"
*the bin repository is all your need to test the client application

---

# Implementation choices

### Ordering a sushi
Rather than doing an HTTP GET with url parameters for sushi selection I decided to implement a POST request that could handle more data. In a REST architecture the creation of object should be handled by POST anyway and here we are creating an order. Being able to do a post allowed me to share more details on the order such as the customer informations as well for example.

### Errors messages
Errors message are handled as follow: `{error:{type: '....',message: '...'}}`. Errors status are the same as requirements.

An error has been especially created on the server 30% of the time when ordering. It will say that we do not have enough salmon to make your sushi.

### Handling customer feedback on preparation
Once accessing the status page (either by completing an order or finding it through the search engine) the client will poll once every minute the server to get the status of the preparation.
I decided to make short port rather than long poll, streaming or websockets.
This choice rely on the fact that the user doesn't need any timely precise information on the order, being 1 or 2 minutes late or early won't change anything to him.
Therefore the best choice was to implement short polling every minute rather then having to stream every time data changes on the server, the server computation will be lower.
Furthermore we'll encounter less problems with requests/connexions.

---

# Possible ameliorations
- Develop unit tests (not implemented by lack of time)
- Use a real database on the server side
- Use CSS transitions to give a better user experience
- Send an e-mail when ordering
- Responsive design


If you have any question feel free to contact me :).
