import './styles/Modal.css';
import './styles/TopButtons.css';
import { useState, useRef, useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import ReactDOM from 'react-dom';
import changeColor from '../utilities/changeColor';
import fetchVideos from '../utilities/fetchVideos';

// ================================================================================================

function TopButtons() {
    const { setResults, setTotalVideos, setNextPageToken, setAccentColor, setResultsUnfiltered, setChannelId, savedChannels, setSavedChannels } = useContext(MyContext);
    const [showModal, setShowModal] = useState(false); // responsible for: is modal shown or not?
    const [modal, setModal] = useState(); // responsible for: modal's jsx
    const myWindow = useRef(); // ref to the modal

    const closeModal = () => setShowModal(false);
    const handleOutsideClick = (e) => myWindow.current.contains(e.target) === false && closeModal(setShowModal); // if the click was outside modal window, close modal
    const performFetching = (e) => {
        closeModal(); // happens upon clicking on one item of the saved ones --> modal closes, videos from that channel get fetched
        setChannelId(e.target.id);
        fetchVideos(e.target.id, '', setResults, setTotalVideos, setNextPageToken, setResultsUnfiltered);
    };
    const removeFromSaved = (entry) => {
        setSavedChannels((prev) => {
            const newState = prev.filter((x) => x[0] !== entry[0]);
            localStorage.setItem('videolistSaved', JSON.stringify(newState));
            return newState;
        });
    };

    useEffect(() => {
        // setting modal's jsx:
        setModal(
            <>
                <div onClick={(e) => handleOutsideClick(e, myWindow, closeModal, setShowModal)} className="modal-box">
                    <div ref={myWindow} className="modal-inner">
                        <button onClick={() => closeModal()} className="modal-close">
                            close
                        </button>
                        <div className="modal-title">Your Saved Video Lists</div>
                        <div className="modal-entries">
                            {savedChannels && savedChannels.length > 0 ? (
                                savedChannels.map((entry, i) => (
                                    <div key={entry[0]} className="modal-entry">
                                        <span>{i + 1}.</span>
                                        <button onClick={(e) => performFetching(e)} title="Click to show this channel's videos" id={entry[0]}>
                                            {entry[1]}
                                        </button>
                                        <button onClick={(e) => removeFromSaved(entry)}>remove</button>
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal, savedChannels, setChannelId, setNextPageToken, setResults, setResultsUnfiltered, setSavedChannels, setTotalVideos]);

    return (
        <div className="main__top">
            <button onClick={() => setShowModal(true)} title="View your saved video lists">
                View Saved
            </button>
            <button onClick={() => changeColor(setAccentColor)} title="Change the accent color of the interface" className="main__color-btn">
                Change Color
            </button>

            {showModal && ReactDOM.createPortal(modal, document.querySelector('.modal'))}
        </div>
    );
}

// ================================================================================================

export default TopButtons;
