const TelegramBot = require('node-telegram-bot-api');
const token = '7531617907:AAGMOyDoaCnIAhUIY698QwkejD_1NW4KAFE';
const bot = new TelegramBot(token, { polling: true });


bot.start((ctx) => {
    const refCode = ctx.message.text.split(' ')[1];
 {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Play Tap the Frog",
                    web_app: { url: "https://indgas.github.io/INDGASTIN/" } // URL вашей игры
                }]
            ]
        }
    };

