const fs = require('fs');

const pathToChatLog = __dirname + '/../files/chatLog.json'

class Chat{
    saveChat = async(chat) =>{
        if(!chat.name || !chat.mail || !chat.message) return {status:"error",error: "missing data"}
        try{
            if(fs.existsSync(pathToChatLog)){
                const data = await fs.promises.readFile(pathToChatLog, 'utf-8');
                const chatLog = JSON.parse(data);
                if(chatLog.length === 0){
                    chat.id = 1;
                }else{
                    const id = chatLog[chatLog.length-1].id+1;
                    chat.id = id;
                }
                chatLog.push(chat);
                await fs.promises.writeFile(pathToChatLog,JSON.stringify(chatLog,null,2));
                return {status:"success,",message:"Chat saved"};
            }else{
                chat.id = 1;
                await fs.promises.writeFile(pathToChatLog,JSON.stringify([chat],null,2));
                return {status:"success,",message:"Chat saved"};
            }
        }catch(error){
            return {status: "error", message: error}
        }
    }
    getChatLog = async () =>{
        if(fs.existsSync(pathToChatLog)){
            try{
                const data = await fs.promises.readFile(pathToChatLog, 'utf-8');
                const chatLog = JSON.parse(data); 
                return {status: "succes", payload:chatLog}
                }catch(error){
                    return {status: "error",error:error}
            }
        }

    }
}

module.exports = Chat;
