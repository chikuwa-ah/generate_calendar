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
    rangeList.forEach(range => {
        new rangeHandler(range.id);
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


class textBoxHandler {
    constructor(boxId) {
        this.box = document.getElementById(boxId);
        this.boxId = boxId;
        this.boxChange = this.boxChange.bind(this);
        this.box.addEventListener('input', this.boxChange);
    };

    boxChange() {
        const number = this.boxId.slice(-1);
        const output = document.getElementById(`out-text${number}`);
        output.textContent = this.box.value;
    };
};

const addTextChangeEvent = () => {
    const textBoxList = document.querySelectorAll('.adjust-text');
    textBoxList.forEach(textBox => {
        textBox.disabled = false;
        new textBoxHandler(textBox.id);
    });
};

class selectHandler {
    constructor(select) {
        this.select = select;
        this.selectId = select.id;
        this.selectChange = this.selectChange.bind(this);
        this.select.addEventListener('input', this.selectChange);
    };
    selectChange() {
        const fontFamily = ['shirokuma', 'corporate', 'iroha', 'K', 'kokoro', 'komorebi', 'memelon', 'pixel'];
        const number = this.selectId.slice(-1);
        const apply = document.getElementById(`apply-font${number}`);
        const index = this.select.value - 1;
        apply.style.letterSpacing = index === 0 ? '-6px' : '0px';
        apply.style.fontFamily = fontFamily[index];
    };
};

const addFontSelectEvent = () => {
    const selectList = document.querySelectorAll('.select-font');
    selectList.forEach(select => {
        select.disabled = false;
        new selectHandler(select);
    });
};

const letterColorChange = (color) => {
    const target = document.querySelector('.easy-see');
    target.style.color = color;

    const noHush = color.replace('#', '');
    const decColorList = noHush.match(/.{2}/g).map(hex => parseInt(hex, 16));
    // const keyNumber = Math.max(...decColorList) + Math.min(...decColorList);
    let backColor = "#";
    decColorList.forEach(decColor => {
        const complementary = 255 - decColor;
        const reHex = complementary.toString(16);
        backColor += reHex;
    });
    target.style.backgroundColor = backColor;
};

const addLetterColorChangeEvent = () => {
    const picker = document.getElementById('letter-color-picker');
    const textBox = document.getElementById('letter-color-text');
    picker.disabled = false;
    textBox.disabled = false;

    picker.addEventListener('input', () => {
        textBox.value = picker.value;
        letterColorChange(picker.value);
    });

    textBox.addEventListener('change', () => {
        const noHush = textBox.value.replace('#', '');
        if (noHush.length != 6) return;
        const primeList = noHush.match(/.{2}/g);
        let isInNoNaN = true;
        primeList.forEach(prime => {
            const dec = parseInt(prime, 16);
            if (Number.isNaN(dec)) {
                isInNoNaN = false;
            };
        });
        if (isInNoNaN) letterColorChange(textBox.value);
    });
};