import {trpc} from "@/utils/trpc";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {CardSet as PrismaCardSet} from "@prisma/client";

interface SetSelectionSummaryProps {
    setIds: string[],
    readonly: boolean;
    setSelected: Function;
}

type CardSetCountOutputType = { cards: number }
type SetsState = { name: string; id: string; image: string; _count: CardSetCountOutputType; }[]

export const SetSelectionSummary: React.FC<SetSelectionSummaryProps> = ({
                                                                            readonly = false,
                                                                            setIds,
                                                                            setSelected
                                                                        }) => {
    const router = useRouter();
    const [sets, setSets] = useState<SetsState>([]);
    const {data, isLoading} = trpc.sets.summary.useQuery({
        setIds,
    }, {
        onSuccess(data) {
            setSets(data.sets)
        }
    });

    const handleSelection = async () => {
        const queryString = new URLSearchParams();
        queryString.append('sets', setIds.join('|'));
        await router.push('/arena/info?' + queryString.toString())
    }

    const totalCards = sets.reduce((acc, cur) => {
        return acc + cur._count.cards;
    }, 0)

    const removeSet = (set: PrismaCardSet) => {
        setSelected(((sets: any) => [...sets.filter((s:any) => s !== set.id)]));
    }


    return <div className={`${readonly ? '' : 'h-full'}`}>
        <div>
            <h2 className={'text-2xl uppercase font-black text-sky-900'}>
                Selected Sets
            </h2>
            <p className={'text-sky-900 text-lg'}>
                Arena Mode with {totalCards} unique cards
            </p>
            {sets.map(set => {
                return <div className={'flex justify-between items-center py-4 gap-4'} key={set.id}>
                    <img alt={set.name} width={'52px'} src={set.image}/>
                    <div className={'flex-col flex flex-grow'}>
                        <h3 className={'text-lg text-sky-900 font-bold'}>
                            {set.name}
                        </h3>
                        <span className={'text-slate-800'}>
                                {set._count.cards} Cards
                        </span>
                    </div>
                    {!readonly && <button className={'text-red-500'} onClick={() => removeSet(set as any)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-6 h-6">
                            <path fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>}
                </div>
            })}
        </div>
    </div>
}