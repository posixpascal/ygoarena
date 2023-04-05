import React from "react";
import {Card as PrismaCard} from '@prisma/client';
import Image from "next/image";
interface CardProps {
    card: PrismaCard
}

export const Card : React.FC<CardProps> = ({card}) => {
    return <div className={'flex flex-col items-center text-center'}>
        <h1 className={'text-7xl font-black mb-10'}>{card.name}</h1>
        <Image src={card.image} alt={card.name} width={421} height={614} />
    </div>
}