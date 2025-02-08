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
  const { slide, click } = slideState;
  const [maxClicks, setMaxClicks] = useState<object>({});

  const setAddressBar = (slideState: SlideState) => {
    history.replaceState(null, "", `/?slide=${slideState.slide}&click=${slideState.click}`);
  };
  const setSlideState = (newState: SlideState) => {
    setAddressBar(newState);
    setSlideStateInternal(newState);
  };
  const nextSlide = () => {
    setSlideState({slide: slide + 1, click: 0});
  };
  const prevSlide = () => {
    setSlideState({slide: slide - 1, click: 0}); // TODO remember max click
  };
  const nextClick = () => {
    setSlideState({slide, click: click + 1});
  };
  const prevClick = () => {
    setSlideState({slide, click: click - 1});
  };

  return (
    <SlideClickContext.Provider value={{ slideState, setSlideState, nextSlide, prevSlide, nextClick, prevClick }}>
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
