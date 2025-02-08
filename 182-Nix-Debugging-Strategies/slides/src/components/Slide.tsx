import React, {useEffect} from 'react';
import { useSlideClick } from '../hooks/SlideClickContext';


interface SlideProps {
    children?: any
}
export default function Slide(props: SlideProps) {
    const children = React.Children.toArray(props.children);
    const { slideState, setSlideState, nextSlide, prevSlide, nextClick, prevClick } = useSlideClick();
    const { slide, click } = slideState;
    const handleNextClick = () => {
        if (click >= children.length - 1) {
            nextSlide();
        } else {
            nextClick();
        }
    };
    const handlePrevClick = () => {
        if (click > 0) {
            prevClick();
        } else {
            prevSlide();
        }
    };
    const handleKey = (e) => {
        if (e.key == "ArrowLeft") {
            handlePrevClick();
        } else if (e.key == "ArrowRight") {
            handleNextClick();
        }
    };
    const handleClick = (e) => {
        handleNextClick();
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.removeEventListener("click", handleClick);
        };
    }, [slide, click]);
    
    return (
        <div className="flex flex-col items-center justify-center h-full">
            {children.map((child, index) => {
                return index <= click ? (
                    child
                ) : (
                    <div key={index} className="opacity-0">{child}</div>
                );
            })}
        </div>
    );
}
