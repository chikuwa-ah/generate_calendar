'use strict';

const clear = () => {
    const button = document.getElementById('clear');
    button.addEventListener('click', () => {
        const calendar = document.getElementById('table');
        const row = calendar.children;
        for (const rowEls of row) {
            const unit = rowEls.children;
            for (const unitEls of unit) {
                const inner = unitEls.children;
                inner[0].style.display = 'none';
                inner[1].style.display = 'none';
            };
        };
    });
};

const selectImg = (state) => {
    const selectChild = document.getElementById('select').children;
    for (let i = 0; i < selectChild.length; i++) {
        selectChild[i].style.backgroundColor = i === state ? '#dedede' : '#fff';
    };
};

const checkSelect = (selectChild) => {
    for (let i = 0; i < selectChild.length; i++) {
        if (selectChild[i].style.backgroundColor === 'rgb(222, 222, 222)') {
            return i;
        };
    };
};

const calendarClick = () => {
    const calendar = document.getElementById('table');
    calendar.addEventListener('click', (e) => {
        const clickedId = Number(e.target.id);
        const clickedRow = Math.floor(clickedId / 7);
        const clickedColumn = clickedId % 7;
        const row = calendar.children[clickedRow];
        const columun = row.children[clickedColumn];
        const insideTarget = columun.children;
        const day = Number(insideTarget[2].textContent);
        if (day > 0) {
            insideTarget[0].style.display = 'none';
            insideTarget[1].style.display = 'none';
            const selectChild = document.getElementById('select').children;
            const select = checkSelect(selectChild);
            if (select > 0) {
                insideTarget[select - 1].style.display = 'inline';
            };
        };
    });
};