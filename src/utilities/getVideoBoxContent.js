// iframe (and other things) renderer

function getVideoBoxContent(
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
) {
    return (
        <div className="video-playbox" ref={myWrapper}>
            <button onClick={() => handleEnlarge(myIframe, myWrapper)} className="video-playbox__enlarge">
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
                    src={url}
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
                            <button className="video-playbox__btn" onClick={(e) => handleFilterChange(e, 'vignette', vignetteEl)}>
                                Vignette
                            </button>
                            <button className="video-playbox__btn" title="Old TV noise visual effect" onClick={(e) => handleFilterChange(e, 'noise', '', noiseEl)}>
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
}

export default getVideoBoxContent;
