"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardContainer = void 0;
const react_1 = __importDefault(require("react"));
const Card_1 = require("./Card");
// WIP: Show card attributes in more detail like here: https://ygoprodeck.com/card/blue-eyes-white-dragon-7485
const CardContainer = ({ card }) => {
    const isMonsterCard = card.type.includes("MONSTER");
    return <div className={'flex flex-row gap-4 justify-center'}>
        <Card_1.Card card={card}/>
        <div className={'flex flex-col '}>
          {<h1 className={'text-2xl font-black mb-4'}>{card.name}</h1>}
          <div>Type: {card.type}</div>
          <div>Subtype: {card.race}</div>
          {isMonsterCard && <div>Attribute: {card.attribute}</div>}
          {isMonsterCard && <div>Level: {card.level}</div>}
          {isMonsterCard && <div>ATK: {card.atk}</div>}
          {isMonsterCard && <div>DEF: {card.def}</div>}
          <div><br />{card.desc}</div>
        </div>
    </div>;
};
exports.CardContainer = CardContainer;
