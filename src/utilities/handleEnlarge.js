const handleEnlarge = (myIframe, myWrapper, setEnlarged, iframeWidth, iframeHeight) => {
    // make the iframe occupy 100% of window width and height
    setEnlarged((prev) => {
        if (!prev) {
            myIframe.current.width = window.innerWidth;
            myIframe.current.height = window.innerHeight;
            myIframe.current.parentElement.style.width = '100%';
            myIframe.current.parentElement.style.height = '100%';
            [...myWrapper.current.querySelectorAll('button')].forEach((btn) => btn.classList.add('btn-vid-enlarged'));
        } else {
            myIframe.current.width = iframeWidth;
            myIframe.current.height = iframeHeight;
            myIframe.current.parentElement.style.width = iframeWidth + 'px';
            myIframe.current.parentElement.style.height = iframeHeight + 'px';
            [...myWrapper.current.querySelectorAll('button')].forEach((btn) => btn.classList.remove('btn-vid-enlarged'));
        }
        return !prev;
    });
};

export default handleEnlarge;
