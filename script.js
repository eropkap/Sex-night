
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

                cardContainer.innerHTML = `<p>${selectedCard}</p>`;
                finalLocation.innerHTML = `<p>Финал: ${selectedFinal}</p>`;

                hideAllScreens();
                document.getElementById("cardScreen").classList.remove("hidden");
            });
    });

    penaltyButton.addEventListener("click", function () {
        fetch("game_data.json")
            .then(response => response.json())
            .then(data => {
                const penalties = data.penalties;
                const penalty = penalties[Math.floor(Math.random() * penalties.length)];
                document.getElementById("penaltyContainer").innerHTML = `<p>Штраф: ${penalty}</p>`;
            });

        hideAllScreens();
        document.getElementById("penaltyScreen").classList.remove("hidden");
    });

    returnButtons.forEach(button => {
        button.addEventListener("click", function () {
            hideAllScreens();
            document.getElementById("mainScreen").classList.remove("hidden");
        });
    });
});
