"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Headline = void 0;
const react_1 = __importDefault(require("react"));
const Headline = ({ children }) => {
    return <h1 className={'text-6xl text-sky-900 font-black uppercase'}>
        {children}
    </h1>;
};
exports.Headline = Headline;
