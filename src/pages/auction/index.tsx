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

    return (
        <>
            <Head>
                <title>Actions Setup | ygobattle.city</title>
            </Head>
            <main >
                <Container>
                    <h1 className={'text-6xl my-20 font-black uppercase'}>
                        Coming soon
                    </h1>
                </Container>
            </main>
        </>
    )
}
