function startGame() {
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
}

function spinWheel() {
    let tasks = [
        "Поцелуй партнера в чувствительное место.",
        "Прошепчи что-то грязное ему/ей на ухо.",
        "Медленно сними один элемент одежды партнера зубами.",
        "Используй губы, чтобы возбудить партнера, но не касайся руками.",
        "Разреши партнеру выбрать для тебя задание."
    ];
    
    let finalLocations = [
        "На кровати",
        "На полу",
        "В ванной",
        "Перед зеркалом",
        "В одежде до конца",
        "На скорости"
    ];
    
    let bodyLocations = [
        "Рот",
        "Грудь",
        "Попа",
        "Внутрь",
        "На лицо",
        "На тело"
    ];
    
    let task = tasks[Math.floor(Math.random() * tasks.length)];
    let finalLocation = finalLocations[Math.floor(Math.random() * finalLocations.length)];
    let bodyLocation = bodyLocations[Math.floor(Math.random() * bodyLocations.length)];

    let wheel = document.getElementById("wheel");
    let cardContainer = document.getElementById("cardContainer");
    let card = document.getElementById("card");

    wheel.classList.add("spin");
    setTimeout(() => {
        wheel.classList.remove("spin");
        cardContainer.classList.remove("hidden");
        card.classList.add("flip");
        card.querySelector(".card-back").innerHTML = `<h2>${task}</h2><p>Финал: ${finalLocation} – ${bodyLocation}</p>`;
    }, 2000);
}

function goBack() {
    document.getElementById('gameScreen').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
}
