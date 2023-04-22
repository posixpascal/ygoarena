import Head from 'next/head'
import {Container} from "@/components/Container";
import React, {useState} from "react";
import {SetSelection} from "@/components/SetSelection";
import {useRouter} from "next/router";
import {Headline} from "@/components/Headline";
import {SetSelectionSummary} from "@/components/SetSelectionSummary";
import {Input} from "@/components/Input";
import {useDebounce} from "@/hooks/useDebounce";


export default function Index() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([])
    const [query, setQuery] = useState<string|undefined>(undefined);

    // Wait for 300ms before changing the variable
    const debouncedQuery = useDebounce(query, 200);

    return (
        <>
            <Head>
                <title></title>
            </Head>
            <main>
                <Container>
                    <Headline>Arena Mode</Headline>
                    <div className={'grid grid-cols-7 gap-8'}>
                        <div className={'col-span-7'}>
                            <Input
                                onChange={(ev) => setQuery(ev.target.value)}
                                label={'Search Set'}
                                placeholder="Search by name (i.e. Legend of Blue Eyes) or code (i.e. LOB)"
                                name={'set'}
                                type={'text'} />
                        </div>
                        <div className={'col-span-5'}>
                            <SetSelection query={debouncedQuery} selected={selected} setSelected={setSelected}/>
                        </div>
                        <div className={'col-span-2'}>
                            <SetSelectionSummary setIds={selected}/>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
