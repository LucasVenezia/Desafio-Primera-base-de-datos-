
const express = require('express');
const Container = require('./Managers/Container');
const {Server} = require('socket.io');

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
const io = new Server(server);
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public'));


let log = []

productService = new Container();


io.on('connection',async socket=>{
    console.log("Cliente conectado");
    let products = await productService.getAll();
    io.emit('products',products);
    socket.broadcast.emit('newUser')

    socket.on('sendProduct',async data=>{
        await productService.addProduct(data);
        let products = await productService.getAll();
        io.emit('productLog',products);
    })

    socket.on('message',data=>{
        log.push(data);
        io.emit('log',log);
    })

    socket.on('registered',data=>{
        socket.emit('log',log);
    })
    
})
console.log(log);


