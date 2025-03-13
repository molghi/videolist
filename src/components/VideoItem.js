import { useState, useEffect } from 'react';
import './VideoItem.css';
import { formatDuration, getReleased, formatReleased, pad } from '../utilities/formatDurationReleased';

function VideoItem({ data, index, showVideo, shortsAreVisible, handleStatusesRatings, statusesRatings }) {
    const [thumb, setThumb] = useState('');
    const [description, setDescription] = useState('');
    const [statusRating, setStatusRating] = useState({
        status: 'unset',
        rating: 'unset',
    });
    const videoId = data.videoUrl.split('?v=')[1];

    useEffect(() => {}, []);

    const handleRadioClick = (grouping, value) => {
        // handle Status or Rating radio btns click
        setStatusRating((prev) => ({ ...prev, [grouping]: value }));
        const obj = { [videoId]: { ...statusRating, [grouping]: value } };
        handleStatusesRatings(obj);
        if (grouping === 'status') console.log(`upd quick stats`);
    };

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

    const itemDuration = formatDuration(data.duration);

    const content = (
        <tr className={`video-item`} id={data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3)}>
            <td className="video-item__index">{pad(index + 1)}</td>
            <td className="video-item__channel">{data.channelTitle}</td>
            <td className="video-item__title">{data.title}</td>
            <td className="video-item__released">{formatReleased(data.publishedAt)}</td>
            <td className="video-item__duration" title="Hours, Minutes, Seconds">
                {itemDuration}
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
                    <input
                        name={`status-${index}`}
                        type="radio"
                        value="unwatched"
                        checked={statusesRatings[videoId]?.status === 'unwatched' ? true : false}
                        onClick={() => handleRadioClick('status', 'unwatched')}
                    />
                    <label className="radio-choice">U</label>
                </label>
                <label className="radio-wrapper">
                    <input
                        name={`status-${index}`}
                        type="radio"
                        value="started"
                        checked={statusesRatings[videoId]?.status === 'started' ? true : false}
                        onClick={() => handleRadioClick('status', 'started')}
                    />
                    <label className="radio-choice">S</label>
                </label>
                <label className="radio-wrapper">
                    <input
                        name={`status-${index}`}
                        type="radio"
                        value="watched"
                        checked={statusesRatings[videoId]?.status === 'watched' ? true : false}
                        onClick={() => handleRadioClick('status', 'watched')}
                    />
                    <label className="radio-choice">W</label>
                </label>
            </td>
            <td className="video-item__rating" title="Liked, Disliked">
                <label className="radio-wrapper">
                    <input
                        name={`rating-${index}`}
                        type="radio"
                        value="liked"
                        checked={statusesRatings[videoId]?.rating === 'liked' ? true : false}
                        onClick={() => handleRadioClick('rating', 'liked')}
                    />
                    <label className="radio-choice">L</label>
                </label>
                <label className="radio-wrapper">
                    <input
                        name={`rating-${index}`}
                        type="radio"
                        value="disliked"
                        checked={statusesRatings[videoId]?.rating === 'disliked' ? true : false}
                        onClick={() => handleRadioClick('rating', 'disliked')}
                    />
                    <label className="radio-choice">D</label>
                </label>
            </td>
        </tr>
    );

    let toShow = '';
    if (shortsAreVisible || itemDuration.split(':')[1] > 1) toShow = content;

    return toShow;
}

export default VideoItem;
