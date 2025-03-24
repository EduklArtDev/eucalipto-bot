//imprts 
import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { menu } from './eucalipto/eucalipto-menu1'
import { messageDefault } from './eucalipto/e-mess01'
//...
const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr',qr=>{
    console.log('Rec qrCode!!!')
    qrcode.generate(qr,{small:true})//QR Code terminal
})

client.on('ready',()=>{
    console.log('Cliente ta on heheh!!!')
})

client.on('auth_failure', msg => {
    console.error('Falha na autenticação:', msg);
});

client.on('disconnected', reason => {
    console.log('Bot desconectado:', reason);
});
//mess act
console.log("Inicializando o cliente...");
//...
client.on('message', message=>{
    const content = message.body
//switch>
    switch (content) {
        case '.menu':
        
        client.sendMessage(message.from,menu)

            break;

            case '.nuke01':
                client.sendMessage(message.from,'cu')
    
        default:
        client.sendMessage(message.from,messageDefault)
            break;
    }
    //switch<
})



//ini
client.initialize(); 

