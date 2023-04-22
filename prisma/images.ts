// Extract images from prisma and save them for later
import {prisma} from "@/server/prisma";
import fs from 'fs/promises';
import * as path from "path";
import fetch from 'node-fetch';
const OUTPUT_DIR = path.resolve(`${__dirname}/../public/cards/`);
const SET_OUTPUT_DIR = path.resolve(`${__dirname}/../public/sets/`);

const createFolderIfMissing = async (path: string) => {
    try {
        await fs.mkdir(path);
    } catch (e){
    }
}

const downloadBatch = async (skip: number, take: number, total: number) => {
    const cards = await prisma.card.findMany({
        take,
        skip
    });

    console.info("--- Batch start ", skip + take, '/', total);
    for await (const card of cards){
        if (!card.image.startsWith('http')){
            continue;
        }

        const outputDir = OUTPUT_DIR + '/' + card.konamiId;
        const outputFile = path.join(outputDir, 'original.png')
        const outputFileCropped = path.join(outputDir, 'cropped.png')

        await createFolderIfMissing(
            path.join(outputDir)
        );

        try {
            await fs.lstat(outputFile);
            await fs.lstat(outputFileCropped);
        } catch (e) {
            let request = await fetch(card.image);
            let imageBlob = await request.arrayBuffer();
            let image = Buffer.from(imageBlob);
            await fs.writeFile(outputFile, image, 'utf-8');

            request = await fetch(card.imageCropped);
            imageBlob = await request.arrayBuffer();
            image = Buffer.from(imageBlob);
            await fs.writeFile(outputFileCropped, image, 'utf-8');
        } finally {
            await prisma.card.update({
                where: {
                    id: card.id,
                },
                data: {
                    image: '/cards/' + card.konamiId + '/original.png',
                    imageCropped: '/cards/' + card.konamiId + '/cropped.png',
                }
            })
        }
    }
}

const downloadSetBatch = async (skip: number, take: number, total: number) => {
    const sets = await prisma.cardSet.findMany({
        take,
        skip
    });

    console.info("--- Batch start ", skip + take, '/', total);
    for await (const set of sets){
        const outputDir = SET_OUTPUT_DIR + '/' + set.code;
        const outputFile = path.join(outputDir, 'cover.png')

        await createFolderIfMissing(
            path.join(outputDir)
        );

        try {
            await fs.lstat(outputFile);
        } catch (e) {
            let request = await fetch(`https://images.ygoprodeck.com/images/sets/${set.code}.jpg`);
            let imageBlob = await request.arrayBuffer();
            let image = Buffer.from(imageBlob);
            await fs.writeFile(outputFile, image, 'utf-8');
        } finally {
            await prisma.cardSet.update({
                where: {
                    id: set.id,
                },
                data: {
                    image: '/sets/' + set.code + '/cover.png',
                }
            })
            //console.log("updated", set.id, 'to',  '/sets/' + set.code + '/cover.png')
        }
    }
}

(async () => {
    await createFolderIfMissing(OUTPUT_DIR);
    await createFolderIfMissing(SET_OUTPUT_DIR);

    const cardCount = await prisma.card.count();
    const batchSize = 10;
    let cycles = Math.ceil(cardCount / batchSize);
    const rateLimitResetInMillis = 1000
    let index = 0;
    // for await (const cycle of Array.from({length: cycles})){
    //     let startTime = +new Date();
    //     await downloadBatch(batchSize * index++, batchSize, cardCount);
    //     let endTime = +new Date()
    //     if (endTime - startTime < rateLimitResetInMillis) {
    //         // sleep to max out rate limit
    //         await new Promise((resolve) => setTimeout(resolve, 300 + endTime - startTime));
    //     }
    // }

    console.info("Cards crawled. Crawling sets");
    const setCount = await prisma.cardSet.count();
    cycles = Math.ceil(setCount / batchSize);
    index = 0;
    for await (const cycle of Array.from({length: cycles})){
        let startTime = +new Date();
        await downloadSetBatch(batchSize * index++, batchSize, setCount);
        let endTime = +new Date()
        if (endTime - startTime < rateLimitResetInMillis) {
            // sleep to max out rate limit
            await new Promise((resolve) => setTimeout(resolve, 300 + endTime - startTime));
        }
    }

    console.log("Images cached for your service!");
})();