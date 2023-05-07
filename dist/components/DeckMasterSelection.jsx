"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckMasterSelection = void 0;
const react_1 = __importStar(require("react"));
const trpc_1 = require("@/utils/trpc");
const Card_1 = require("@/components/Card");
const Button_1 = require("@/components/Button");
const DeckMasterSelection = ({ setIds }) => {
    const [cards, setCards] = (0, react_1.useState)([]);
    const binder = trpc_1.trpc.binders.exporter.useMutation();
    const { data, isLoading } = trpc_1.trpc.sets.cardsInSet.useQuery({
        setIds
    }, {
        refetchOnWindowFocus: false
    });
    const toggleCard = (newCard) => {
        setCards((selectedCards) => {
            if (selectedCards.find((selectedCard) => selectedCard.id === newCard.id)) {
                return selectedCards.filter(c => c.id !== newCard.id);
            }
            return [...selectedCards, newCard];
        });
    };
    if (isLoading) {
        return <div>Loading</div>;
    }
    const cardWall = <div className={'grid grid-cols-7 my-20 gap-4'}>
        {data.map((card, index) => {
            let className = '';
            if (index % 7 === 1 || index % 7 === 3 || index % 7 === 5) {
                className = 'relative -top-10';
            }
            if (cards.find((c) => c.id === card.id)) {
                className += ' border-2 border-yellow-300';
            }
            // if (index % 3 === 0){
            //     className = 'relative top-10'
            // }
            return <div key={card.id} className={className} onClick={() => toggleCard(card)}>
                <Card_1.Card card={card}/>
            </div>;
        })}
    </div>;
    const download = () => {
    };
    return <div className={'grid grid-cols-4 gap-8'}>
        <div className={'col-span-3'}>
           {cardWall}
        </div>
        <div className={'col-span-1'}>
            <div className={'bg-slate-400 p-5 rounded'}>
                <div className={'flex justify-between items-center mb-5'}>
                    <div className={'text-2xl text-slate-900 uppercase font-black'}>
                        Dein Deck
                    </div>
                    <div>
                        <Button_1.Button onClick={download} title={"YDK Export"}></Button_1.Button>
                    </div>
                </div>
                <div className={'grid grid-cols-5'}>
                    {cards.map((card) => {
            return <img key={card.id} className={'h-[90px]'} src={card.image}/>;
        })}
                </div>
            </div>
        </div>
    </div>;
};
exports.DeckMasterSelection = DeckMasterSelection;
