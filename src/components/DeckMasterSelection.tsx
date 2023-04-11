import React, {useState} from "react";
import {trpc} from "@/utils/trpc";
import {Card} from "@/components/Card";
import {Card as PrismaCard} from "@prisma/client";
import {Button} from "@/components/Button";
import {WallScroller} from "@/components/WallScroller";

interface DeckMasterSelectionProps {
    setIds: string[]
}

export const DeckMasterSelection: React.FC<DeckMasterSelectionProps> = ({setIds}) => {
    const [cards, setCards] = useState<PrismaCard[] | any>([]);
    const binder = trpc.binders.exporter.useMutation();
    const {data, isLoading} = trpc.sets.cardsInSet.useQuery({
        setIds
    }, {
        refetchOnWindowFocus: false
    });

    const toggleCard = (newCard: PrismaCard) => {
        setCards((selectedCards: PrismaCard[]) => {
            if (selectedCards.find((selectedCard) => selectedCard.id === newCard.id)) {
                return selectedCards.filter(c => c.id !== newCard.id);
            }

            return [...selectedCards, newCard];
        })
    }

    if (isLoading) {
        return <div>Loading</div>
    }

    const cardWall = <div className={'grid grid-cols-7 my-20 gap-4'}>
        {data!.map((card: PrismaCard, index) => {
            let className = '';
            if (index % 7 === 1 || index % 7 === 3 || index % 7 === 5) {
                className = 'relative -top-10'
            }

            if (cards.find(c => c.id === card.id)) {
                className += ' border-2 border-yellow-300'
            }

            // if (index % 3 === 0){
            //     className = 'relative top-10'
            // }
            return <div key={card.id} className={className} onClick={() => toggleCard(card)}>
                <Card card={card}/>
            </div>
        })}
    </div>

    const download = () => {

    }

    return <div className={'grid grid-cols-4 gap-8'}>
        <div className={'col-span-3'}>
           {cardWall}
        </div>
        <div className={'col-span-1'}>
            <div className={'bg-slate-400 p-5 rounded'}>
                <div className={'flex justify-between items-center mb-5'}>
                    <div className={'text-2xl text-slate-900 uppercase font-black'}>
                        Dein Deck
                    </div>
                    <div>
                        <Button onClick={download} title={"YDK Export"}></Button>
                    </div>
                </div>
                <div className={'grid grid-cols-5'}>
                    {cards.map((card: PrismaCard) => {
                        return <img key={card.id} className={'h-[90px]'} src={card.image}/>
                    })}
                </div>
            </div>
        </div>
    </div>
}