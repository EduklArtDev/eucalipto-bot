//imprts 
import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { menu } from './eucalipto/eucalipto-menu1'
import { messageDefault } from './eucalipto/e-mess01'
import { group } from 'console'
//...

const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr',qr=>{
    console.log('Rec qrCode!!!')
    qrcode.generate(qr,{small:true})//QR Code terminal
})

client.on('ready', ()=>{
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
    const chat = await client.getChatById('5541998072533@c.us')


    console.log(`Message recebida de: ${chat.name}: ${message.body}`)


    

//switch>
    switch (content) {
        case '.menu':
        
        await message.reply(menu)

            break;
            
                case '.automsg': 

                await message.reply(`Mandei a mensagem p ele`)
                chat.sendMessage('msg automatica')

                break;

                case '.gp': 


                break;

                case '.idgp': 

               
                break;

                case '.opengp':

                break;

                case '.ciclo':

                break;

                    
               
        default:
        client.sendMessage(message.from,messageDefault)
            break;
    }
    //switch<
})



//ini
client.initialize(); 



