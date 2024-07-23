import React, { createContext, useState, useContext } from "react";

const BottomDrawerContext = createContext();

export const BottomDrawerProvider = ({ children }) => {
    const [currentInstruction, setCurrentInstruction] = useState('No Instructions Yet!');
    const [nextStopName, setNextStopName] = useState(" ");
    const [otherInstruction, setOtherInstruction] = useState('');


    return (
        <BottomDrawerContext.Provider value={{ 
            currentInstruction, 
            setCurrentInstruction,
            otherInstruction,
            setOtherInstruction,
            nextStopName,
            setNextStopName 
        }}>
            {children}
        </BottomDrawerContext.Provider>
    );
};

export const useBottomDrawer = () => useContext(BottomDrawerContext);