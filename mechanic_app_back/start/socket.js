'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')
// Ws.channel('maps:*', 'MapsController')//.middleware(['auth:jwt'])
Ws.channel('services:*', 'ServicesRequestController')//.middleware(['auth:jwt'])



// Ws.channel('mechanicapp', ({ socket }) => {
//     console.log('a new subscription for news topic')
//     socket.emit('receive_request_service', 'Hello world')
//   })


// Ws.channel('mechanicapp', function (socket) {
//     socket.on('send_location', function (mensaje) {
//         console.log("message location: ", mensaje)
//         console.log("holassssssssssssssssssss")
//         //Ws.send('putita ');
//         // socket.emit("send_location", "putita");
//     })
//     socket.emit('receive_request_service', {
//         msg: 'dime si te llega este emit desde receive_request_service'
//     })
// })
// Ws.channel('mechanic_app', function (socket) {
//     console.log("hola: ")
//     console.log(socket.id)
//     socket.on('send_location', function (mensaje) {
//         console.log("message location: ", mensaje)
//         console.log("holassssssssssssssssssss")
//         //Ws.send('putita ');
//         // socket.emit("send_location", "putita");
//     })



//     socket.emit('receive_request_service', {
//         msg: 'dime si te llega este emit desde receive_request_service'
//     })

// })//.middleware('auth')


