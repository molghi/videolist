// saving the currently shown video list into my Saved Lists

const saveCurrentList = (channelId, results) => {
    const videolistObj = {
        [channelId]: results[0].channelTitle,
    };

    const fromLS = JSON.parse(localStorage.getItem('videolistSaved'));

    let toStore;
    if (!fromLS) toStore = { ...videolistObj };
    else toStore = { ...fromLS, ...videolistObj };

    localStorage.setItem('videolistSaved', JSON.stringify(toStore));
};

export default saveCurrentList;
