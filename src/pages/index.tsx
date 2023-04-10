import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import {trpc} from "@/utils/trpc";
import {Container} from "@/components/Container";
import React from "react";
import {RandomCard} from "@/components/RandomCard";
import {RandomCards} from "@/components/RandomCards";
import {RandomSet} from "@/components/RandomSet";


export default function Home() {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <main >
        <Container>
          <RandomCard />
        </Container>
      </main>
    </>
  )
}
