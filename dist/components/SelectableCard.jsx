"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableCard = void 0;
const react_1 = __importDefault(require("react"));
const web_1 = require("@react-spring/web");
const Card_1 = require("@/components/Card");
const Button_1 = require("@/components/Button");
const SelectableCard = ({ index = 0, hidden, canAddMain, canAddSide, canAddExtra, addMain, addSide, card }) => {
    const isExtraDeckCard = card.type.includes("FUSION") || card.type.includes("XYZ") || card.type.includes("SYNCHRO");
    return <web_1.animated.div className={'cursor-pointer will-change-transform relative w-full h-full'}>
        <div className={'min-h-[400px]'}>
            <Card_1.Card index={index} flippable={true} flipped={!hidden} card={card}/>
        </div>
        <div className={'flex mt-4 flex-col gap-2 justify-between'}>
            <Button_1.Button onClick={() => addMain(card)} className={`block w-full ${canAddMain ? '' : ' opacity-40 grayscale pointer-events-none'}`} title={"Main Deck"}/>
            <Button_1.Button onClick={() => addSide(card)} className={`block w-full ${canAddSide ? '' : ' opacity-40 grayscale pointer-events-none'}`} title={"Side Deck"}/>
        </div>
    </web_1.animated.div>;
};
exports.SelectableCard = SelectableCard;
