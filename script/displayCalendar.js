'use strict';

const createDateArray = (firstDay, finalDate) => {
    const day = [...Array(finalDate)].map((_, i) => i + 1)
    const frontEmpty = new Array(firstDay).fill(' ');
    let remainder = 7 - [...frontEmpty, ...day].length % 7;
    if (remainder === 7) {
        remainder = 0;
    };
    const backEmpty = new Array(remainder).fill(' ');
    const dateArray = [...frontEmpty, ...day, ...backEmpty];
    return dateArray;
};

const displayIndex = (year, month) => {
    const pallet = document.getElementById('pallet');

    while (pallet.firstChild) {
        pallet.removeChild(pallet.firstChild);
    };

    createElements(pallet, 'div', 'show_year', null, year + '年');
    createElements(pallet, 'div', 'show_month', null, month + '月');

    const weekEl = createElements(pallet, 'div', 'week', null, null);
    const weekName = ['日', '月', '火', '水', '木', '金', '土'];
    weekName.forEach(el => createElements(weekEl, 'p', null, null, el));
};

const createImgElements = (parent, id) => {
    const src = ['./img/purple.png', './img/green.png'];
    const className = ['img0', 'img1'];
    src.forEach((el, i) => {
        const img = document.createElement('img');
        img.src = el;
        img.style.display = 'none';
        img.classList.add(className[i]);
        img.id = id;
        parent.appendChild(img);
    });
};

const displayCalendar = (origin) => {
    const pallet = document.getElementById('pallet');
    const table = createElements(pallet, 'div', 'table', 'table', null);
    let row;

    for (let i = 0; i < origin.length; i++) {
        if (i % 7 === 0) {
            row = createElements(table, 'div', 'tableRow', 'row', null);
        };
        const rowParent = createElements(row, 'div', 'unit', i, null);
        createImgElements(rowParent, i);
        createElements(rowParent, 'p', null, i, origin[i]);
    };

    pallet.innerHTML += `
        <div class="legend_par">
            <div class="legend" id="apply-font1">
                <div>
                    <img src="./img/purple.png" width="30px" height="30px" class="img0">
                    <p class="output-text" id="out-text0"></p>
                </div>
                <div>
                    <img src="./img/green.png" width="30px" height="30px" class="img1">
                    <p class="output-text" id="out-text1"></p>
                </div>
            </div>
        </div>`;

    const textBoxList = document.querySelectorAll('.adjust-text');
    textBoxList.forEach((textBox, i) => {
        const output = document.getElementById(`out-text${i}`);
        output.textContent = textBox.value;
    });
};