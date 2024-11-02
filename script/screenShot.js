'use strict';

const screenShot = () => {
    if (document.getElementById('pallet').children.length == 0) {
        alert('No Calendar');
        return;
    };
    html2canvas(document.getElementById('pallet'), {
        onrendered: function (canvas) {
            const imgData = canvas.toDataURL();
            const dummyA = document.createElement('a');
            document.body.appendChild(dummyA);
            dummyA.href = imgData;
            dummyA.download = 'calendar.png';
            dummyA.click();
            document.body.removeChild(dummyA);
        }
    });
};