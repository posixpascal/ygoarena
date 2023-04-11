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
import {Button} from "@/components/Button";
import {useRouter} from "next/router";


export default function Info() {
    const router = useRouter();

    const start = () => {
        router.push(
            router.asPath.replace('/info', '/play')
        )
    }

    return (
        <>
            <Head>
                <title>DeckMaster Play | ygobattle.city</title>
            </Head>
            <main >
                <Container>
                    <div className={'my-20 mb-10 flex justify-between items-center'}>
                        <h1 className={'font-black text-6xl uppercase'}>
                            Deckmaster
                        </h1>
                        <div className={'text-sm'}>
                            <h2 className={'text-xl'}>Share this link with other players:</h2>
                            <pre><code className={'block overflow-auto max-w-xl bg-blue-100 rounded p-3 text-blue-900 mb-10'}>
                                https://ygobattle.city{router.asPath.replace('/info', '/play')}
                            </code></pre>
                        </div>
                    </div>

                        <Button onClick={() => start()} title={'Start Deck Building'} />
                </Container>
            </main>
        </>
    )
}
