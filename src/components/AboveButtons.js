import './styles/AboveButtons.css';
import { useState, useRef, useEffect, useContext } from 'react';
import MyContext from '../context/MyContext';
import saveCurrentList from '../utilities/saveCurrentList';

// ================================================================================================

// this function component renders 'Save List' and 'Hide Shorts' buttons of a particular video list
function AboveButtons() {
    const { toggleShorts, shortsVisible, isInSaved, channelId, results, setSavedChannels } = useContext(MyContext);
    const [saveBtn, setSaveBtn] = useState('Save List'); // setting btn text
    const [title, setTitle] = useState('Add this video list to your saved ones for quick access'); // setting btn title
    const mySaveBtn = useRef();

    // happens only upon initial loadup
    useEffect(() => {
        if (isInSaved) {
            setSaveBtn('List Saved'); // if this list is in Saved, updating btn text
            mySaveBtn.current.disabled = true; // disabling that btn
            mySaveBtn.current.classList.add('disabled'); // adding disabled class
            setTitle('This list is already in your Saved'); // changing btn title
        }
        if (saveBtn === 'List Saved') {
            setTitle('This list is already in your Saved');
        }
        if (!isInSaved) {
            setSaveBtn('Save List');
            mySaveBtn.current.disabled = false;
            mySaveBtn.current.classList.remove('disabled');
            setTitle('Add this video list to your saved ones for quick access');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInSaved]);

    const handleSaveClick = () => {
        saveCurrentList(channelId, results); // pushing this videolist to LS to quickly access it later
        setSaveBtn('List Saved'); // updating btn text
        setSavedChannels((prev) => {
            if (!prev.map((x) => x[0]).includes(channelId)) return [...prev, [channelId, results[0].channelTitle]];
            else return prev;
        });
        mySaveBtn.current.disabled = true; // disabling that btn
        mySaveBtn.current.classList.add('disabled'); // adding disabled class
    };

    return (
        <div className="above-buttons">
            <button onClick={handleSaveClick} ref={mySaveBtn} title={title}>
                {saveBtn}
            </button>
            <button onClick={toggleShorts}>{!shortsVisible ? 'Show Shorts' : 'Hide Shorts'}</button>
        </div>
    );
}

// ================================================================================================

export default AboveButtons;
