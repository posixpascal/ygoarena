import React from "react";
import {Card as PrismaCard} from '@prisma/client';
import Image from "next/image";
export interface CardProps {
    card: PrismaCard
}

// TODO: Add Rare/SR/UR effect
export const Card : React.FC<CardProps> = ({card}) => {
    const scale = 0.5;

    return <Image src={card.image} alt={card.name} width={421*scale} height={614*scale} />
}
