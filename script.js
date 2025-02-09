
document.addEventListener("DOMContentLoaded", function () {
    let wheel = document.getElementById("wheel");
    let cardContainer = document.getElementById("cardContainer");
    let cardFront = document.querySelector(".card-front");
    let cardBack = document.querySelector(".card-back");
    let spinButton = document.getElementById("spinButton");

    let mainScreen = document.getElementById("mainScreen");
    let modeButtonsContainer = document.getElementById("modeButtons");

    let selectedMode = null;
    let cards = {};
    let finalLocations = {};

    // Загружаем данные из JSON
    fetch("final_game_data.json")
        .then(response => response.json())
        .then(data => {
            cards = data.cards;
            finalLocations = data.final_locations;
            createModeButtons(Object.keys(cards)); // Создаём кнопки режимов из JSON
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));

    // Функция для показа главного экрана с режимами
    function showMainScreen() {
        document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
        mainScreen.classList.remove("hidden");
    }

    // Создание кнопок для выбора режима
    function createModeButtons(modes) {
        modeButtonsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением кнопок
        modes.forEach(mode => {
            const button = document.createElement("button");
            button.textContent = mode;
            button.classList.add("mode-button");
            button.addEventListener("click", () => selectMode(mode));
            modeButtonsContainer.appendChild(button);
        });
    }

    // Выбор режима из главного меню
    function selectMode(mode) {
        selectedMode = mode;
        console.log("Выбран режим:", mode);
    }

    // Кручение колеса
    function spinWheel() {
        if (!selectedMode || !cards[selectedMode] || cards[selectedMode].length === 0) {
            alert("Выберите режим перед тем, как крутить колесо!");
            return;
        }

        let angle = Math.floor(Math.random() * 3600) + 1800; // Случайный угол вращения
        wheel.style.transition = "transform 4s ease-out";
        wheel.style.transform = `rotate(${angle}deg)`;

        setTimeout(() => {
            revealCard();
        }, 4500);
    }

    // Выпадение задания
    function revealCard() {
        let randomIndex = Math.floor(Math.random() * cards[selectedMode].length);
        let selectedCard = cards[selectedMode][randomIndex];
        let finalLocation = getFinalLocation(selectedCard.text);

        cardFront.innerText = selectedCard.text;
        cardBack.innerText = `Финиш: ${finalLocation}`;

        cardContainer.classList.remove("hidden");
        cardContainer.classList.add("flip");
    }

    // Определение места финала
    function getFinalLocation(taskText) {
        for (let key in finalLocations.mapping) {
            if (taskText.includes(key)) {
                let options = finalLocations.locations[finalLocations.mapping[key]];
                return options[Math.floor(Math.random() * options.length)];
            }
        }
        let allOptions = Object.values(finalLocations.locations).flat();
        return allOptions[Math.floor(Math.random() * allOptions.length)];
    }

    // Привязка событий к кнопкам
    function safeEventListener(id, event, func) {
        let element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, func);
        } else {
            console.error("Элемент не найден:", id);
        }
    }

    safeEventListener("spinButton", "click", spinWheel);
    safeEventListener("backBtn", "click", showMainScreen);

    // Изначально показываем главный экран
    showMainScreen();
});
