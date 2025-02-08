import React, {useEffect} from 'react';
import { useSlideClick } from '../hooks/SlideClickContext';


interface SlideProps {
    children?: any
}
export default function Slide(props: SlideProps) {
    const children = React.Children.toArray(props.children);
    const { slide, setSlide, click, setClick } = useSlideClick();
    const nextClick = () => {
        if (click >= children.length - 1) {
            setSlide(slide+1);
            setClick(0);
        } else {
            setClick(click+1);
        }
    };
    const prevClick = () => {
        if (click > 0) {
            setClick(click - 1);
        } else {
            setSlide(slide-1);
            setClick(0);
        }
    };
    const handleKey = (e) => {
        if (e.key == "ArrowLeft") {
            prevClick();
        } else if (e.key == "ArrowRight") {
            nextClick();
        }
    };
    const handleClick = (e) => {
        setSlide(slide => slide+1);
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
                    <div className="opacity-0">{child}</div>
                );
            })}
        </div>
    );
}
