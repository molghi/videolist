import { getReleased } from './formatDurationReleased';

// ================================================================================================

// handle Status or Rating radio btns click
const handleRadioClick = (grouping, value, setStatusRating, videoId, handleStatusesRatings) => {
    let obj;
    setStatusRating((prev) => {
        obj = { [videoId]: { ...prev, [grouping]: value } };
        handleStatusesRatings(obj);
        return { ...prev, [grouping]: value };
    });
};

// ================================================================================================

// close thumbnail
const closeThumb = (setThumb) => setThumb('');

// ================================================================================================

// show thumbnail
const showThumb = (setThumb, data) => {
    setThumb(
        <span className="thumbnail">
            <img src={data.thumbnail} alt="video thumbnail" title={data.title} />
            <button onClick={() => closeThumb(setThumb)} className="thumbnail__close">
                close
            </button>
        </span>
    );
};

// ================================================================================================

// close description
const closeDescription = (setDescription) => setDescription('');

// ================================================================================================

// show description
const showDescription = (setDescription, data) => {
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
            <button onClick={() => closeDescription(setDescription)} className="description__close">
                close
            </button>
        </span>
    );
};

// ================================================================================================

// happens upon clicking Play btn
const handleVideo = (handleShowingVideo, data) => {
    handleShowingVideo(data);
};

// ================================================================================================

export { handleRadioClick, closeThumb, showThumb, closeDescription, showDescription, handleVideo };
