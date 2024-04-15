document.addEventListener('keydown', moveCinnamororo);
setInterval(moveDucks, 100);

function moveCinnamororo(event) {
    const cinnamororo = document.getElementById('cinnamororo');
    const step = 15;
    const rect = cinnamororo.getBoundingClientRect();
    
    switch (event.key) {
        case 'ArrowLeft':
            cinnamororo.style.left = `${rect.left - step}px`;
            cinnamororo.style.transform = 'scaleX(1)';
            break;
        case 'ArrowRight':
            cinnamororo.style.left = `${rect.left + step}px`;
            cinnamororo.style.transform = 'scaleX(-1)';
            break;
        case 'ArrowUp':
            cinnamororo.style.top = `${rect.top - step}px`;
            break;
        case 'ArrowDown':
            cinnamororo.style.top = `${rect.top + step}px`;
            break;
    }

    checkForCapture();
}

function moveDucks() {
    const cinnamororo = document.getElementById('cinnamororo');
    const ducks = document.querySelectorAll('.duck');
    ducks.forEach(duck => {
        if (isNear(cinnamororo, duck)) {
            moveDuckAway(cinnamororo, duck);
        }
    });
}

function isNear(a, b) {
    const distance = 100; // Distance threshold to start running away
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const diffX = aRect.left - bRect.left;
    const diffY = aRect.top - bRect.top;
    return Math.sqrt(diffX * diffX + diffY * diffY) < distance;
}

function moveDuckAway(predator, prey) {
    const gameArea = document.getElementById('gameArea').getBoundingClientRect();
    const preyRect = prey.getBoundingClientRect();
    const step = 5; // How fast the ducks move away

    let newX = preyRect.left;
    let newY = preyRect.top;
    if (predator.getBoundingClientRect().left > preyRect.left) {
        newX -= step;
    } else {
        newX += step;
    }
    if (predator.getBoundingClientRect().top > preyRect.top) {
        newY -= step;
    } else {
        newY += step;
    }

    // Check boundaries
    if (newX > gameArea.left && newX + preyRect.width < gameArea.right) {
        prey.style.left = `${newX}px`;
    }
    if (newY > gameArea.top && newY + preyRect.height < gameArea.bottom) {
        prey.style.top = `${newY}px`;
    }
}

function checkForCapture() {
    const cinnamororo = document.getElementById('cinnamororo');
    const ducks = document.querySelectorAll('.duck');
    ducks.forEach(duck => {
        if (isColliding(cinnamororo, duck)) {
            duck.remove(); 
        }
    });
}

function isColliding(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.right
    );
}