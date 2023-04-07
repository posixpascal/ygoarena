import React from "react";
import {CardSet as PrismaCardSet} from '@prisma/client';
import Image from "next/image";
interface CardSetProps {
    cardSet: PrismaCardSet
}

export const CardSet : React.FC<CardSetProps> = ({cardSet}) => {
    const [code, edition] = cardSet.code.split('-');

    return <div className={'flex flex-col items-center text-center'}>
        <h1 className={'text-7xl font-black mb-10'}>{cardSet.name}</h1>
        <Image src={`https://images.ygoprodeck.com/images/sets/${code}.jpg`} alt={cardSet.name} width={300} height={300} />
    </div>
}