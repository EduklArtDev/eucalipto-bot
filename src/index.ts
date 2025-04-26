//imprts 
import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'
import { menu, menusResp } from './eucalipto/eucalipto-menu1'
import { messageDefault } from './eucalipto/e-mess01'
import { arts } from './eucalipto/e-infos-bot'
const readFile = require('read-excel-file/node')
//npm install read-excel-file

//...



let sentGreeting = false

const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr', qr => {
    console.log('Rec qrCode!!!')
    console.log(arts.abeia)
    qrcode.generate(qr, { small: true })//QR Code terminal
})

client.on('ready', () => {
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
client.on('message', async message => {

    if (message.from.endsWith("@g.us")) {
        console.log('msg de gp')
    } else {

        let linkGrupo: string = message.body.trim()

        if (linkGrupo.includes("chat.whatsapp.com")) {
            let codConv: string | undefined = linkGrupo.split('/').pop(); // Pega o código do link

            if (!codConv) {
                message.reply("❌ O link do grupo está inválido!");
                return;
            }

            try {
                let infoGp = await client.getInviteInfo(codConv) as any
                let gpId: string = infoGp.id._serialized

                console.log(`ID do Grupo: ${gpId}`)
                message.reply(`✅ O ID do grupo é: ${gpId}`)
            } catch (erro) {
                console.error("Erro ao obter informações do grupo:", erro);
                message.reply("❌ Não consegui obter as informações do grupo. Verifique o link!")
            }
        }


        const content = message.body
        const chat = await client.getChatById('5541998072533@c.us')


        console.log(`Message recebida de: ${chat.name}: ${message.body}`)



        if (!sentGreeting) {
            message.reply(messageDefault)
            sentGreeting = true
        }

        //switch>
        switch (content) {

            case '.link':


                readFile('./files/15.000 Grupos.xlsx').then(async (linhas: any) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '))
                    }

                })


                break;

            case '.link2':


                readFile('./files/12-MIL-GRUPOS-DE-DIVULGAÇÃO-GRATIS-DE-WHATAPP-2.xlsx').then(async (linhas: any) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '))
                    }

                })

                break

            case '.link3':


                readFile('./files/16.000 Grupos.xlsx').then(async (linhas: any) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '))
                    }

                })

                break

            case '.link4':


                readFile('./files/500-Grupos-Vendas-e-Divulgação-_1_.xlsx').then(async (linhas: any) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '))
                    }

                })

                break

            case '.link5':


                readFile('./files/PLANILHA DE ENDEREÇOS.xlsx').then(async (linhas: any) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '))
                    }

                })

                break

            case '.link6':


                readFile('./files/vendaem12-hrs (2).xlsx').then(async (linhas: any) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '))
                    }

                })

                break

            case '.menu':

                await message.reply(menu)

                break;

            case '.planos':
                await message.reply(menusResp.planos)

                await chat.sendMessage(content)

                break;

            case '.pagamento':
                await message.reply(menusResp.pag)

                break;

            case '.suporte':

                await message.reply(menusResp.support)

                break;

            case '.faq':

                await message.reply(menusResp.faq)

                break;

            case '.sair':

                await message.reply(menusResp.exit)

                break;

            case '.automsg':

                await message.reply(`Mandei a mensagem p ele`)
                chat.sendMessage('msg automatica')

                break;


            default:
                //client.sendMessage(message.from,messageDefault)
                console.log('underground')
                break;
        }
        //switch<

    }
})



//ini
client.initialize();




