import { useState } from 'react';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';
import './VideoItem.css';

const pad = (value) => value.toString().padStart(2, '0');

function formatDuration(durationString) {
    const match = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
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

// ================================================================================================

function VideoItem({ data, index, showVideo }) {
    const [thumb, setThumb] = useState('');
    const [description, setDescription] = useState('');

    const closeThumb = () => setThumb('');

    const showThumb = () => {
        setThumb(
            <span className="thumbnail">
                <img src={data.thumbnail} alt="video thumbnail" title={data.title} />
                <button onClick={closeThumb} className="thumbnail__close">
                    close
                </button>
            </span>
        );
    };

    const closeDescription = () => setDescription('');

    const showDescription = () => {
        setDescription(
            <span className="description">
                <span className="italic">Video title: {data.title}</span>
                <br />
                <span className="italic">
                    Released: {getReleased(data.publishedAt)[0]} − {getReleased(data.publishedAt)[1]}
                </span>
                <br />
                <span className="italic">Channel: {data.channelTitle}</span>
                <br />
                <br />
                <span>{data.description || '(no description)'}</span>
                <button onClick={closeDescription} className="description__close">
                    close
                </button>
            </span>
        );
    };

    const handleVideo = () => {
        showVideo(data);
    };

    return (
        <tr className="video-item" id={data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3)}>
            <td className="video-item__index">{pad(index + 1)}</td>
            <td className="video-item__channel">{data.channelTitle}</td>
            <td className="video-item__title">{data.title}</td>
            <td className="video-item__released">{formatReleased(data.publishedAt)}</td>
            <td className="video-item__duration" title="Hours, Minutes, Seconds">
                {formatDuration(data.duration)}
            </td>
            <td className="video-item__thumbnail">
                <button onClick={showThumb}>View</button>
                {thumb}
            </td>
            <td className="video-item__description">
                <button onClick={showDescription}>View</button>
                {description}
            </td>
            <td className="video-item__watch" title="Play an embedded video here">
                <button onClick={handleVideo}>Play</button>
            </td>
            <td className="video-item__status" title="Unwatched, Started, Watched">
                <label className="radio-wrapper">
                    <input name="status" type="radio" />
                    <label className="radio-choice">U</label>
                </label>
                <label className="radio-wrapper">
                    <input name="status" type="radio" />
                    <label className="radio-choice">S</label>
                </label>
                <label className="radio-wrapper">
                    <input name="status" type="radio" />
                    <label className="radio-choice">W</label>
                </label>
            </td>
            <td className="video-item__rating" title="Liked, Disliked">
                <label className="radio-wrapper">
                    <input name="rating" type="radio" />
                    <label className="radio-choice">L</label>
                </label>
                <label className="radio-wrapper">
                    <input name="rating" type="radio" />
                    <label className="radio-choice">D</label>
                </label>
            </td>
        </tr>
    );
}

export default VideoItem;
