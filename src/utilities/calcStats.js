import { formatDuration } from './formatDurationReleased';

// a function to return what Quick Stats must display
const calcStats = (data) => {
    if (!data) return;
    if (data[0]?.kind === 'youtube#searchResult') return;

    const videosNumber = data.length;

    const durationsInSeconds = data
        .map((entry) => {
            if (entry.duration) return formatDuration(entry.duration).split(':');
            else return ['00', '00', '00']; // if duration is undefined, return all zeroes for H, M and S
        })
        .map((x) =>
            x.reduce((a, x, i) => {
                if (i === 0) return +x * 60 * 60 + a;
                if (i === 1) return +x * 60 + a;
                if (i === 2) return +x + a;
                return a;
            }, 0)
        );

    const averageInSeconds = Math.floor(durationsInSeconds.reduce((a, x) => a + x, 0) / videosNumber);
    const average = Math.floor(averageInSeconds / 60);

    const totalDurationHours = Math.floor(durationsInSeconds.reduce((a, x) => a + x, 0) / 60 / 60);
    const totalDurationMinutes = Math.floor(durationsInSeconds.reduce((a, x) => a + x, 0) / 60) - totalDurationHours * 60;

    const howManyWatched = [...document.querySelectorAll('.video-item__status .radio-wrapper:nth-child(3) input')].filter((x) => x.checked).length;
    const watched = Math.floor((howManyWatched / videosNumber) * 100);

    return [videosNumber, average, totalDurationHours, totalDurationMinutes, howManyWatched, watched];
};

export default calcStats;
