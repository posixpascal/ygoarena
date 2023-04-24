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
    const transition = useTransition(sets, {
        from: {scale: 0, opacity: 0},
        enter: {scale: 1, opacity: 1},
        leave: {scale: 1, opacity: 1},
    });

    const addSet = (set: PrismaCardSet) => {
        setSelected((sets => [...sets, set.id]));
    }

    const removeSet = (set: PrismaCardSet) => {
        setSelected((sets => [...sets.filter(s => s !== set.id)]));
    }

    return <div className={'relative h-full w-full'}>
        <div className={'absolute inset-0 pointer-events-none grid place-items-center bg-black/70 z-10 backdrop-blur-xl transition-opacity'}
        style={{opacity: isLoading ? 1 : 0}}>
            Loading
        </div>
        <div className={'grid grid-cols-4 gap-4'}>
            {transition((style, set: PrismaCardSet) => {
                return <animated.div style={style} key={set.id}>
                    <SelectableCardSet set={set} key={set.id} selected={selected}
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