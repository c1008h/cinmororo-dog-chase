class Duck {
    constructor(element, gameArea) {
        this.element = element;
        this.gameArea = gameArea;
        this.velocity = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 };
    }

    move() {
        // Update position based on velocity
        let currentLeft = parseFloat(this.element.style.left);
        let currentTop = parseFloat(this.element.style.top);
        let newX = currentLeft + this.velocity.x;
        let newY = currentTop + this.velocity.y;

        // Check boundaries and bounce if needed
        if (newX <= 0 || newX + this.element.offsetWidth >= this.gameArea.width) {
            this.velocity.x *= -1;
        }
        if (newY <= 0 || newY + this.element.offsetHeight >= this.gameArea.height) {
            this.velocity.y *= -1;
        }

        // Apply the new position
        this.element.style.left = `${newX}px`;
        this.element.style.top = `${newY}px`;
    }
    
    eat() {
        this.element.style.display = 'none'; // Hide the duck
    }

    moveAwayFrom(predator) {
        const predatorRect = predator.getBoundingClientRect();
        const duckRect = this.element.getBoundingClientRect();

        // Calculate distance
        const diffX = predatorRect.left - duckRect.left;
        const diffY = predatorRect.top - duckRect.top;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        // Increase velocity away from Cinnamoroll if too close
        if (distance < 100) {
            this.velocity.x += 5 * (diffX / distance);  // Normalize and influence velocity
            this.velocity.y += 5 * (diffY / distance);
        }
    }
}
