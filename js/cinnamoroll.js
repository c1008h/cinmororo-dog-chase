class Cinnamoroll {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.element.style.left = this.element.style.left || "0px"; // Initialize if not set
        this.element.style.top = this.element.style.top || "0px"; // Initialize if not set
        this.step = 15;
    }

    move(event) {
        let currentLeft = parseInt(this.element.style.left, 10);
        let currentTop = parseInt(this.element.style.top, 10);

        switch (event.key) {
            case 'ArrowLeft':
                this.element.style.left = `${currentLeft - this.step}px`;
                this.element.style.transform = 'scaleX(1)';
                break;
            case 'ArrowRight':
                this.element.style.left = `${currentLeft + this.step}px`;
                this.element.style.transform = 'scaleX(-1)';
                break;
            case 'ArrowUp':
                this.element.style.top = `${currentTop - this.step}px`;
                break;
            case 'ArrowDown':
                this.element.style.top = `${currentTop + this.step}px`;
                break;
        }
    }
}
