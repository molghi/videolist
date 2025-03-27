const handleFilterChange = (e, inputName, vignetteEl, noiseEl, setUserVideoSettings) => {
    // runs upon change of input value in VideoBox (iframe renderer)
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

// ================================================================================================

const handleValue = (inputName, userVideoSettings) => {
    // passing 'value' attr to input range (video effects)
    if (inputName === 'brightness') return userVideoSettings.brightness;
    if (inputName === 'contrast') return userVideoSettings.contrast;
    if (inputName === 'grayscale') return userVideoSettings.grayscale;
    if (inputName === 'sepia') return userVideoSettings.sepia;
};

export { handleFilterChange, handleValue };
