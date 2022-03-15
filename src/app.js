const express = require('express');
//const Container = require('./Managers/Container');
const {Server} = require('socket.io');
const {products,messages} = require ('./options/DB.js')
const routes = require ('./routes/routes.js')

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
const io = new Server(server);
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));

app.use('/',routes);
let log = []




io.on('connection',async socket=>{
    console.log("Cliente conectado");
    let items = await products.getAll();
    io.emit('products',items);
    socket.broadcast.emit('newUser')

    socket.on('sendProduct',async data=>{
        await products.add(data);
        let items = await products.getAll();
        let productsList = JSON.parse(JSON.stringify(items))
        io.emit('productLog', productsList);
    })

    socket.on('sendMessage',async data=>{
        await messages.add(data);
        let items = await messages.getAll();
        let messagesList = JSON.parse(JSON.stringify(items));
        io.emit('messagesLog',messagesList);
    })

    socket.on('registered',data=>{
        socket.emit('messages',messages);
    })
    
})