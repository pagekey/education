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
        setSlide(slide-1);
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
            {children.filter((child, index) => index <= click)}
            {/* {React.Children.map(props.children, (child, index) => {
                return (
                    <>
                        {child}
                    </>
                );
            })} */}
        </div>
    );
}
