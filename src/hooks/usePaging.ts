import {MutableRefObject, Ref, useEffect} from "react";

interface PagingProps {
    elementRef: MutableRefObject<HTMLElement>,
    onNextPage: CallableFunction
}

export const usePaging : Function = ({elementRef, onNextPage}: PagingProps) => {
    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onNextPage();
            }
        }, {root: null, threshold: 0.1});

        observer.observe(elementRef.current);
        return () => {
            observer.disconnect();
        }
    }, [onNextPage, elementRef]);
}