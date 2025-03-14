function typewriterEffect(timer) {
    const span = document.querySelector('[data-list]');
    const list = span.dataset.list.split(',').map((x) => x.trim() + ' '); // adding whitespace so it would pause for a bit after having typed the word
    const lengths = list.map((x) => x.length);

    let letterCounter = 0;
    let wordCounter = 0;
    const speedInMs = 200;

    timer = setInterval(() => {
        if (letterCounter < lengths[wordCounter] * 2) {
            // times two because it types each letter and then erases each letter
            if (letterCounter < list[wordCounter].length) {
                span.textContent += list[wordCounter][letterCounter]; // typing
            } else {
                span.textContent = span.textContent.slice(0, -1); // erasing
            }
            letterCounter++; // incrementing after every round
        } else {
            wordCounter++;
            letterCounter = 0;
            if (wordCounter >= list.length) {
                wordCounter = 0; // resetting here so it could loop infinitely
            }
        }
    }, speedInMs);
}

export default typewriterEffect;
