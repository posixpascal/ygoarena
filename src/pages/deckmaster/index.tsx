import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {trpc} from "@/utils/trpc";
import {Container} from "@/components/Container";
import React from "react";
import {RandomCard} from "@/components/RandomCard";
import {RandomCards} from "@/components/RandomCards";
import {RandomSet} from "@/components/RandomSet";
import {SetSelection} from "@/components/SetSelection";
import {useRouter} from "next/router";


export default function Index() {
    const router = useRouter();

    const handleSelection = (setIds: string[]) => {
        const queryString = new URLSearchParams();
        queryString.append('sets', setIds.join('|'));
        router.push('/deckmaster/info?' + queryString.toString())
    }

    return (
        <>
            <Head>
                <title>DeckMaster Setup | ygobattle.city</title>
            </Head>
            <main >
                <Container>
                   <h1 className={'text-6xl my-20 font-black uppercase'}>
                       Deckmaster Mode
                   </h1>
                    <SetSelection onSelection={handleSelection} />
                </Container>
            </main>
        </>
    )
}
