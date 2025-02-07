import React, { createContext, useContext, useState } from "react";


interface SlideClickContextType {
  slide: number;
  setSlide: (value: number) => void;
  click: number;
  setClick: (value: number) => void;
}

const SlideClickContext = createContext<SlideClickContextType | undefined>(undefined);

export const SlideClickProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slide, setSlide] = useState(0);
  const [click, setClick] = useState(0);

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
