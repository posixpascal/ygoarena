import React from "react";
import {CardSet} from "@/components/CardSet";
import {Card as PrismaCard} from '@prisma/client';
import {animated, useSpring} from "@react-spring/web";
import {Card} from "@/components/Card";
import {Button} from "@/components/Button";

interface SelectableCardProps {
    card: PrismaCard,
    addMain: Function,
    addSide: Function,
    canAddMain: boolean;
    canAddSide: boolean;
    canAddExtra: boolean;
    flippable: boolean;
    hidden: boolean;
    index?:number;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({index = 0, hidden, canAddMain, canAddSide, canAddExtra, addMain, addSide, card}) => {
    const isExtraDeckCard = card.type.includes("FUSION") || card.type.includes("XYZ") || card.type.includes("SYNCHRO");

    return <animated.div  className={'cursor-pointer will-change-transform relative w-full h-full'}>
        <div className={'min-h-[400px]'}>
            <Card index={index} flippable={true} flipped={!hidden} card={card} />
        </div>
        <div className={'flex mt-4 flex-col gap-2 justify-between'}>
            <Button onClick={() => addMain(card)} className={`block w-full ${canAddMain ? '' : ' opacity-40 grayscale pointer-events-none'}`} title={"Main Deck"} />
            <Button onClick={() => addSide(card)} className={`block w-full ${canAddSide ? '' : ' opacity-40 grayscale pointer-events-none'}`} title={"Side Deck"} />
        </div>
    </animated.div>

}