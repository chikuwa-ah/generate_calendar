'use strict';

class rangeHandler {
    constructor(sliderId) {
        this.slider = document.getElementById(sliderId);
        this.sliderId = sliderId;
        this.handleInput = this.handleInput.bind(this);
        this.slider.addEventListener('input', this.handleInput);
        changeSliderColor(this.slider);
    };

    handleInput() {
        changeSliderColor(this.slider);
        const root = document.documentElement;
        const deg = this.sliderId.slice(0, -1) === 'hue' ? 'deg' : '';
        root.style.setProperty(`--${this.sliderId}`, this.slider.value + deg);
    };

};

const changeSliderColor = (slider) => {
    const activeColor = '#149688';
    const inactiveColor = '#ffffff';
    const ratio = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
};

const addRangeEvent = () => {
    const rangeList = document.querySelectorAll('.range');
    const eventList = [];
    rangeList.forEach(range => {
        eventList.push(new rangeHandler(range.id));
    });
};

const resetColor = (img) => {
    const root = document.documentElement;
    const propertyList = ['hue', 'saturate', 'brightness'];
    const initValueList = [0, 1, 1];
    propertyList.forEach((property, i) => {
        const id = `${property}${img}`;
        root.style.setProperty(`--${id}`, initValueList[i]);
        const slider = document.getElementById(id);
        slider.value = initValueList[i];
        changeSliderColor(slider);
    });
};