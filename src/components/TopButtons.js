import './styles/Modal.css';
import './styles/TopButtons.css';
import { useState, useRef } from 'react';
import changeColor from '../utilities/changeColor';
import ReactDOM from 'react-dom';
import fetchVideos from '../utilities/fetchVideos';

// ================================================================================================

function TopButtons({ setAccentColor, setResults, setTotalVideos, setNextPageToken }) {
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();
    const myWindow = useRef();

    const closeModal = () => {
        setShowModal(false);
    };

    const handleClick = (e) => {
        const isWithinWindow = myWindow.current.contains(e.target);
        if (isWithinWindow === false) closeModal();
    };

    const doFetching = (e) => {
        setShowModal(false);
        fetchVideos(e.target.id, '', setResults, setTotalVideos, setNextPageToken);
    };

    const viewSavedLists = () => {
        const fromLS = JSON.parse(localStorage.getItem('videolistSaved'));
        setShowModal(true);
        setModal(
            <>
                <div onClick={handleClick} className="modal-box">
                    <div ref={myWindow} className="modal-inner">
                        <button onClick={closeModal} className="modal-close">
                            close
                        </button>
                        <div className="modal-title">Your Saved Video Lists</div>
                        <div className="modal-entries">
                            {fromLS ? (
                                Object.entries(fromLS).map((entry, i) => (
                                    <div key={entry[0]} className="modal-entry">
                                        <span>{i + 1}.</span>
                                        <button onClick={doFetching} title="Click to show the videos from this channel" id={entry[0]}>
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

    return (
        <div className="main__top">
            <button onClick={viewSavedLists} title="View your saved video lists">
                View Saved
            </button>
            <button onClick={() => changeColor(setAccentColor)} title="Change the accent color of the interface" className="main__color-btn">
                Change Color
            </button>

            {showModal && ReactDOM.createPortal(modal, document.querySelector('.modal'))}
        </div>
    );
}

// ================================================================================================ justczeching

export default TopButtons;
