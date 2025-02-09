
document.addEventListener("DOMContentLoaded", function () {
    const startButtons = document.querySelectorAll(".mode-button");
    const spinButton = document.getElementById("spinButton");
    const nextButton = document.getElementById("nextButton");
    const penaltyButton = document.getElementById("penaltyButton");
    const wheel = document.getElementById("wheel");
    const cardContainer = document.getElementById("cardContainer");
    const finalLocation = document.getElementById("finalLocation");
    let selectedCard = "";
    let selectedFinal = "";

    // Выбор режима
    startButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("mainScreen").classList.add("hidden");
            document.getElementById("gameScreen").classList.remove("hidden");
        });
    });

    // Крутить колесо
    spinButton.addEventListener("click", function () {
        spinButton.disabled = true; // Отключаем кнопку пока идёт вращение

        setTimeout(() => {
            fetch("game_data.json")
                .then(response => response.json())
                .then(data => {
                    const categories = Object.keys(data.cards);
                    const category = categories[Math.floor(Math.random() * categories.length)];
                    const cardList = data.cards[category];
                    selectedCard = cardList[Math.floor(Math.random() * cardList.length)];

                    const finalKeys = Object.keys(data.final_locations.locations);
                    const finalKey = finalKeys[Math.floor(Math.random() * finalKeys.length)];
                    const finalOptions = data.final_locations.locations[finalKey];
                    selectedFinal = finalOptions[Math.floor(Math.random() * finalOptions.length)];

                    cardContainer.innerHTML = `<p>${selectedCard}</p>`;
                    finalLocation.innerHTML = `<p>Финал: ${selectedFinal}</p>`;

                    document.getElementById("wheelScreen").classList.add("hidden");
                    document.getElementById("cardScreen").classList.remove("hidden");
                });
        }, 2000);
    });

    // Переход к полному заданию
    nextButton.addEventListener("click", function () {
        cardContainer.innerHTML += `<p><strong>Полное задание:</strong> ${selectedCard}</p>`;
        finalLocation.innerHTML += `<p><strong>Конец:</strong> ${selectedFinal}</p>`;
        document.getElementById("cardScreen").classList.add("hidden");
        document.getElementById("fullTaskScreen").classList.remove("hidden");
    });

    // Штраф
    penaltyButton.addEventListener("click", function () {
        fetch("game_data.json")
            .then(response => response.json())
            .then(data => {
                const penalties = data.cards["Штрафы"];
                const penalty = penalties[Math.floor(Math.random() * penalties.length)];
                document.getElementById("penaltyScreen").innerHTML = `<p>Штраф: ${penalty}</p>`;
            });

        document.getElementById("cardScreen").classList.add("hidden");
        document.getElementById("penaltyScreen").classList.remove("hidden");
    });
});
