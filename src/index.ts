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
client.on('message', async message=>{
    const content = message.body
//switch>
    switch (content) {
        case '.menu':
        
        client.sendMessage(message.from,menu)

            break;
            
                case '.automsg': 

                const chat = await client.getChatById('5541998072533@c.us')

                await message.reply(`Mandei a mensagem p ele`)
                chat.sendMessage('msg automatica')
    
        default:
        client.sendMessage(message.from,messageDefault)
            break;
    }
    //switch<
})



//ini
client.initialize(); 



