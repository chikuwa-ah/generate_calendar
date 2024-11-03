'use strict';

class rangeHandler {
    constructor(sliderId) {
        this.slider = document.getElementById(sliderId);
        this.sliderId = sliderId;
        this.handleInput = this.handleInput.bind(this);
        this.slider.addEventListener('input', this.handleInput);
    };

    handleInput() {
        const root = document.documentElement;
        let deg = '';
        if (this.sliderId.slice(0, -1) === 'hue') {
            deg = 'deg';
        };
        root.style.setProperty(`--${this.sliderId}`, this.slider.value + deg);
    };
};

const addRangeEvent = () => {
    const rangeList = document.querySelectorAll('.range');
    const eventList = [];
    rangeList.forEach(range => {
        eventList.push(new rangeHandler(range.id));
    });
};