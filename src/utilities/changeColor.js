// checking the input accent color -- returns string (color in rgb)
const checkNewColor = (newColor) => {
    const span = document.createElement('span'); // mimicking DOM addition to get the computed color

    document.body.appendChild(span);
    span.style.color = newColor;
    let color = window.getComputedStyle(span).color;
    document.body.removeChild(span);

    const rgbValues = color
        .slice(4, -1)
        .split(',')
        .map((x) => +x.trim()); // getting just the rgb values (r,g,b)

    if (rgbValues[0] < 40 && rgbValues[1] < 40 && rgbValues[2] < 40) {
        console.log('The provided color was too dark. Setting to default (green)');
        return `rgb(0, 128, 0)`; // return green (browser default) if it is too dark
    }

    return color;
};

// ================================================================================================

const changeColor = (setAccentColor) => {
    const newColor = prompt('Enter your new interface accent color');

    if (!newColor) return;
    if (newColor && newColor.trim().length < 3) return;

    const checkedColor = checkNewColor(newColor);
    setAccentColor(checkedColor);
};

export default changeColor;
