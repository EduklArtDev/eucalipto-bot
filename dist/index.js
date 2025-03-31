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
//...
let sentGreeting = false;
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth()
});
client.on('qr', qr => {
    console.log('Rec qrCode!!!');
    qrcode_terminal_1.default.generate(qr, { small: true }); //QR Code terminal
});
client.on('ready', () => {
    console.log('Cliente ta on heheh!!!');
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
client.on('message', async (message) => {
    if (message.from.endsWith("@g.us")) {
        console.log('msg de gp');
    }
    else {
        let linkGrupo = message.body.trim();
        if (linkGrupo.includes("chat.whatsapp.com")) {
            let codConv = linkGrupo.split('/').pop(); // Pega o código do link
            if (!codConv) {
                message.reply("❌ O link do grupo está inválido!");
                return;
            }
            try {
                let infoGp = await client.getInviteInfo(codConv);
                let gpId = infoGp.id._serialized;
                console.log(`ID do Grupo: ${gpId}`);
                message.reply(`✅ O ID do grupo é: ${gpId}`);
            }
            catch (erro) {
                console.error("Erro ao obter informações do grupo:", erro);
                message.reply("❌ Não consegui obter as informações do grupo. Verifique o link!");
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
            case '.gp':
                break;
            case '.idgp':
                break;
            case '.opengp':
                break;
            case '.ciclo':
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
