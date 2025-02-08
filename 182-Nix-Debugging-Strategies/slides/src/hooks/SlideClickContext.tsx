import React, { createContext, useContext, useState } from "react";


interface SlideState {
  slide: number
  click: number
}

interface SlideClickContextType {
  slideState: SlideState;
  setSlideState: (slide: number, click: number) => void;
}

const SlideClickContext = createContext<SlideClickContextType | undefined>(undefined);

export const SlideClickProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = new URLSearchParams(window.location.search);
  const [slideState, setSlideStateInternal] = useState({
    slide: parseInt(params.get('slide') || "0"),
    click: parseInt(params.get("click") || "0"),
  });

  const setAddressBar = (slideState: SlideState) => {
    history.replaceState(null, "", `/?slide=${slideState.slide}&click=${slideState.click}`);
  };
  const setSlideState = (newState: SlideState) => {
    setAddressBar(newState);
    setSlideStateInternal(newState);
  };

  return (
    <SlideClickContext.Provider value={{ slideState, setSlideState }}>
      {children}
    </SlideClickContext.Provider>
  );
};

export const useSlideClick = () => {
  const context = useContext(SlideClickContext);
  if (!context) {
    throw new Error("useSlideClick must be used within a SlideClickProvider");
  }
  return context;
};
