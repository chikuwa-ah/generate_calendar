'use strict';

const createElements = (parent, type, className, id, text) => {
    const element = document.createElement(type);
    element.classList.add(className);
    element.id = id;
    element.textContent = text;
    parent.appendChild(element);
    return element;
};

const createDate = (year, month, isNow, date) => {
    month -= isNow;
    const newDate = new Date(year, month, date);
    return newDate;
};

const calendarMain = () => {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const firstDay = createDate(year, month, true, 1).getDay();
    const finalDate = createDate(year, month, false, 0).getDate();
    displayIndex(year, month);
    const originCalendar = createDateArray(firstDay, finalDate);
    displayCalendar(originCalendar);
    calendarClick();
};


window.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    const inputYear = document.getElementById('year');
    const inputMonth = document.getElementById('month');

    inputYear.value = date.getFullYear();
    inputMonth.value = date.getMonth() + 2;

    selectImg(0);
    addRangeEvent();
    clear();
});