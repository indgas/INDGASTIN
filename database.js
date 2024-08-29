const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('game.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY,
        telegram_id TEXT UNIQUE,
        username TEXT,
        coins INTEGER DEFAULT 0,
        invited_friends TEXT
    )`);
});

function addPlayer(telegram_id, username) {
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO players (telegram_id, username) VALUES (?, ?)");
        stmt.run(telegram_id, username);
        stmt.finalize();
    });
}
function updateCoins(telegram_id, coins) {
    db.serialize(() => {
        const stmt = db.prepare("UPDATE players SET coins = coins + ? WHERE telegram_id = ?");
        stmt.run(coins, telegram_id);
        stmt.finalize();
    });
}
function getPlayerData(telegram_id, callback) {
    db.serialize(() => {
        db.get("SELECT * FROM players WHERE telegram_id = ?", [telegram_id], (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                callback(row);
            }
        });
    });
}
function addFriend(telegram_id, friend_id) {
    db.serialize(() => {
        db.get("SELECT invited_friends FROM players WHERE telegram_id = ?", [telegram_id], (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                let friends = row.invited_friends ? row.invited_friends.split(',') : [];
                friends.push(friend_id);
                db.run("UPDATE players SET invited_friends = ? WHERE telegram_id = ?", [friends.join(','), telegram_id]);
            }
        });
    });
}

db.close();


