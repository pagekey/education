import React, { createContext, useContext, useState } from "react";


interface SlideClickContextType {
  slide: number;
  setSlide: (value: number) => void;
  click: number;
  setClick: (value: number) => void;
}

const SlideClickContext = createContext<SlideClickContextType | undefined>(undefined);

export const SlideClickProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = new URLSearchParams(window.location.search);
  const [slide, setSlideState] = useState(parseInt(params.get('slide') || "1") - 1);
  const [click, setClickState] = useState(parseInt(params.get('click') || "1") - 1);

  const setAddressBar = (slide: number, click: number) => {
    history.pushState(null, "", `/?slide=${slide}&click=${click}`);
  };
  const setSlide = (newSlide: number|Function) => {
    if (typeof newSlide === "function") {
      let newSlideCalled = newSlide(slide);
      setAddressBar(newSlideCalled, click);
    } else {
      setAddressBar(newSlide, click);
    }
    setSlideState(newSlide);
  };
  const setClick = (newClick: number) => {
    setAddressBar(slide, newClick);
    setClickState(newClick);
  };

  return (
    <SlideClickContext.Provider value={{ slide, setSlide, click, setClick }}>
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
