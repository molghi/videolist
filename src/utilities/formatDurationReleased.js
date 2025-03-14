import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';

const pad = (value) => value.toString().padStart(2, '0');

function formatDuration(durationString) {
    if (!durationString) return;
    const match = durationString.match(/P(?:T)?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function getReleased(releasedString) {
    const then = new Date(releasedString);
    const day = then.getDate();
    const month = then.getMonth() + 1;
    const year = then.getFullYear().toString().slice(2);
    const now = new Date();
    let content = '';
    const days = differenceInDays(now, then);
    const weeks = differenceInWeeks(now, then);
    const months = differenceInMonths(now, then);
    const years = differenceInYears(now, then);
    if (days < 8) content = days + ` ${days === 1 ? 'day' : 'days'} ago`;
    if (days >= 8 && weeks < 11) content = weeks + ` ${weeks === 1 ? 'week' : 'weeks'} ago`;
    if (weeks >= 11) content = months + ` ${months === 1 ? 'month' : 'months'} ago`;
    if (months > 12) content = years + ` ${years === 1 ? 'year' : 'years'} ago`;
    const formatted = `${day}/${month}/'${year}`;
    return [content, formatted];
}

function formatReleased(releasedString) {
    const [content, formatted] = getReleased(releasedString);
    return <span title={`${content} − ${formatted}`}>{content}</span>;
}

export { formatDuration, getReleased, formatReleased, pad };
