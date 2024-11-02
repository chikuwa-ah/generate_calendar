'use strict';

const createDateArray = (firstDay, finalDate) => {
    const day = [...Array(finalDate)].map((_, i) => i + 1)
    const empty = new Array(firstDay).fill(0);
    const dateArray = [...empty, ...day];
    return dateArray;
};

const createElements = (parent, type, className, id, text) => {
    const element = document.createElement(type);
    element.classList.add(className);
    element.id = id;
    element.textContent = text;
    parent.appendChild(element);
    return element;
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
    for (let i = 0; i < 7; i++) {
        createElements(weekEl, 'p', null, null, weekName[i]);
    };
};


const createDate = (year, month, isNow, date) => {
    month -= isNow;
    const newDate = new Date(year, month, date);
    return newDate;
};

const generateCalender = () => {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const firstDay = createDate(year, month, true, 1).getDay();
    const finalDate = createDate(year, month, false, 0).getDate();
    displayIndex(year, month);
    const originCalender = createDateArray(firstDay, finalDate);
};


window.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    const inputYear = document.getElementById('year');
    const inputMonth = document.getElementById('month');

    inputYear.value = date.getFullYear();
    inputMonth.value = date.getMonth() + 2;
});