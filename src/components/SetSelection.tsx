import {trpc} from "@/utils/trpc";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {CardSet as PrismaCardSet} from "@prisma/client";
import {usePaging} from "@/hooks/usePaging";
import {animated, useTransition} from "@react-spring/web";
import {SelectableCardSet} from "@/components/SelectableCardSet";

interface SetSelectionProps {
    query: string | undefined,
    setSelected: Dispatch<SetStateAction<string[]>>,
    selected: string[]
}

export const SetSelection: React.FC<SetSelectionProps> = ({query, selected, setSelected}) => {
    const [sets, setSets] = useState<PrismaCardSet[]>([]);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const {fetchNextPage, isLoading} = trpc.sets.list.useInfiniteQuery({
        name: query,
        limit: 20,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialCursor: 1,
        onSuccess(data) {
            setSets(() => (data?.pages || []).reduce((acc: PrismaCardSet[], page) => {
                let items : PrismaCardSet[] = [];

                // Only add new items
                page.items.forEach(item => {
                    if (acc.find(set => set.id === item.id)){
                        return;
                    }

                    items.push(item);
                });

                return [...acc, ...items]
            }, []))
        }
    });

    // Paginate the query on scroll
    usePaging({elementRef: loadMoreRef, onNextPage: fetchNextPage});
    const transition = useTransition(isLoading ? [] : sets, {
        from: {scale: 0, opacity: 0},
        enter: {scale: 1, opacity: 1},
        leave: {scale: 0, opacity: 0},
    });

    const addSet = (set: PrismaCardSet) => {
        setSelected((sets => [...sets, set.id]));
    }

    const removeSet = (set: PrismaCardSet) => {
        setSelected((sets => [...sets.filter(s => s !== set.id)]));
    }

    if (isLoading){
        return <div>
            Loading
        </div>
    }

    return <div className={'relative h-full w-full'}>
        <div className={'grid grid-cols-4 gap-4'}>
            {sets.map((set: PrismaCardSet) => {
                return <animated.div className={'h-full bg-white flex items-center justify-center rounded-xl'} key={set.id}>
                    <SelectableCardSet set={set} selected={selected}
                                       addSet={addSet}
                                       removeSet={removeSet}
                    />
                </animated.div>
            })}
        </div>
        {/*Load more sets on scroll */}
        <div className={'h-[30px]'} ref={loadMoreRef}/>
    </div>
}