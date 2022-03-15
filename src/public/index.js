const socket = io();

let form = document.getElementById("productForm");
form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val,key)=>sendObj[key] = val);
    socket.emit("sendProduct", sendObj);
    form.reset();
})

let user;

let chatBox = document.getElementById("chatBox");

Swal.fire({
    title: 'Identificate con tu Email',
    input: 'email',
    inputLabel: 'Direccion de Email',
    inputPlaceholder: 'ingresa tu Email',
}).then(result=>{
    user=result.value;
    socket.emit('registered',user);
})
chatBox.addEventListener('keyup',(evt)=>{
    
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            let date = new Date();
            const formatDate = (current_datetime)=>{
                let formatted_date = "[" + current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() + "]";
                return formatted_date}
            socket.emit('sendMessage',{user:user,timeStamp:formatDate(date),message:chatBox.value.trim(),})
            chatBox.value="";
        }
    }
})

socket.on('productLog',(productsList)=>{
    let products = productsList;
    console.log(products);
    let productsTemplate = document.getElementById("productsTemplate");
    fetch('templates/products.handlebars').then(response=>{
        return response.text();
    }).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({products})
        productsTemplate.innerHTML = html;
    })
})

socket.on('newUser',(data)=>{

    alert("New user");
    
    Swal.fire({
        icon:"success",
        text:"Usuario nuevo conectado",
        toast:true,
        position:"top-right",
    })
})
socket.on('messagesLog', messagesList=>{
    let log = document.getElementById('log')
    let messages = "";
    messagesList.forEach(message=>{
        messages  = messages+ `${message.user} ${message.timeStamp} dice: ${message.message}</br>`;
    })
    log.innerHTML = messages;
})



