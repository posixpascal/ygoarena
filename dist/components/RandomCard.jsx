"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomCard = void 0;
const trpc_1 = require("@/utils/trpc");
const react_1 = __importDefault(require("react"));
const CardContainer_1 = require("./CardContainer");
const RandomCard = () => {
    const card = trpc_1.trpc.cards.random.useQuery({ amount: 1 });
    if (card.isLoading) {
        return <div>
            Loading...
        </div>;
    }
    if (card.data === null) {
        return <div>Keine Karten gefunden.</div>;
    }
    return <CardContainer_1.CardContainer card={card.data[0]}/>;
};
exports.RandomCard = RandomCard;
