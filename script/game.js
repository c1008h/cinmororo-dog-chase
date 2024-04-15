document.addEventListener('keydown', moveCinnamororo);

function moveCinnamororo(event) {
    const cinnamororo = document.getElementById('cinnamororo');
    const step = 10;
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