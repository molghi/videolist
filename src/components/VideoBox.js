import { useState, useRef, useEffect } from 'react';

function VideoBox({ isShown, data, setShown }) {
    // console.log(JSON.parse(localStorage.getItem('userVideoSettings')));
    const iframeWidth = '960';
    const iframeHeight = '540';
    const vignetteEl = useRef();
    const noiseEl = useRef();
    const [userVideoSettings, setUserVideoSettings] = useState({
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        sepia: 0,
        vignette: false,
        noise: false,
    });

    useEffect(() => {
        const checkFullscreen = () => {
            if (document.fullscreenElement?.tagName === 'IFRAME') {
                console.log('apply classes to body');
                userVideoSettings.vignette && document.querySelector('.video-playbox__frame-box').classList.add('video-playbox__vignette');
                userVideoSettings.noise && document.querySelector('.video-playbox__frame-box').classList.add('video-playbox__noise');
            } else {
                console.log('remove classes from body');
                document.querySelector('.video-playbox__frame-box').classList.remove('video-playbox__vignette');
                document.querySelector('.video-playbox__frame-box').classList.remove('video-playbox__noise');
            }
        };
        document.addEventListener('fullscreenchange', checkFullscreen);
        return () => document.removeEventListener('fullscreenchange', checkFullscreen);
    });

    useEffect(() => {
        // on first render/page refresh, fetch state from LS and set it
        const savedSettings = JSON.parse(localStorage.getItem('userVideoSettings'));
        if (savedSettings) {
            // console.log('1', savedSettings);
            setUserVideoSettings((prev) => {
                return { ...prev, ...savedSettings };
            });
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            // setUserVideoSettings((prev) => ({ ...prev }));
            // console.log('2', userVideoSettings);
            localStorage.setItem('userVideoSettings', JSON.stringify({ ...userVideoSettings }));
        }, 500); // small timeout so the first useEffect could do its business else this useEffect operates on unupdated values
    }, [userVideoSettings]);

    if (!data || !isShown) return document.body.classList.remove('o-h'); // remove overflow hidden
    document.body.classList.add('o-h');

    const filters = ['brightness', 'contrast', 'grayscale', 'sepia']; // filter names

    const url = `https://www.youtube.com/embed/${data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3)}`; // getting url for iframe

    const handleFilterChange = (e, inputName) => {
        // runs upon change of input value
        if (inputName === 'brightness') setUserVideoSettings((prev) => ({ ...prev, brightness: e.target.value }));
        if (inputName === 'contrast') setUserVideoSettings((prev) => ({ ...prev, contrast: e.target.value }));
        if (inputName === 'grayscale') setUserVideoSettings((prev) => ({ ...prev, grayscale: e.target.value }));
        if (inputName === 'sepia') setUserVideoSettings((prev) => ({ ...prev, sepia: e.target.value }));
        if (inputName === 'vignette') {
            setUserVideoSettings((prev) => ({ ...prev, vignette: !prev.vignette }));
            vignetteEl.current.classList.toggle('hidden');
        }
        if (inputName === 'noise') {
            setUserVideoSettings((prev) => ({ ...prev, noise: !prev.noise }));
            noiseEl.current.classList.toggle('hidden');
        }
    };

    const handleValue = (inputName) => {
        // passing 'value' attr to input range (video effects)
        if (inputName === 'brightness') return userVideoSettings.brightness;
        if (inputName === 'contrast') return userVideoSettings.contrast;
        if (inputName === 'grayscale') return userVideoSettings.grayscale;
        if (inputName === 'sepia') return userVideoSettings.sepia;
    };

    // setting content
    const content = (
        <div className="video-playbox">
            <button onClick={() => setShown(false)} className="video-playbox__close">
                close
            </button>

            <div className="video-playbox__video-place">The video will be here...</div>

            <div className="video-playbox__frame-box">
                <iframe
                    width={iframeWidth}
                    height={iframeHeight}
                    src={url}
                    title={data.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
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
                            <button className="video-playbox__btn" onClick={(e) => handleFilterChange(e, 'vignette')}>
                                Vignette
                            </button>
                            <button className="video-playbox__btn" title="Old TV noise visual effect" onClick={(e) => handleFilterChange(e, 'noise')}>
                                Old TV
                            </button>
                        </div>
                    </div>
                    <div className="video-playbox__filter-settings">
                        {filters.map((x, i) => (
                            <div key={i} className="video-playbox__filter-setting">
                                <label htmlFor={x}>{x}</label>
                                <input
                                    type="range"
                                    id={x}
                                    step="1"
                                    min="0"
                                    max={x === 'grayscale' || x === 'sepia' ? '100' : '200'}
                                    value={handleValue(x)}
                                    onChange={(e) => handleFilterChange(e, x)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return isShown && content;
}

export default VideoBox;
