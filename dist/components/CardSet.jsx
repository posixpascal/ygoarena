"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSet = void 0;
const react_1 = __importDefault(require("react"));
const CardSet = ({ cardSet }) => {
    const [code, edition] = cardSet.code.split('-');
    return <div className={'flex flex-col rounded-xl items-center bg-white p-3 text-center'}>
        <div className={'max-h-[150px] relative'}>
            <img src={cardSet.image} className={'object-contain h-[150px]'} alt={cardSet.name}/>
        </div>
        <div className={'flex items-center text-sm justify-center'}>
            <span className={'opacity-90'}>{cardSet.name}</span>
        </div>
    </div>;
};
exports.CardSet = CardSet;
