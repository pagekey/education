import React from 'react';


interface LayoutProps {
    children?: any
}
export default function Layout(props: LayoutProps) {
    return (
        <>
            {props.children}
        </>
    );
}
