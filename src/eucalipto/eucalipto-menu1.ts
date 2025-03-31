import { infos } from "./e-infos-bot"

export const menu = `
🔹 *Bem-vindo ao ${infos.nomeServ}* 🔹
📺 O melhor IPTV com qualidade HD, estabilidade e suporte rápido!

📌 Escolha uma opção abaixo:

1️⃣ 📦 *.planos* - Ver planos e preços
2️⃣ 🎥 *.teste* - Solicitar teste grátis
3️⃣ 💳 *.pagamento* - Ver formas de pagamento
4️⃣ ⚡ *.suporte* - Falar com o suporte técnico
5️⃣ ❓ *.faq* - Dúvidas frequentes
6️⃣ 🛑 *.sair* - Encerrar atendimento

✍️ Digite o comando correspondente ou envie uma mensagem para falar com um atendente.
`
export const menusResp = {
    planos: `📌 *Planos Disponíveis* 📌  

1️⃣ *Plano Mensal* (1 mês)  
💰 Preço Original: R$ 45,25  
🔥 Preço Promocional: *R$ 37,90*  
🔹 Duração: 1 Mês  
🔹 Créditos: 1  
🔹 Ideal para quem deseja testar o serviço por um curto período.

2️⃣ *Plano Trimestral* (3 meses)  
💰 Preço Original: R$ 108,75  
🔥 Preço Promocional: *R$ 97,90*  
🔹 Duração: 3 Meses  
🔹 Créditos: 3  
🔹 Excelente opção para quem planeja usar o serviço por um tempo médio.

3️⃣ *Plano Semestral* (6 meses)  
💰 Preço Original: R$ 217,50  
🔥 Preço Promocional: *R$ 177,90*  
🔹 Duração: 6 Meses  
🔹 Créditos: 6  
🔹 Ideal para quem precisa de um serviço por um período mais longo, com um bom custo-benefício.

4️⃣ *Plano Anual* (12 meses)  
💰 Preço Original: R$ 435,00  
🔥 Preço Promocional: *R$ 334,90*  
🔹 Duração: 12 Meses  
🔹 Créditos: 12  
🔹 Perfeito para quem precisa de longo prazo e quer garantir um desconto significativo.

9️⃣ *Plano Bimestral* (2 meses)  
💰 Preço Original: R$ 72,50  
🔥 Preço Promocional: *R$ 67,94*  
🔹 Duração: 2 Meses  
🔹 Créditos: 2  
🔹 Boa escolha para quem deseja algo intermediário, com um bom custo-benefício em um período menor.

💬 *Responda com o número do plano desejado!*   
`,
    pag: `💳 *Formas de Pagamento:*\n\n✅ PIX\n✅ Boleto\n✅ Cartão de Crédito\n✅ Transferência Bancária\n\nEnvie uma mensagem para confirmar o pagamento.`,
    support: `⚡ *Suporte Técnico*\n\nPrecisa de ajuda? Nossa equipe está pronta para te atender.\nClique no link para falar com um atendente: [Seu Link de Suporte]`,
    faq: `❓ *Dúvidas Frequentes:*\n\n1️⃣ Como funciona o IPTV?\n2️⃣ Em quais dispositivos posso assistir?\n3️⃣ Como cancelar a assinatura?\n\nPara mais informações, acesse nosso FAQ: [Seu Link do FAQ]`,
    exit: `🛑 *Atendimento Encerrado!*\n\nSe precisar de algo mais, digite *.menu* para ver as opções novamente.`
}
