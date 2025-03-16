import './styles/videoPlaybox.css';
import { useRef, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import getVideoBoxContent from '../utilities/getVideoBoxContent';

// ================================================================================================

// renders a screen with iframe
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
    } = useContext(MyContext);

    const vignetteEl = useRef();
    const noiseEl = useRef();
    const myIframe = useRef();
    const myWrapper = useRef();

    // =======================================

    useEffect(() => {
        // only upon first render (page refresh): fetch state from LS (iframe video effects) and set it
        const savedSettings = JSON.parse(localStorage.getItem('userVideoSettings'));
        if (savedSettings) {
            setUserVideoSettings((prev) => {
                return { ...prev, ...savedSettings };
            });
        }
    }, [setUserVideoSettings]);

    useEffect(() => {
        // upon every change of userVideoSettings: pushing new userVideoSettings to LS
        setTimeout(() => {
            localStorage.setItem('userVideoSettings', JSON.stringify({ ...userVideoSettings }));
        }, 500); // small timeout so the first useEffect could do its business, otherwise this useEffect operates on un-updated values
    }, [userVideoSettings]);

    // =======================================

    if (!videoData || !videoBoxShown) return document.body.classList.remove('o-h'); // remove overflow hidden and return
    document.body.classList.add('o-h'); // add overflow hidden if this videobox is shown (no scrolling)

    const filters = ['brightness', 'contrast', 'grayscale', 'sepia']; // filter/effects names
    const url = `https://www.youtube.com/embed/${videoData.videoUrl.slice(videoData.videoUrl.indexOf('?v=') + 3)}`; // getting url for iframe

    const content = getVideoBoxContent(
        myWrapper,
        handleEnlarge,
        setVideoBoxShown,
        iframeWidth,
        iframeHeight,
        url,
        videoData,
        myIframe,
        userVideoSettings,
        vignetteEl,
        noiseEl,
        handleFilterChange,
        filters,
        handleValue
    ); // setting content: getting .video-playbox with iframe and all buttons and all video effects (aka filters)

    return videoBoxShown && content;
}

// ================================================================================================

export default VideoBox;

/* 

useEffect(() => {
    // checking full screen
    const checkFullscreen = () => {
        if (document.fullscreenElement?.tagName === 'IFRAME') {
            userVideoSettings.vignette && document.querySelector('.video-playbox__frame-box').classList.add('video-playbox__vignette');
            userVideoSettings.noise && document.querySelector('.video-playbox__frame-box').classList.add('video-playbox__noise');
        } else {
            document.querySelector('.video-playbox__frame-box').classList.remove('video-playbox__vignette');
            document.querySelector('.video-playbox__frame-box').classList.remove('video-playbox__noise');
        }
    };
    document.addEventListener('fullscreenchange', checkFullscreen);
    return () => document.removeEventListener('fullscreenchange', checkFullscreen);
});

*/
