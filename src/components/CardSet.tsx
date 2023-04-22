import React, {ReactNode} from "react";
import {CardSet as PrismaCardSet} from '@prisma/client';
import Image from "next/image";
import {trpc} from "@/utils/trpc";
import {Button} from "@/components/Button";
interface CardSetProps {
    cardSet: PrismaCardSet,
}

export const CardSet : React.FC<CardSetProps> = ({cardSet}) => {
    const [code, edition] = cardSet.code.split('-');

    return <div className={'group-item flex flex-col items-center text-center overflow-hidden'}>
        <div className={'relative overflow-hidden bg-red-100 aspect-square grid place-items-center h-full w-full'}>
            <div className={'absolute inset-0'}>
                <div className={'absolute inset-0.5 z-10 bg-black/60 backdrop-blur-xl'}></div>
                <img src={cardSet.image} width={'100%'} height={'100%'} alt={cardSet.name} />
            </div>
            <div className={'z-10'}>
                <Image src={cardSet.image} className={'object-cover h-full w-full'} alt={cardSet.name} width={120} height={120} />
            </div>
            <div className={'z-10 bg-black/40 text-gray-100 font-bold text-xl backdrop-blur absolute bottom-0 left-0 right-0 min-h-12 flex items-center p-3 justify-center'}>
                <span className={'opacity-90'}>{cardSet.name}</span>
            </div>
        </div>
    </div>
}