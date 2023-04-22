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
}

export const SelectableCard: React.FC<SelectableCardProps> = ({flippable, canAddMain, canAddSide, canAddExtra, addMain, addSide, card}) => {
    return <animated.div  className={'cursor-pointer will-change-transform relative'}>
        <Card flippable={flippable} card={card} />
        <div className={'flex mt-4 flex-col gap-2 justify-between'}>
            <Button onClick={() => addMain(card)} className={`block w-full ${canAddMain ? '' : ' opacity-40 grayscale pointer-events-none'}`} title={"Main Deck"} />
            <Button onClick={() => addSide(card)} className={`block w-full ${canAddSide ? '' : ' opacity-40 grayscale pointer-events-none'}`} title={"Side Deck"} />
        </div>
    </animated.div>
}