const TelegramBot = require('node-telegram-bot-api');
const token = '7531617907:AAGMOyDoaCnIAhUIY698QwkejD_1NW4KAFE';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Click the button below to play!", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Play Tap the Frog",
                    web_app: { url: "https://indgas.github.io/INDGASTIN/" } // URL вашей игры
                }]
            ]
        }
    });
});

