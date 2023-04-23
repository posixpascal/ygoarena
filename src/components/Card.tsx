import React, {useState} from "react";
import {Card as PrismaCard} from '@prisma/client';
import Image from "next/image";
export interface CardProps {
    card: PrismaCard,
    flippable?: boolean,
}

// TODO: Add Rare/SR/UR effect
// TODO: cleanup this mess :D
export const Card : React.FC<CardProps> = ({flippable = false, card}) => {
    const [flip, setFlipped] = useState(false);

    return <div className={'h-[400px]'}>
        <div onClick={() => setFlipped(true)}>
            <img src={'/images/CardBack.jpg'} className={`${(!flip && flippable) ? '' : 'hidden'} ${flippable ? 'h-[400px]' : ''} object-contain`} alt={card.name} width={'100%'} />
        </div>
        <img src={card.image} className={`${(flippable && !flip) ? 'opacity-0 fixed h-0 w-0' : ''} ${flippable ? 'h-[400px]' :''} object-contain`} alt={card.name} width={'100%'} />
    </div>
}
