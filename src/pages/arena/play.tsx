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
import {CardRace, CardType} from "@/utils/enums";
import {DecksCardSummary} from "@/components/DeckCardsSummary";
import {download} from "@/utils/download";


export default function Play() {
    const router = useRouter();
    const [exporting, setExporting] = useState(false);
    const [flippable, setFlippable] = useState(false);
    const {sets} = router.query;
    const cardSets = (sets! as string).split('|');

    const exporter = trpc.binders.exporter.useMutation();
    const {data, isLoading, refetch} = trpc.cards.random.useQuery({
        cardSets,
        amount: 4
    }, {
        refetchOnWindowFocus: false
    });

    const [deck, updateDeck] = useState<Record<string, PrismaCard[]>>({
        main: [],
        side: [],
        extra: []
    });


    const addSide = (card: PrismaCard) => {
        updateDeck((deck) => ({
            ...deck,
            side: [...deck.side, card],
        }));
    }

    const addMain = (card: PrismaCard) => {
        if (card.type === CardType.FUSION_MONSTER || card.type.includes("FUSION") || card.type.includes("SYNCHRO") || card.type.includes("XYZ")){
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
            setExporting(false);
            download('ygo-arena.ydk', data);
        })
    }

    const canExport = deck.main.length >= 40;

    return (
        <>
            <Head>
                <title>Arena Play | ygobattle.city</title>
            </Head>
            <main>
                <Container>
                    <div className={'grid grid-cols-7 gap-8'}>
                        <div className={'col-span-5'}>
                            <div className={'p-5'}>
                                <Button onClick={() => setFlippable(!flippable)}
                                        title={flippable ? "Cards hidden" : `Cards always visible`}></Button>
                            </div>
                            <div className={'px-5 gap-8 flex w-full'}>
                                {(data || []).map(card => {
                                    return <div key={card.id} className={'col-span-1'}>
                                        <SelectableCard
                                            flippable={flippable}
                                            canAddSide={deck['side'].length < 15}
                                            canAddMain={deck['main'].length < 40}
                                            canAddExtra={deck['extra'].length < 15}
                                            addSide={addSide}
                                            addMain={addMain}
                                            card={card}/>
                                    </div>
                                })}
                            </div>


                            <div className={'p-5'}>
                                <div className={'prose-xl text-white'}>
                                    <hr/>
                                    <h3 className={'pt-0 mt-0 text-white'}>Tips:</h3>
                                    <ul>
                                        <li>Fusion, Synchro and XYZ cards may act as a free respin</li>
                                        <li>The side deck can be used for combo cards you may hope to draw later</li>
                                        <li>Every card can occur more than once but not in a single draw</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={'col-span-2'}>
                            <div className={'bg-slate-700'}>
                                <div className={'top-0 sticky bg-black/20 p-5 backdrop-blur-xl py-8 '}>
                                    <Button onClick={exportDeck} title={exporting ? "Loading..." : `Export Deck`}
                                            className={`w-full ${canExport ? '' : ' opacity-50 grayscale'}`}></Button>
                                </div>
                                <div className={'p-5 flex flex-col gap-12'}>
                                    <div>
                                        <strong>
                                            Main Deck ({deck.main.length} / 40)
                                        </strong>
                                        <DecksCardSummary cards={deck.main} />
                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['main'].map((mainDeckCard, index) => {
                                                return <Card card={mainDeckCard} key={mainDeckCard.id + index}/>
                                            })}
                                        </div>
                                    </div>


                                    <div>
                                        <strong>
                                            Side Deck ({deck.side.length} / 15)
                                        </strong>
                                        <DecksCardSummary cards={deck.side} />

                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['side'].map((sideDeckCard, index) => {
                                                return <Card card={sideDeckCard} key={sideDeckCard.id + index}/>
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <strong>
                                            Extra Deck ({deck.extra.length} / 15)
                                        </strong>
                                        <DecksCardSummary cards={deck.extra} />

                                        <div className={'grid grid-cols-8 gap-2'}>
                                            {deck['extra'].map((extraDeckCard, index) => {
                                                return <Card card={extraDeckCard} key={extraDeckCard.id + index}/>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className={'text-xl font-bold mt-5 py-3'}>Sets:</h2>
                            <SetSelectionSummary readonly={true} setIds={cardSets}/>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
