import Head from 'next/head'
import {Container} from "@/components/Container";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/Button";
import {useRouter} from "next/router";
import {Card as PrismaCard} from "@prisma/client";
import {trpc} from "@/utils/trpc";
import {Card} from "@/components/Card";
import {SetSelectionSummary} from "@/components/SetSelectionSummary";
import {SelectableCard} from "@/components/SelectableCard";
import {CardType} from "@/utils/enums";
import {DecksCardSummary} from "@/components/DeckCardsSummary";
import {download} from "@/utils/download";


export default function Play() {
    const router = useRouter();
    const [exporting, setExporting] = useState(false);
    const [flippable, setFlippable] = useState(false);
    const {sets} = router.query;
    const cardSets = (sets! as string).split('|');
    const [hidden, setHidden] = useState<boolean>(true);
    const [randomCards, setRandomCards] = useState<PrismaCard[]>([]);
    const exporter = trpc.binders.exporter.useMutation();
    const {data, isLoading, refetch} = trpc.cards.random.useQuery({
        cardSets,
        amount: 4
    }, {
        refetchOnWindowFocus: false,
        onSuccess(data){
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
                    })
                });
            });

            Promise.all(imageLoaders).then(() => {
                setHidden(false);
            })
        }
    });

    const [deck, updateDeck] = useState<Record<string, PrismaCard[]>>({
        main: [],
        side: [],
        extra: []
    });


    const addSide = (card: PrismaCard) => {
        if (hidden){
            return;
        }

        updateDeck((deck) => ({
            ...deck,
            side: [...deck.side, card],
        }));
    }

    const addMain = (card: PrismaCard) => {
        if (hidden){
            return;
        }

        if (card.type === CardType.FUSION_MONSTER || card.type.includes("FUSION") || card.type.includes("SYNCHRO") || card.type.includes("XYZ") || card.type.includes("LINK")) {
            updateDeck((deck) => ({
                ...deck,
                extra: [...deck.extra, card]
            }))
            return;
        }

        // TODO: add check for fusion monsters
        updateDeck((deck) => ({
            ...deck,
            main: [...deck.main, card],
        }));
    }

    useEffect(() => {
        refetch();
    }, [deck])

    const exportDeck = async () => {
        setExporting(true);
        await exporter.mutateAsync({
            mainDeckCards: deck.main.map(card => card.id),
            sideDeckCards: deck.side.map(card => card.id),
            extraDeckCards: deck.extra.map(card => card.id)
        }).then((data) => {
            const name = prompt("Enter Deck Name");
            setExporting(false);
            download((name || "ygo-arena") + '.ydk', data);
        })
    }

    const canExport = deck.main.length >= 40;
    const isLessThan3 = (card: any) => {
        const allCards = [...deck.main, ...deck.side, ...deck.extra];
        return (allCards.filter(s => s.id === card.id).length < 3);
    }

    return (
        <>
            <Head>
                <title>Arena Play | ygobattle.city</title>
            </Head>
            <main>
                <Container>
                    <div className={'grid grid-cols-7 gap-8'}>
                        <div className={'col-span-5'}>
                            <div className={'px-5 gap-8 grid grid-cols-4 flex w-full'}>
                                    {randomCards.map((card, index) => {
                                        return <div key={card.id} className={'col-span-1'}>
                                            <SelectableCard
                                                index={index}
                                                hidden={hidden}
                                                flippable={flippable}
                                                canAddSide={isLessThan3(card) && deck['side'].length < 15}
                                                canAddMain={isLessThan3(card) && deck['main'].length < 40}
                                                canAddExtra={isLessThan3(card) && deck['extra'].length < 15}
                                                addSide={addSide}
                                                addMain={addMain}
                                                card={card}/>
                                        </div>
                                    })}
                            </div>

                            <div className={'p-5'}>
                                <div className={'prose-xl text-slate-900'}>
                                    <hr/>
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
                                    <Button onClick={exportDeck} title={exporting ? "Loading..." : `Export Deck`}
                                            className={`w-full ${canExport ? '' : ' opacity-50 grayscale'}`}></Button>
                                </div>
                                <div className={'p-5 flex flex-col gap-12'}>
                                    <div>
                                        <strong>
                                            Main Deck ({deck.main.length} / 40)
                                        </strong>
                                        <DecksCardSummary cards={deck.main}/>
                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['main'].map((mainDeckCard, index) => {
                                                return <div className={'min-h-[65px]'} key={String(deck.length) + mainDeckCard.id + index}>
                                                    <Card flippable={false} flipped={true} card={mainDeckCard} key={mainDeckCard.id + index}/>
                                                </div>
                                            })}
                                        </div>
                                    </div>


                                    <div>
                                        <strong>
                                            Side Deck ({deck.side.length} / 15)
                                        </strong>
                                        <DecksCardSummary cards={deck.side}/>

                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['side'].map((sideDeckCard, index) => {
                                                return <div className={'min-h-[65px]'} key={String(deck.length) + sideDeckCard.id + index}>
                                                    <Card flippable={false} flipped={true} card={sideDeckCard} key={sideDeckCard.id + index}/>
                                                </div>
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <strong>
                                            Extra Deck ({deck.extra.length} / 15)
                                        </strong>
                                        <DecksCardSummary cards={deck.extra}/>

                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['extra'].map((extraDeckCard, index) => {
                                                return <div className={'min-h-[65px]'} key={String(deck.length) + extraDeckCard.id + index}>
                                                    <Card flippable={false} flipped={true} card={extraDeckCard} key={extraDeckCard.id + index}/>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'mt-8'}>

                            </div>
                            <SetSelectionSummary setSelected={() => {
                            }} readonly={true} setIds={cardSets}/>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
