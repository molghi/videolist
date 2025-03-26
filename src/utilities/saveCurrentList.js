// saving the currently shown video list into my Saved Lists

const saveCurrentList = (channelId, results) => {
    const videolistObj = [channelId, results[0].channelTitle];

    const fromLS = JSON.parse(localStorage.getItem('videolistSaved'));

    let toStore;
    if (!fromLS) toStore = [videolistObj];
    else {
        if (!fromLS.map((x) => x[0]).includes(channelId)) toStore = [...fromLS, videolistObj];
        else toStore = fromLS;
    }

    localStorage.setItem('videolistSaved', JSON.stringify(toStore));
};

export default saveCurrentList;
