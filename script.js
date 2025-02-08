
document.addEventListener("DOMContentLoaded", function () {
    let wheel = document.getElementById("wheel");
    let cardContainer = document.getElementById("cardContainer");
    let cardFront = document.querySelector(".card-front");
    let cardBack = document.querySelector(".card-back");
    let spinButton = document.getElementById("spinButton");

    let gameScreen = document.getElementById("gameScreen");
    let settingsScreen = document.getElementById("settingsScreen");
    let helpScreen = document.getElementById("helpScreen");

    let selectedMode = null;
    let cards = {};
    let finalLocations = {};

    // Загружаем данные из JSON
    fetch("final_game_data.json")
        .then(response => response.json())
        .then(data => {
            cards = data.cards;
            finalLocations = data.final_locations;
        })
        .catch(error => console.error("Ошибка загрузки JSON:", error));

    // Функция для показа нужного экрана
    function showScreen(screenId) {
        document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
        document.getElementById(screenId).classList.remove("hidden");
    }

    function openSettings() { showScreen("settingsScreen"); }
    function openHelp() { showScreen("helpScreen"); }
    function goBack() { showScreen("gameScreen"); }

    // Привязка событий к кнопкам
    function safeEventListener(id, event, func) {
        let element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, func);
        } else {
            console.error("Элемент не найден:", id);
        }
    }

    safeEventListener("settingsBtn", "click", openSettings);
    safeEventListener("helpBtn", "click", openHelp);
    safeEventListener("backBtn", "click", goBack);

    console.log("Кнопки успешно привязаны!");
});
