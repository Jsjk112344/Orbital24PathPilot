import React, { createContext, useState, useContext } from "react";

const BottomDrawerContext = createContext();

export const BottomDrawerProvider = ({ children }) => {
    const [currentInstruction, setCurrentInstruction] = useState('No Instructions Yet!');
    const [nextStopName, setNextStopName] = useState('');


    return (
        <BottomDrawerContext.Provider value={{ 
            currentInstruction, 
            setCurrentInstruction,
            nextStopName,
            setNextStopName 
        }}>
            {children}
        </BottomDrawerContext.Provider>
    );
};

export const useBottomDrawer = () => useContext(BottomDrawerContext);