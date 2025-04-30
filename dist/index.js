"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imprts 
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const eucalipto_menu1_1 = require("./eucalipto/eucalipto-menu1");
const e_mess01_1 = require("./eucalipto/e-mess01");
const e_infos_bot_1 = require("./eucalipto/e-infos-bot");
const readFile = require('read-excel-file/node');
//npm install read-excel-file
//...
let sentGreeting = false;
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth()
});
client.on('qr', qr => {
    console.log('Rec qrCode!!!');
    console.log(e_infos_bot_1.arts.abeia);
    qrcode_terminal_1.default.generate(qr, { small: true }); //QR Code terminal
});
client.on('ready', () => {
    console.log('Cliente ta on heheh!!!');
    console.log('Bot pronto! Grupos conhecidos:', [...gruposConhecidos]);
});
client.on('auth_failure', msg => {
    console.error('Falha na autenticação:', msg);
});
client.on('disconnected', reason => {
    console.log('Bot desconectado:', reason);
});
//mess act
console.log("Inicializando o cliente...");
//...
client.on('group_join', (notification) => {
    console.log('Entrou em um grupo:', notification.chatId);
});
const gruposConhecidos = new Set();
client.on('message', async (message) => {
    if (message.from.endsWith("@g.us")) {
        console.log(`Mensagem recebida no grupo ${message.from}`);
        gruposConhecidos.add(message.from);
    }
    else {
        let linkGrupo = message.body.trim();
        if (linkGrupo.includes("chat.whatsapp.com")) {
            const codConv = linkGrupo.split('/').pop(); // Extrai o código do convite
            if (!codConv) {
                message.reply("❌ O link do grupo está inválido!");
                return;
            }
            try {
                // Busca informações do grupo com o código
                const infoGp = await client.getInviteInfo(codConv);
                const gpId = infoGp.id._serialized;
                console.log(`ID do Grupo: ${gpId}`);
                await message.reply(`✅ O ID do grupo é: ${gpId}`);
                // Entra no grupo usando o código
                await client.acceptInvite(codConv);
                await message.reply("✅ Bot entrou no grupo com sucesso!");
                // Espera 2 segundos antes de enviar a mensagem
                setTimeout(async () => {
                    await client.sendMessage(gpId, 'quem quiser iptv barato vem pv');
                    console.log('Mensagem enviada!');
                }, 2000);
            }
            catch (error) {
                console.error("Erro ao entrar no grupo:");
                await message.reply("❌ Não foi possível entrar no grupo. Verifique o link ou permissões.");
            }
        }
        const content = message.body;
        const chat = await client.getChatById('5541998072533@c.us');
        console.log(`Message recebida de: ${chat.name}: ${message.body}`);
        if (!sentGreeting) {
            message.reply(e_mess01_1.messageDefault);
            sentGreeting = true;
        }
        //switch>
        switch (content) {
            case '.env':
                console.log('[.env] Comando recebido');
                try {
                    const chats = await client.getChats();
                    console.log(`Total de chats encontrados: ${chats.length}`);
                    const grupos = chats.filter(chat => {
                        console.log(`[debug] chat: ${chat.name} | isGroup: ${chat.isGroup}`);
                        return chat.isGroup;
                    });
                    console.log(`[.env] Total de grupos encontrados: ${grupos.length}`);
                    setTimeout(async () => {
                        await client.sendMessage(message.from, 'quem quiser iptv barato vem pv');
                        console.log('Mensagem enviada!');
                    }, 2000);
                    chats.forEach(chat => {
                        if (chat.isGroup) {
                            console.log(`Grupo encontrado: ${chat.name} | ID: ${chat.id._serialized}+'@g.us'`);
                            client.sendMessage(message.from, 'quem quiser iptv barato vem pv');
                        }
                        else {
                            console.log(`Chat individual: ${chat.name} | ID: ${chat.id._serialized}`);
                        }
                    });
                    if (grupos.length === 0) {
                        await message.reply('⚠️ Nenhum grupo foi encontrado. O bot precisa ter recebido ou enviado mensagem no grupo para ele aparecer.');
                        break;
                    }
                    for (const group of grupos) {
                        console.log(`✅ Enviando mensagem para: ${group.name} - ID: ${group.id._serialized}`);
                        await client.sendMessage(group.id._serialized, 'Quem quiser IPTV barato vem pv!');
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                    await message.reply('✅ Mensagens enviadas para todos os grupos.');
                }
                catch (err) {
                    console.error('❌ Erro no comando .env:', err);
                    await message.reply('❌ Erro ao processar o comando .env.');
                }
                break;
            case '.sendMessContact':
                await message.reply('404');
                break;
            case '.sendAllContact':
                const contacts = await client.getContacts();
                for (const contact of contacts) {
                    //  await message.reply(contact.pushname + ' ' + contact.id.user + ' ' + contact.statusMute)
                    const numberId = contact.id.user;
                    if (!numberId)
                        continue; // se não tiver número, pula
                    try {
                        const chatClient = await client.getChatById(numberId + '@c.us');
                        await chatClient.sendMessage(e_mess01_1.messAllTest);
                        console.log(`Mensagem enviada para: ${contact.pushname || numberId}`);
                    }
                    catch (err) {
                        // Se der erro (tipo número inválido), apenas loga e continua
                        console.log(`Não consegui enviar para ${contact.pushname || numberId}: ${err}`);
                    }
                }
                break;
            case '.link':
                readFile('./files/15.000 Grupos.xlsx').then(async (linhas) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '));
                    }
                });
                break;
            case '.link2':
                readFile('./files/12-MIL-GRUPOS-DE-DIVULGAÇÃO-GRATIS-DE-WHATAPP-2.xlsx').then(async (linhas) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '));
                    }
                });
                break;
            case '.link3':
                readFile('./files/16.000 Grupos.xlsx').then(async (linhas) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '));
                    }
                });
                break;
            case '.link4':
                readFile('./files/500-Grupos-Vendas-e-Divulgação-_1_.xlsx').then(async (linhas) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '));
                    }
                });
                break;
            case '.link5':
                readFile('./files/PLANILHA DE ENDEREÇOS.xlsx').then(async (linhas) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '));
                    }
                });
                break;
            case '.link6':
                readFile('./files/vendaem12-hrs (2).xlsx').then(async (linhas) => {
                    for (const linha of linhas) {
                        console.log(linha);
                        await message.reply(linha.join(' | '));
                    }
                });
                break;
            case '.menu':
                await message.reply(eucalipto_menu1_1.menu);
                break;
            case '.planos':
                await message.reply(eucalipto_menu1_1.menusResp.planos);
                await chat.sendMessage(content);
                break;
            case '.pagamento':
                await message.reply(eucalipto_menu1_1.menusResp.pag);
                break;
            case '.suporte':
                await message.reply(eucalipto_menu1_1.menusResp.support);
                break;
            case '.faq':
                await message.reply(eucalipto_menu1_1.menusResp.faq);
                break;
            case '.sair':
                await message.reply(eucalipto_menu1_1.menusResp.exit);
                break;
            case '.automsg':
                await message.reply(`Mandei a mensagem p ele`);
                chat.sendMessage('msg automatica');
                break;
            default:
                //client.sendMessage(message.from,messageDefault)
                console.log('underground');
                break;
        }
        //switch<
    }
});
//ini
client.initialize();
