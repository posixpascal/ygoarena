import React, {ReactNode, useEffect, useState} from "react";

const SCROLL_SPEED = 300;

export const WallScroller : React.FC<{children: ReactNode}> = ({children}) => {
    const [transform, setTransform] = useState('translateY(0%)');
    useEffect(() => {
        let timer = setTimeout(() => {
            setTransform('translateY(-100%)')
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    }, []);
    return <div className={'max-h-screen overflow-hidden'}>
        <div style={{
            transform
        }} className={'transition-transform ease-linear duration-[120s]'}>
            {children}
        </div>
    </div>
}