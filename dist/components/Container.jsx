"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const Container = ({ children }) => {
    return <div className={'p-6 mx-auto'}>
        {children}
    </div>;
};
exports.Container = Container;
