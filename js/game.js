let cinnamoroll;
let ducks = [];

document.addEventListener('DOMContentLoaded', function() {
    cinnamoroll = new Cinnamoroll('cinnamororo');
    generateDucks(5); 

    document.addEventListener('keydown', event => cinnamoroll.move(event));
    setInterval(gameLoop, 20);
});

function generateDucks(number) {
    const gameArea = document.getElementById('gameArea');
    for (let i = 0; i < number; i++) {
        let duck = document.createElement('img');
        duck.className = 'duck';
        duck.src = 'images/ducks/duck.png';
        duck.alt = 'Duck';
        duck.style.position = 'absolute';
        duck.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`; // Adjust width of the duck if different
        duck.style.top = `${Math.random() * (gameArea.clientHeight - 30)}px`; // Adjust height of the duck if different
        gameArea.appendChild(duck);
        ducks.push(new Duck(duck, gameArea.getBoundingClientRect()));
    }
}

function checkCollision(duck, predator) {
    const duckRect = duck.element.getBoundingClientRect();
    const predatorRect = predator.getBoundingClientRect();

    // Custom hitbox definition
    const duckHitbox = {
        left: duckRect.left + 0, // Adjust these values based on your image content
        right: duckRect.right - 0,
        top: duckRect.top + 0,
        bottom: duckRect.bottom - 0,
    };

    const predatorHitbox = {
        left: predatorRect.left + 0,
        right: predatorRect.right - 0,
        top: predatorRect.top + 0,
        bottom: predatorRect.bottom - 0,
    };

    // Check for overlapping rectangles (collision detection)
    return (
        duckHitbox.left < predatorHitbox.right &&
        duckHitbox.right > predatorHitbox.left &&
        duckHitbox.top < predatorHitbox.bottom &&
        duckHitbox.bottom > predatorHitbox.top
    );
}

function gameLoop() {
    ducks.forEach(duck => {
        duck.move();
        duck.moveAwayFrom(cinnamoroll.element);

        if (checkCollision(duck, cinnamoroll.element)) {
            duck.eat();  // Assuming eat method now simply hides the duck
        }
    });
}
