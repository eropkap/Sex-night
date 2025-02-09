
document.addEventListener("DOMContentLoaded", function () {
    const modeButtons = document.querySelectorAll(".mode-button");
    const spinButton = document.getElementById("spinButton");
    const nextButton = document.getElementById("nextButton");
    const penaltyButton = document.getElementById("penaltyButton");
    const returnButtons = document.querySelectorAll(".returnButton");
    const cardContainer = document.getElementById("cardContainer");
    const finalLocation = document.getElementById("finalLocation");
    let selectedCard = "";
    let selectedFinal = "";

    function hideAllScreens() {
        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.add("hidden");
            screen.classList.remove("active");
        });
    }

    hideAllScreens();
    document.getElementById("mainScreen").classList.remove("hidden");
    document.getElementById("mainScreen").classList.add("active");

    modeButtons.forEach(button => {
        button.addEventListener("click", function () {
            hideAllScreens();
            document.getElementById("gameScreen").classList.remove("hidden");
            document.getElementById("gameScreen").classList.add("active");
        });
    });

    spinButton.addEventListener("click", function () {
        fetch("game_data.json")
            .then(response => response.json())
            .then(data => {
                const categories = Object.keys(data.cards);
                const category = categories[Math.floor(Math.random() * categories.length)];
                const cardList = data.cards[category];
                selectedCard = cardList[Math.floor(Math.random() * cardList.length)];

                const finalKeys = Object.keys(data.finals.locations);
                const finalKey = finalKeys[Math.floor(Math.random() * finalKeys.length)];
                const finalOptions = data.finals.locations[finalKey];
                selectedFinal = finalOptions[Math.floor(Math.random() * finalOptions.length)];

                // 🛠 **Исправлено: обновляем DOM перед переключением экранов**
                cardContainer.innerHTML = `<p><strong>Задание:</strong> ${selectedCard}</p>`;
                finalLocation.innerHTML = `<p><strong>Финал:</strong> ${selectedFinal}</p>`;

                hideAllScreens();
                document.getElementById("cardScreen").classList.remove("hidden");
                document.getElementById("cardScreen").classList.add("active");
            });
    });

    nextButton.addEventListener("click", function () {
        hideAllScreens();
        document.getElementById("mainScreen").classList.remove("hidden");
        document.getElementById("mainScreen").classList.add("active");
    });

    penaltyButton.addEventListener("click", function () {
        fetch("game_data.json")
            .then(response => response.json())
            .then(data => {
                const penalties = data.penalties;
                const penalty = penalties[Math.floor(Math.random() * penalties.length)];
                document.getElementById("penaltyContainer").innerHTML = `<p><strong>Штраф:</strong> ${penalty}</p>`;

                hideAllScreens();
                document.getElementById("penaltyScreen").classList.remove("hidden");
                document.getElementById("penaltyScreen").classList.add("active");
            });
    });

    returnButtons.forEach(button => {
        button.addEventListener("click", function () {
            hideAllScreens();
            document.getElementById("mainScreen").classList.remove("hidden");
            document.getElementById("mainScreen").classList.add("active");
        });
    });
});
