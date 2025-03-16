import { formatReleased, pad } from '../utilities/formatDurationReleased';
import { handleRadioClick, showThumb, showDescription, handleVideo } from '../utilities/videoItemFunctions';

// ================================================================================================

// returns one <tr></tr>
function getVideoItemContent(
    data,
    itemDuration,
    index,
    setThumb,
    thumb,
    setDescription,
    description,
    handleShowingVideo,
    statusesRatings,
    videoId,
    setStatusRating,
    handleStatusesRatings
) {
    return (
        <tr className={`video-item`} id={data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3)}>
            <td className="video-item__index">{pad(index + 1)}</td>

            <td className="video-item__channel">{data.channelTitle}</td>

            <td className="video-item__title">{data.title}</td>

            <td className="video-item__released">{formatReleased(data.publishedAt)}</td>

            <td className="video-item__duration" title="Hours, Minutes, Seconds">
                {itemDuration}
            </td>

            <td className="video-item__thumbnail">
                <button onClick={() => showThumb(setThumb, data)}>View</button>
                {thumb}
            </td>

            <td className="video-item__description">
                <button onClick={() => showDescription(setDescription, data)}>View</button>
                {description}
            </td>

            <td className="video-item__watch" title="Play an embedded video here">
                <button onClick={() => handleVideo(handleShowingVideo, data)}>Play</button>
            </td>

            <td className="video-item__status" title="Unwatched, Started, Watched">
                <label className="radio-wrapper">
                    <input
                        name={`status-${index}`}
                        type="radio"
                        value="unwatched"
                        checked={statusesRatings[videoId]?.status === 'unwatched' ? true : false}
                        onChange={() => {}}
                        onClick={() => handleRadioClick('status', 'unwatched', setStatusRating, videoId, handleStatusesRatings)}
                    />
                    <label className="radio-choice">U</label>
                </label>
                <label className="radio-wrapper">
                    <input
                        name={`status-${index}`}
                        type="radio"
                        value="started"
                        checked={statusesRatings[videoId]?.status === 'started' ? true : false}
                        onChange={() => {}}
                        onClick={() => handleRadioClick('status', 'started', setStatusRating, videoId, handleStatusesRatings)}
                    />
                    <label className="radio-choice">S</label>
                </label>
                <label className="radio-wrapper">
                    <input
                        name={`status-${index}`}
                        type="radio"
                        value="watched"
                        checked={statusesRatings[videoId]?.status === 'watched' ? true : false}
                        onChange={() => {}}
                        onClick={() => handleRadioClick('status', 'watched', setStatusRating, videoId, handleStatusesRatings)}
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
                        onChange={() => {}}
                        onClick={() => handleRadioClick('rating', 'liked', setStatusRating, videoId, handleStatusesRatings)}
                    />
                    <label className="radio-choice">L</label>
                </label>
                <label className="radio-wrapper">
                    <input
                        name={`rating-${index}`}
                        type="radio"
                        value="disliked"
                        checked={statusesRatings[videoId]?.rating === 'disliked' ? true : false}
                        onChange={() => {}}
                        onClick={() => handleRadioClick('rating', 'disliked', setStatusRating, videoId, handleStatusesRatings)}
                    />
                    <label className="radio-choice">D</label>
                </label>
            </td>
        </tr>
    );
}

export default getVideoItemContent;
