"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecksCardSummary = void 0;
const react_1 = __importDefault(require("react"));
const enums_1 = require("@/utils/enums");
const DecksCardSummary = ({ cards }) => {
    const monsterCount = cards.filter(card => {
        return card.type !== enums_1.CardType.SPELL_CARD && card.type !== enums_1.CardType.TRAP_CARD;
    }).length;
    const trapCount = cards.filter(card => {
        return card.type === enums_1.CardType.TRAP_CARD;
    }).length;
    const spellCount = cards.filter(card => {
        return card.type === enums_1.CardType.SPELL_CARD;
    }).length;
    return <div className={"flex gap-4 text-sm text-sky-300 mb-3"}>
        <div className={"flex gap-1"}>
            <span>{monsterCount}</span> Monsters
        </div>
        <div>
            &bull;
        </div>
        <div className={"flex gap-1"}>
            <span>{spellCount}</span> Spells
        </div>
        <div>
            &bull;
        </div>
        <div className={"flex gap-1"}>
            <span>{trapCount}</span> Traps
        </div>
    </div>;
};
exports.DecksCardSummary = DecksCardSummary;
