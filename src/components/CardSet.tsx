import React from "react";
import {CardSet as PrismaCardSet} from '@prisma/client';

interface CardSetProps {
    cardSet: PrismaCardSet,
}

export const CardSet: React.FC<CardSetProps> = ({cardSet}) => {
    const [code, edition] = cardSet.code.split('-');

    return <div className={'flex flex-col rounded-xl items-center bg-white p-3 text-center'}>
        <div className={'max-h-[150px] relative'}>
            <img src={cardSet.image} className={'object-contain h-[150px]'} alt={cardSet.name}
            />
        </div>
        <div className={'flex items-center text-sm justify-center'}>
            <span className={'opacity-90'}>{cardSet.name}</span>
        </div>
    </div>
}