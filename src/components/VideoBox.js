import { useState, useRef, useEffect } from 'react';

function VideoBox({ isShown, data, setShown }) {
    console.log(JSON.parse(localStorage.getItem('userVideoSettings')));
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [sepia, setSepia] = useState(0);
    const [vignette, setVignette] = useState(false);
    const [noise, setNoise] = useState(false);
    const vignetteEl = useRef();
    const noiseEl = useRef();
    const [userVideoSettings, setUserVideoSettings] = useState({
        // brightness: JSON.parse(localStorage.getItem('userVideoSettings'))?.brightness || 100,
        // contrast: JSON.parse(localStorage.getItem('userVideoSettings'))?.contrast || 100,
        // grayscale: JSON.parse(localStorage.getItem('userVideoSettings'))?.grayscale || 0,
        // sepia: JSON.parse(localStorage.getItem('userVideoSettings'))?.sepia || 0,
        // vignette: JSON.parse(localStorage.getItem('userVideoSettings'))?.vignette || false,
        // noise: JSON.parse(localStorage.getItem('userVideoSettings'))?.noise || false,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        sepia: 0,
        vignette: false,
        noise: false,
    });

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem('userVideoSettings'));
        // HERE IT IS STILL FINE
        // console.log(savedSettings);
        if (savedSettings) {
            setUserVideoSettings(savedSettings); // set state from LS on first render
        }
    }, []);

    useEffect(() => {
        // HERE SOMETHING IS WRONG
        setUserVideoSettings((prev) => ({ ...prev, brightness, contrast, grayscale, sepia, vignette, noise }));
        localStorage.setItem('userVideoSettings', JSON.stringify({ ...userVideoSettings, brightness, contrast, grayscale, sepia, vignette, noise }));
        // const fromLS = localStorage.getItem('userVideoSettings');
        // if (!fromLS) {
        //     setUserVideoSettings((prev) => ({ ...prev, brightness, contrast, grayscale, sepia, vignette, noise }));
        //     localStorage.setItem('userVideoSettings', JSON.stringify({ ...userVideoSettings, brightness, contrast, grayscale, sepia, vignette, noise }));
        // } else {
        // const parsed = JSON.parse(localStorage.getItem('userVideoSettings'));
        // console.log(parsed);
        // setUserVideoSettings((prev) => ({ ...prev, ...parsed }));
        //     setUserVideoSettings((prev) => ({ ...prev, brightness, contrast, grayscale, sepia, vignette, noise }));
        //     localStorage.setItem('userVideoSettings', JSON.stringify({ ...userVideoSettings, brightness, contrast, grayscale, sepia, vignette, noise }));
        // }
    }, [brightness, contrast, grayscale, sepia, vignette, noise]);

    if (!data || !isShown) return document.body.classList.remove('o-h');
    document.body.classList.add('o-h');

    const filters = ['brightness', 'contrast', 'grayscale', 'sepia'];

    const url = `https://www.youtube.com/embed/${data.videoUrl.slice(data.videoUrl.indexOf('?v=') + 3)}`;

    const handleFilterChange = (e, inputName) => {
        if (inputName === 'brightness') setBrightness(e.target.value);
        if (inputName === 'contrast') setContrast(e.target.value);
        if (inputName === 'grayscale') setGrayscale(e.target.value);
        if (inputName === 'sepia') setSepia(e.target.value);
        if (inputName === 'vignette') {
            setVignette(!vignette);
            vignetteEl.current.classList.toggle('hidden');
        }
        if (inputName === 'noise') {
            setNoise(!noise);
            noiseEl.current.classList.toggle('hidden');
        }
    };

    const handleValue = (inputName) => {
        if (inputName === 'brightness') return brightness;
        if (inputName === 'contrast') return contrast;
        if (inputName === 'grayscale') return grayscale;
        if (inputName === 'sepia') return sepia;
    };

    const content = (
        <div className="video-playbox">
            <button onClick={() => setShown(false)} className="video-playbox__close">
                close
            </button>

            <div className="video-playbox__video-place">The video will be here...</div>

            <div className="video-playbox__frame-box">
                <iframe
                    width="960"
                    height="540"
                    src={url}
                    title={data.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)` }}
                ></iframe>

                <div ref={vignetteEl} className="video-playbox__vignette hidden"></div>
                <div ref={noiseEl} className="video-playbox__noise hidden"></div>

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
