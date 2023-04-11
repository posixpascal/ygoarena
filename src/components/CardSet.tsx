import React, {ReactNode} from "react";
import {CardSet as PrismaCardSet} from '@prisma/client';
import Image from "next/image";
import {trpc} from "@/utils/trpc";
interface CardSetProps {
    cardSet: PrismaCardSet,
    children: ReactNode
}

export const CardSet : React.FC<CardSetProps> = ({cardSet, children}) => {
    const setInfo = trpc.sets.details.useQuery({
        id: cardSet.id
    });
    const [code, edition] = cardSet.code.split('-');

    return <div className={'group-item flex flex-col items-center text-center'}>
        <div className={'relative overflow-hidden bg-red-100 aspect-square grid place-items-center h-full w-full'}>
            <div className={'blur-2xl absolute inset-0 bg-black/40'}>
                <img src={`https://images.ygoprodeck.com/images/sets/${code}.jpg`} alt={cardSet.name} />
            </div>
            <div className={'z-10'}>
                <Image src={`https://images.ygoprodeck.com/images/sets/${code}.jpg`} className={'object-cover h-full w-full'} alt={cardSet.name} width={120} height={120} />
            </div>
            <div className={'opacity-0 transition-opacity hover:opacity-100 absolute inset-0 z-20 bg-black/70'}>
                {children}
            </div>
        </div>
        <h1 className={'font-bold'}>{cardSet.name}</h1>
        <div>
            {setInfo?.data?.cards} Cards
        </div>
    </div>
}