import { createContext, useState } from 'react';

const MyContext = createContext();

// ================================================================================================

function Provider({ children }) {
    const [results, setResults] = useState([]); // search results or fetched videos (after search results)

    const toExport = { results, setResults };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

// ================================================================================================

export default MyContext;
export { Provider };
