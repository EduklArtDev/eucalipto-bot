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
    const content = message.body;
    const chat = await client.getChatById('5541998072533@c.us');
    console.log(`Message recebida de: ${chat.name}: ${message.body}`);
    //switch>
    switch (content) {
        case '.menu':
            await message.reply(eucalipto_menu1_1.menu);
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
            client.sendMessage(message.from, e_mess01_1.messageDefault);
            break;
    }
    //switch<
});
//ini
client.initialize();
