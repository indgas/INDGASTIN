let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let energy = localStorage.getItem('energy') ? parseInt(localStorage.getItem('energy')) : 300; // Загрузка энергии из localStorage или установка на максимум

const maxEnergy = 300; // Максимальное значение энергии

// Обновляем отображение начальных очков и энергии
document.getElementById('score').innerText = `${score}`;
document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
document.getElementById('energy-text').innerText = `${energy}/${maxEnergy}`; // Отображение количества энергии

// Функция восстановления энергии
function restoreEnergy() {
    if (energy < maxEnergy) {
        energy = Math.min(maxEnergy, energy + 2); // Восстанавливаем 2 единицы энергии, максимум до 300
        document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
        document.getElementById('energy-text').innerText = `${energy}/${maxEnergy}`; // Обновление текста энергии
        localStorage.setItem('energy', energy); // Сохраняем обновленное значение энергии в localStorage
    }
}

// Запускаем восстановление энергии каждые 1000 мс (1 секунды)
setInterval(restoreEnergy, 1000);

function updateEnergyUI() {  /* шкала энергии */
    const energyBar = document.getElementById('energy-bar');
    const energyText = document.getElementById('energy-text');
    const energyPercentage = (energy / maxEnergy) * 100;
    
    // Обновляем ширину шкалы энергии
    document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
}

document.getElementById('frog').addEventListener('click', () => {
    if (energy > 0) {
        score++;
        energy = Math.max(0, energy - 1); // Уменьшение энергии на 1 при каждом клике

        document.getElementById('score').innerText = `${score}`;
        document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
        document.getElementById('energy-text').innerText = `${energy}/${maxEnergy}`; // Обновление текста энергии

        // Сохраняем новое значение очков и энергии в localStorage
        localStorage.setItem('score', score);
        localStorage.setItem('energy', energy);
    }
});

// Получаем элементы из HTML
const frog = document.getElementById('frog');
const scoreDisplay = document.getElementById('score');
const energyDisplay = document.getElementById('energy');

// Обновление отображения очков и энергии
function updateDisplay() {
    scoreDisplay.textContent = `${score}`; // Обновление очков
    energyDisplay.textContent = `Energy: ${energy}`; // Обновление энергии
}

// Обработка клика по лягушке
function tapFrog() {
    if (energy > 0) { // Проверяем, достаточно ли энергии
        score++; // Увеличиваем счет
        energy -= energyCost; // Уменьшаем энергию
        updateDisplay(); // Обновляем отображение
    } else {
        alert('Not enough energy! Wait for it to recharge.'); // Если энергия на нуле
    }
}

// Функция восстановления энергии
function regenerateEnergy() {
    if (energy < 300) { // Ограничиваем энергию 300 единицами
        energy++;
        updateDisplay(); // Обновляем отображение
    }
}

// Назначаем обработчик клика на лягушку
frog.addEventListener('click', tapFrog);

document.querySelectorAll('.tab-link').forEach(function(tabLink) {
    tabLink.addEventListener('click', function() {
        var tabId = this.getAttribute('data-tab');

        // Скрываем все вкладки
        document.querySelectorAll('.tab-content').forEach(function(tabContent) {
            tabContent.classList.remove('active');
        });

        // Отображаем выбранную вкладку
        document.getElementById(tabId).classList.add('active');
    });
});

function generateReferralLink(telegram_id) {
    return `https://t.me/POCOFrog?start=ref_${telegram_id}`;
}

function loadFriends(telegram_id) {
    // Генерация реферальной ссылки
    const referralLink = generateReferralLink(telegram_id);

    // Отображение ссылки в соответствующем поле
    document.getElementById('referral-link').value = referralLink;

    // Загрузка и отображение друзей (как было ранее)
    db.get("SELECT invited_friends FROM players WHERE telegram_id = ?", [telegram_id], (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (row && row.invited_friends) {
            const friendsList = document.getElementById('friends-list');
            const friends = row.invited_friends.split(',');
            
            friends.forEach(friendId => {
                const friendItem = document.createElement('li');
                friendItem.textContent = `Друг с ID: ${friendId}`;
                friendsList.appendChild(friendItem);
            });
        }
    });
}

document.getElementById('friends-tab').addEventListener('click', () => {
    const telegram_id = /* Получите ID пользователя */
    loadFriends(telegram_id);
});



