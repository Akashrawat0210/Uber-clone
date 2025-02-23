import { createContext, useState, useContext } from "react";    

export const CaptionDataContext = createContext();

const CaptionContext= ({children}) => {
    const [caption, setCaption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState(null);

    const updateCaption = (captionData) => {
        setCaption(captionData);
    }

    const value = {
        caption,
        setCaption, 
        isLoading,  
        setIsLoading,
        error,
        setError,
        updateCaption
    };

    return (
        <CaptionDataContext.Provider value={{caption, setCaption}}>
            {children}
        </CaptionDataContext.Provider>
    )
}

export default CaptionContext;