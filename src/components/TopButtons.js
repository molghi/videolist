import './styles/Modal.css';
import './styles/TopButtons.css';
import { useState, useRef, useContext } from 'react';
import MyContext from '../context/MyContext';
import ReactDOM from 'react-dom';
import changeColor from '../utilities/changeColor';
import { viewSavedLists } from '../utilities/topButtonsFunctions';

// ================================================================================================

function TopButtons() {
    const { setResults, setTotalVideos, setNextPageToken, setAccentColor, setResultsUnfiltered, setChannelId } = useContext(MyContext);
    const [showModal, setShowModal] = useState(false); // responsible for: is modal shown or not?
    const [modal, setModal] = useState(); // responsible for: modal's jsx
    const myWindow = useRef(); // ref to the modal

    return (
        <div className="main__top">
            <button
                onClick={() => viewSavedLists(setShowModal, setModal, setResults, setTotalVideos, setNextPageToken, myWindow, setResultsUnfiltered, setChannelId)}
                title="View your saved video lists"
            >
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
