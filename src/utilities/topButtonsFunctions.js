import fetchVideos from '../utilities/fetchVideos';

// ================================================================================================

// general function in this file -- happens upon clicking on 'View Saved' -- it renders a modal window
const viewSavedLists = (setShowModal, setModal, setResults, setTotalVideos, setNextPageToken, myWindow, setResultsUnfiltered, setChannelId) => {
    const fromLS = JSON.parse(localStorage.getItem('videolistSaved'));

    setShowModal(true); // modal is shown

    // setting modal's jsx
    setModal(
        <>
            <div onClick={(e) => handleOutsideClick(e, myWindow, closeModal, setShowModal)} className="modal-box">
                <div ref={myWindow} className="modal-inner">
                    <button onClick={() => closeModal(setShowModal)} className="modal-close">
                        close
                    </button>
                    <div className="modal-title">Your Saved Video Lists</div>
                    <div className="modal-entries">
                        {fromLS ? (
                            Object.entries(fromLS).map((entry, i) => (
                                <div key={entry[0]} className="modal-entry">
                                    <span>{i + 1}.</span>
                                    <button
                                        onClick={(e) =>
                                            performFetching(e, setShowModal, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, setChannelId)
                                        }
                                        title="Click to show the videos from this channel"
                                        id={entry[0]}
                                    >
                                        {entry[1]}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <i>Nothing here yet...</i>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// ================================================================================================

// called in 'viewSavedLists' -- if the click was outside modal window (on the overlay), close modal
const handleOutsideClick = (e, myWindow, closeModal, setShowModal) => {
    const isWithinWindow = myWindow.current.contains(e.target);
    if (isWithinWindow === false) closeModal(setShowModal);
};

// ================================================================================================

// called in 'viewSavedLists' -- happens upon clicking on one item of the saved ones --> modal closes, videos from that channel get fetched
const performFetching = (e, setShowModal, setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered, setChannelId) => {
    setShowModal(false);
    setChannelId(e.target.id);
    fetchVideos(e.target.id, '', setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered);
};

// ================================================================================================

// called in 'viewSavedLists' -- closes the modal
const closeModal = (setShowModal) => setShowModal(false);

// ================================================================================================

export { viewSavedLists, handleOutsideClick, performFetching, closeModal };
