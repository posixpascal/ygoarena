"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaging = void 0;
const react_1 = require("react");
const usePaging = ({ elementRef, onNextPage }) => {
    (0, react_1.useEffect)(() => {
        if (!elementRef.current) {
            return;
        }
        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onNextPage();
            }
        }, { root: null, threshold: 0.1 });
        observer.observe(elementRef.current);
        return () => {
            observer.disconnect();
        };
    }, [onNextPage, elementRef]);
};
exports.usePaging = usePaging;
