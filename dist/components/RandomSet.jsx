"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomSet = void 0;
const trpc_1 = require("@/utils/trpc");
const react_1 = __importDefault(require("react"));
const CardSet_1 = require("@/components/CardSet");
const RandomSet = () => {
    const set = trpc_1.trpc.sets.random.useQuery();
    if (set.isLoading) {
        return <div>
            Loading...
        </div>;
    }
    if (set.data === null) {
        return <div>Kein Set gefunden.</div>;
    }
    return <CardSet_1.CardSet cardSet={set.data}/>;
};
exports.RandomSet = RandomSet;
