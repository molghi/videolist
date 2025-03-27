import './styles/videoPlaybox.css';
import { useRef, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';

// ================================================================================================

// this function component renders a screen with iframe
function VideoBox() {
    const {
        handleFilterChange,
        handleValue,
        handleEnlarge,
        iframeWidth,
        iframeHeight,
        userVideoSettings,
        setUserVideoSettings,
        videoBoxShown,
        videoData,
        setVideoBoxShown,
        searchType,
        setEnlarged,
    } = useContext(MyContext);
    const vignetteEl = useRef();
    const noiseEl = useRef();
    const myIframe = useRef();
    const myWrapper = useRef();

    // =======================================

    useEffect(() => {
        // only upon first render (page refresh): fetch state from LS (iframe video effects) and set it
        const savedSettings = JSON.parse(localStorage.getItem('userVideoSettings'));
        if (savedSettings) setUserVideoSettings((prev) => ({ ...prev, ...savedSettings }));
    }, [setUserVideoSettings]);

    useEffect(() => {
        // upon every change of userVideoSettings: pushing new userVideoSettings to LS
        setTimeout(() => {
            localStorage.setItem('userVideoSettings', JSON.stringify({ ...userVideoSettings }));
        }, 500); // small timeout so the first useEffect could do its business, otherwise this useEffect operates on un-updated values
    }, [userVideoSettings]);

    // =======================================

    if (!videoData || !videoBoxShown) return document.body.classList.remove('o-h'); // remove overflow hidden and do early return
    else document.body.classList.add('o-h'); // add overflow hidden if this videobox is shown (there'll be no scrolling the page)

    const myId = searchType === 'channels' ? videoData.videoUrl.slice(videoData.videoUrl.indexOf('?v=') + 3) : videoData.id.videoId; // getting video id

    return (
        videoBoxShown && (
            <div className="video-playbox" ref={myWrapper}>
                <button onClick={() => handleEnlarge(myIframe, myWrapper, setEnlarged, iframeWidth, iframeHeight)} className="video-playbox__enlarge">
                    enlarge
                </button>

                <button onClick={() => setVideoBoxShown(false)} className="video-playbox__close">
                    close
                </button>

                <div className="video-playbox__video-place">The video will be here...</div>

                <div className="video-playbox__frame-box">
                    <iframe
                        width={iframeWidth}
                        height={iframeHeight}
                        src={`https://www.youtube.com/embed/${myId}`}
                        title={videoData.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        ref={myIframe}
                        style={{
                            filter: `brightness(${userVideoSettings.brightness}%) contrast(${userVideoSettings.contrast}%) grayscale(${userVideoSettings.grayscale}%) sepia(${userVideoSettings.sepia}%)`,
                        }}
                    ></iframe>

                    <div ref={vignetteEl} className={`video-playbox__vignette ${userVideoSettings.vignette === false ? 'hidden' : ''}`}></div>
                    <div ref={noiseEl} className={`video-playbox__noise ${userVideoSettings.noise === false ? 'hidden' : ''}`}></div>

                    <div className="video-playbox__filter">
                        <div className="video-playbox__row">
                            <span className="video-playbox__filter-btn">Video Effects</span>
                            <div className="video-playbox__btns">
                                <button className="video-playbox__btn" onClick={(e) => handleFilterChange(e, 'vignette', vignetteEl, null, setUserVideoSettings)}>
                                    Vignette
                                </button>
                                <button
                                    className="video-playbox__btn"
                                    title="Old TV noise effect"
                                    onClick={(e) => handleFilterChange(e, 'noise', null, noiseEl, setUserVideoSettings)}
                                >
                                    Old TV
                                </button>
                            </div>
                        </div>
                        <div className="video-playbox__filter-settings">
                            {['brightness', 'contrast', 'grayscale', 'sepia'].map((filterName, i) => (
                                <div key={i} className="video-playbox__filter-setting">
                                    <label htmlFor={filterName}>{filterName}</label>
                                    <input
                                        type="range"
                                        id={filterName}
                                        step="1"
                                        min="0"
                                        max={filterName === 'grayscale' || filterName === 'sepia' ? '100' : '200'}
                                        value={handleValue(filterName, userVideoSettings)}
                                        onChange={(e) => handleFilterChange(e, filterName, null, null, setUserVideoSettings)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default VideoBox;

// useEffect(() => {
//     const playerHandler = () => {
//         console.log(document.querySelector('iframe'));
//         if (document.getElementById('my-player-container')) {
//             console.log(3);
//             new window.YT.Player('my-player-container', {
//                 videoId: videoData.videoUrl.slice(videoData.videoUrl.indexOf('?v=') + 3),
//                 events: {
//                     onReady: (event) => {
//                         event.target.setVolume(50);
//                         event.target.setPlaybackQuality('medium');
//                     },
//                 },
//             });
//         }
//     };
//     if (!window.YT) {
//         const script = document.createElement('script');
//         script.src = 'https://www.youtube.com/iframe_api';
//         script.async = true;
//         document.body.appendChild(script);
//         script.onload = () => {
//             console.log('API loaded');
//             console.log(window.YT);
//             playerHandler();
//         };
//     } else {
//         playerHandler();
//     }
// }, [videoBoxShown]);
