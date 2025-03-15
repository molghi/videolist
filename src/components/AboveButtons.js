import './styles/AboveButtons.css';
import { useState, useRef, useEffect } from 'react';

// ================================================================================================

function AboveButtons({ toggleShorts, shortsVisible, saveCurrentList, isInSaved }) {
    const [saveBtn, setSaveBtn] = useState('Save List');
    const [title, setTitle] = useState('Add this video list to your saved ones for quick access');
    const mySaveBtn = useRef();

    useEffect(() => {
        setTimeout(() => {
            if (isInSaved) {
                setSaveBtn('List Saved');
                mySaveBtn.current.disabled = true;
                mySaveBtn.current.classList.add('disabled');
                setTitle('This list is already in your Saved');
            }
            if (saveBtn === 'List Saved') {
                setTitle('This list is already in your Saved');
            }
        }, 100);
    }, []);

    const handleSave = () => {
        saveCurrentList();
        setSaveBtn('List Saved');
        mySaveBtn.current.disabled = true;
        mySaveBtn.current.classList.add('disabled');
    };

    return (
        <div className="above-buttons">
            <button onClick={handleSave} ref={mySaveBtn} title={title}>
                {saveBtn}
            </button>
            <button onClick={toggleShorts}>{!shortsVisible ? 'Show Shorts' : 'Hide Shorts'}</button>
        </div>
    );
}

// ================================================================================================

export default AboveButtons;
