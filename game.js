let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let energy = 100; // Начальная энергия

// Обновляем отображение начальных очков и энергии
document.getElementById('score').innerText = `Score: ${score}`;
document.getElementById('energy-bar').style.width = `${energy}%`;

document.getElementById('frog').addEventListener('click', () => {
    score++;
    energy = Math.max(0, energy - 1); // Уменьшение энергии на 1 при каждом клике

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('energy-bar').style.width = `${energy}%`;

    // Сохраняем новое значение очков в localStorage
    localStorage.setItem('score', score);
});
const energyCost = 1; // Стоимость одного клика

// Получаем элементы из HTML
const frog = document.getElementById('frog');
const scoreDisplay = document.getElementById('score');
const energyDisplay = document.getElementById('energy');

// Обновление отображения очков и энергии
function updateDisplay() {
    scoreDisplay.textContent = `Score: ${score}`; // Обновление очков
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
    if (energy < 100) { // Ограничиваем энергию 100 единицами
        energy++;
        updateDisplay(); // Обновляем отображение
    }
}

// Назначаем обработчик клика на лягушку
frog.addEventListener('click', tapFrog);

// Таймер для восстановления энергии
setInterval(regenerateEnergy, 1000); // Восстановление энергии каждую секунду


