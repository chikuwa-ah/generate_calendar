'use strict';

const screenShot = () => {
    const target = document.getElementById('pallet');
    if (target.children.length == 0) {
        alert('No Calendar');
        return;
    };

    domtoimage.toPng(target, { scale: 2 })
        .then((dataUrl) => {
            const img = new Image();
            img.src = dataUrl;
            const dummyA = document.createElement('a');
            document.body.appendChild(dummyA);
            dummyA.href = dataUrl;
            dummyA.download = 'calendar.png';
            dummyA.click();
        }).catch((error) => {
            console.error('oops, something went wrong!', error);
        });
};