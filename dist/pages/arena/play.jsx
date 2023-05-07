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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const Container_1 = require("@/components/Container");
const react_1 = __importStar(require("react"));
const Button_1 = require("@/components/Button");
const router_1 = require("next/router");
const trpc_1 = require("@/utils/trpc");
const Card_1 = require("@/components/Card");
const SetSelectionSummary_1 = require("@/components/SetSelectionSummary");
const SelectableCard_1 = require("@/components/SelectableCard");
const enums_1 = require("@/utils/enums");
const DeckCardsSummary_1 = require("@/components/DeckCardsSummary");
const download_1 = require("@/utils/download");
function Play() {
    const router = (0, router_1.useRouter)();
    const [exporting, setExporting] = (0, react_1.useState)(false);
    const [flippable, setFlippable] = (0, react_1.useState)(false);
    const { sets } = router.query;
    const cardSets = sets.split('|');
    const [hidden, setHidden] = (0, react_1.useState)(true);
    const [randomCards, setRandomCards] = (0, react_1.useState)([]);
    const exporter = trpc_1.trpc.binders.exporter.useMutation();
    const { data, isLoading, refetch } = trpc_1.trpc.cards.random.useQuery({
        cardSets,
        amount: 4
    }, {
        refetchOnWindowFocus: false,
        onSuccess(data) {
            setHidden(true);
            setRandomCards(data);
            const imageLoaders = data.map((card) => {
                return new Promise((resolve, reject) => {
                    const image = new Image();
                    image.src = card.image;
                    image.addEventListener('load', () => {
                        resolve(true);
                    });
                    image.addEventListener('error', () => {
                        refetch();
                    });
                });
            });
            Promise.all(imageLoaders).then(() => {
                setHidden(false);
            });
        }
    });
    const [deck, updateDeck] = (0, react_1.useState)({
        main: [],
        side: [],
        extra: []
    });
    const addSide = (card) => {
        if (hidden) {
            return;
        }
        updateDeck((deck) => ({
            ...deck,
            side: [...deck.side, card],
        }));
    };
    const addMain = (card) => {
        if (hidden) {
            return;
        }
        if (card.type === enums_1.CardType.FUSION_MONSTER || card.type.includes("FUSION") || card.type.includes("SYNCHRO") || card.type.includes("XYZ") || card.type.includes("LINK")) {
            updateDeck((deck) => ({
                ...deck,
                extra: [...deck.extra, card]
            }));
            return;
        }
        // TODO: add check for fusion monsters
        updateDeck((deck) => ({
            ...deck,
            main: [...deck.main, card],
        }));
    };
    (0, react_1.useEffect)(() => {
        refetch();
    }, [deck]);
    const exportDeck = async () => {
        setExporting(true);
        await exporter.mutateAsync({
            mainDeckCards: deck.main.map(card => card.id),
            sideDeckCards: deck.side.map(card => card.id),
            extraDeckCards: deck.extra.map(card => card.id)
        }).then((data) => {
            const name = prompt("Enter Deck Name");
            setExporting(false);
            (0, download_1.download)((name || "ygo-arena") + '.ydk', data);
        });
    };
    const canExport = deck.main.length >= 40;
    const isLessThan3 = (card) => {
        const allCards = [...deck.main, ...deck.side, ...deck.extra];
        return (allCards.filter(s => s.id === card.id).length < 3);
    };
    return (<>
            <head_1.default>
                <title>Arena Play | ygobattle.city</title>
            </head_1.default>
            <main>
                <Container_1.Container>
                    <div className={'grid grid-cols-7 gap-8'}>
                        <div className={'col-span-5'}>
                            <div className={'px-5 gap-8 grid grid-cols-4 flex w-full'}>
                                    {randomCards.map((card, index) => {
            return <div key={card.id} className={'col-span-1'}>
                                            <SelectableCard_1.SelectableCard index={index} hidden={hidden} flippable={flippable} canAddSide={isLessThan3(card) && deck['side'].length < 15} canAddMain={isLessThan3(card) && deck['main'].length < 40} canAddExtra={isLessThan3(card) && deck['extra'].length < 15} addSide={addSide} addMain={addMain} card={card}/>
                                        </div>;
        })}
                            </div>

                            <div className={'p-5'}>
                                <div className={'prose-xl text-slate-900'}>
                                    <hr />
                                    <h3 className={'pt-0 mt-0 text-slate-900'}>Tips:</h3>
                                    <ul>
                                        <li>Fusion, Synchro and XYZ cards may act as a free respin</li>
                                        <li>The side deck can be used for combo cards you may hope to draw later</li>
                                        <li>Every card can occur more than once but not in a single draw</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={'col-span-2'}>
                            <div className={'bg-gray-800 text-sky-200'}>
                                <div className={'top-0 sticky bg-gray-900 p-5 backdrop-blur-xl py-8 '}>
                                    <Button_1.Button onClick={exportDeck} title={exporting ? "Loading..." : `Export Deck`} className={`w-full ${canExport ? '' : ' opacity-50 grayscale'}`}></Button_1.Button>
                                </div>
                                <div className={'p-5 flex flex-col gap-12'}>
                                    <div>
                                        <strong>
                                            Main Deck ({deck.main.length} / 40)
                                        </strong>
                                        <DeckCardsSummary_1.DecksCardSummary cards={deck.main}/>
                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['main'].map((mainDeckCard, index) => {
            return <div className={'min-h-[65px]'} key={String(deck.length) + mainDeckCard.id + index}>
                                                    <Card_1.Card flippable={false} flipped={true} card={mainDeckCard} key={mainDeckCard.id + index}/>
                                                </div>;
        })}
                                        </div>
                                    </div>


                                    <div>
                                        <strong>
                                            Side Deck ({deck.side.length} / 15)
                                        </strong>
                                        <DeckCardsSummary_1.DecksCardSummary cards={deck.side}/>

                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['side'].map((sideDeckCard, index) => {
            return <div className={'min-h-[65px]'} key={String(deck.length) + sideDeckCard.id + index}>
                                                    <Card_1.Card flippable={false} flipped={true} card={sideDeckCard} key={sideDeckCard.id + index}/>
                                                </div>;
        })}
                                        </div>
                                    </div>

                                    <div>
                                        <strong>
                                            Extra Deck ({deck.extra.length} / 15)
                                        </strong>
                                        <DeckCardsSummary_1.DecksCardSummary cards={deck.extra}/>

                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['extra'].map((extraDeckCard, index) => {
            return <div className={'min-h-[65px]'} key={String(deck.length) + extraDeckCard.id + index}>
                                                    <Card_1.Card flippable={false} flipped={true} card={extraDeckCard} key={extraDeckCard.id + index}/>
                                                </div>;
        })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'mt-8'}>

                            </div>
                            <SetSelectionSummary_1.SetSelectionSummary setSelected={() => {
        }} readonly={true} setIds={cardSets}/>
                        </div>
                    </div>
                </Container_1.Container>
            </main>
        </>);
}
exports.default = Play;
