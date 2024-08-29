const TelegramBot = require('node-telegram-bot-api');
const token = '7531617907:AAGMOyDoaCnIAhUIY698QwkejD_1NW4KAFE';
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    const refCode = ctx.message.text.split(' ')[1];
    
    if (refCode && refCode.startsWith('ref_')) {
        const inviterId = refCode.split('_')[1];
        const newUserId = ctx.from.id;
        const username = ctx.from.username;

        // Добавляем нового пользователя в базу данных
        addPlayer(newUserId, username);

        // Добавляем пригласившего как друга для нового пользователя
        addFriend(inviterId, newUserId);

        ctx.reply(`Добро пожаловать, ${username}! Вы приглашены пользователем с ID ${inviterId}.`);
    } else {
        // Обычный старт без реферального кода
        ctx.reply('Добро пожаловать в игру!');
    }
 {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Play Tap the Frog",
                    web_app: { url: "https://indgas.github.io/INDGASTIN/" } // URL вашей игры
                }]
            ]
        }
    }
});
