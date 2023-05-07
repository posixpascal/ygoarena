"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableCardSet = void 0;
const react_1 = __importDefault(require("react"));
const CardSet_1 = require("@/components/CardSet");
const web_1 = require("@react-spring/web");
const SelectableCardSet = ({ selected, set, addSet, removeSet }) => {
    const isSelected = selected.includes(set.id);
    const [style] = (0, web_1.useSpring)(() => ({
        from: { scale: 1.0 },
        to: { scale: isSelected ? 0.95 : 1 },
    }), [isSelected]);
    const [checkStyle] = (0, web_1.useSpring)(() => ({
        from: { opacity: 0 },
        to: { opacity: isSelected ? 1 : 0 },
        config: {
            mass: 0.1
        }
    }), [isSelected]);
    const toggleSelection = () => {
        if (isSelected) {
            removeSet(set);
            return;
        }
        addSet(set);
    };
    return <web_1.animated.div style={style} className={'cursor-pointer will-change-transform h-full items-center flex justify-center w-full relative'} onClick={toggleSelection}>
        <CardSet_1.CardSet cardSet={set}/>
        {isSelected && <web_1.animated.div style={checkStyle} className='will-change-transform z-10 absolute right-1 top-1 z-20 text-green-400'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </web_1.animated.div>}
    </web_1.animated.div>;
};
exports.SelectableCardSet = SelectableCardSet;
