let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let energy = localStorage.getItem('energy') ? parseInt(localStorage.getItem('energy')) : 300; // Загрузка энергии из localStorage или установка на максимум

const maxEnergy = 300; // Максимальное значение энергии

// Обновляем отображение начальных очков и энергии
document.getElementById('score').innerText = `Score: ${score}`;
document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
document.getElementById('energy-text').innerText = `${energy}/${maxEnergy}`; // Отображение количества энергии

// Функция восстановления энергии
function restoreEnergy() {
    if (energy < maxEnergy) {
        energy = Math.min(maxEnergy, energy + 3); // Восстанавливаем 3 единицы энергии, максимум до 300
        document.getElementById('energy-bar').style.width = `${(energy / maxEnergy) * 100}%`;
        document.getElementById('energy-text').innerText = `${energy}/${maxEnergy}`; // Обновление текста энергии
        localStorage.setItem('energy', energy); // Сохраняем обновленное значение энергии в localStorage
    }
}

document.getElementById('frog').addEventListener('click', () => {
    if (energy > 0) {
        score++;
        energy = Math.max(0, energy - 1); // Уменьшение энергии на 1 при каждом клике

        document.getElementById('score').innerText = `Score: ${score}`;
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
    if (energy < 300) { // Ограничиваем энергию 300 единицами
        energy++;
        updateDisplay(); // Обновляем отображение
    }
}

// Назначаем обработчик клика на лягушку
frog.addEventListener('click', tapFrog);

// Таймер для восстановления энергии
setInterval(regenerateEnergy, 1000); // Восстановление энергии каждую секунду
