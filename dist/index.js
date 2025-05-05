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
//constantes
const readFile = require('read-excel-file/node'); //npm install read-excel-file
const gruposConhecidos = new Set();
let sentGreeting = false; //função para não repetir mensagem default
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
    puppeteer: { headless: true }
});
client.on('qr', qr => {
    console.log('Gerando seu QRcode... Por Favor abra seu whatsapp e escaneie o QRcode.');
    console.log(e_infos_bot_1.arts.abeia);
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('O seu cliente eucalipto está on e pronto para trabalhar.');
    console.log('Bot pronto! Grupos conhecidos:', [...gruposConhecidos]);
});
client.on('auth_failure', msg => {
    console.error('Falha na autenticação:', msg);
});
client.on('disconnected', reason => {
    console.log('Bot desconectado:', reason);
});
console.log("Inicializando o cliente...");
client.on('group_join', (notification) => {
    console.log('Entrou em um grupo:', notification.chatId);
});
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
                await message.reply("❌ O link do grupo está inválido!");
                return;
            }
            try {
                const infoGp = await client.getInviteInfo(codConv);
                const gpId = infoGp.id._serialized;
                console.log(`ID do Grupo: ${gpId}`);
                await message.reply(`✅ O ID do grupo é: ${gpId}`);
                await client.acceptInvite(codConv);
                await message.reply("✅ Bot entrou no grupo com sucesso!");
                setTimeout(async () => {
                    try {
                        console.log('⏱ Aguardando 4s...');
                        await client.sendMessage(gpId, 'Quem quiser IPTV barato vem PV 📺');
                        console.log('✉️ Mensagem enviada!');
                        const grupoChat = await client.getChatById(gpId);
                        if (!grupoChat.isGroup) {
                            console.error('❌ Chat não é um grupo!');
                            return;
                        }
                        await grupoChat.leave();
                        console.log('🚪 Saiu do grupo!');
                    }
                    catch (err) {
                        console.error('❌ Erro ao enviar mensagem ou sair:', err);
                    }
                }, 4000);
            }
            catch (error) {
                console.error("❌ Erro ao entrar no grupo:", error);
                await message.reply("❌ Não foi possível entrar no grupo. Verifique o link ou permissões.");
            }
        }
        const content = message.body;
        const chat = await client.getChatById('numero@c.us');
        console.log(`Message recebida de: ${chat.name}: ${message.body}`);
        if (!sentGreeting) {
            message.reply(e_mess01_1.messageDefault);
            sentGreeting = true;
        }
        switch (content) {
            case '.sendAllContact':
                const contacts = await client.getContacts();
                for (const contact of contacts) {
                    //  await message.reply(contact.pushname + ' ' + contact.id.user + ' ' + contact.statusMute)
                    const numberId = contact.id.user;
                    if (!numberId)
                        continue;
                    try {
                        const chatClient = await client.getChatById(numberId + '@c.us');
                        await chatClient.sendMessage(e_mess01_1.messAllTest);
                        console.log(`Mensagem enviada para: ${contact.pushname || numberId}`);
                    }
                    catch (err) {
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
                //console.log('underground')
                break;
        }
    }
});
client.initialize();
