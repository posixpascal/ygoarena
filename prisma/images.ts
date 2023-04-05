// Extract images from prisma and save them for later
import {prisma} from "@/server/prisma";
import {CardAttribute, CardFrame, CardRace, CardType} from '@prisma/client';
import fs from 'fs/promises';
import * as path from "path";

const OUTPUT_DIR = path.resolve(`${__dirname}/../public/cards/`);

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


        let request = await fetch(card.image);
        let imageBlob = await request.arrayBuffer();
        let image = Buffer.from(imageBlob);
        await fs.writeFile(outputFile, image, 'utf-8');

        request = await fetch(card.imageCropped);
        imageBlob = await request.arrayBuffer();
        image = Buffer.from(imageBlob);
        await fs.writeFile(outputFileCropped, image, 'utf-8');

        await prisma.card.update({
            where: {
                id: card.id,
            },
            data: {
                image: outputFile,
                imageCropped: outputFileCropped,
            }
        })
    }
}

(async () => {
    await createFolderIfMissing(OUTPUT_DIR);

    const cardCount = await prisma.card.count();
    const batchSize = 10;
    const cycles = Math.ceil(cardCount / batchSize);
    const rateLimitResetInMillis = 1000
    let index = 0;
    for await (const cycle of Array.from({length: cycles})){
        let startTime = +new Date();
        await downloadBatch(batchSize * index++, batchSize, cardCount);
        let endTime = +new Date()
        if (endTime - startTime < rateLimitResetInMillis) {
            // sleep to max out rate limit
            await new Promise((resolve) => setTimeout(resolve, 300 + endTime - startTime));
        }
    }

    console.log("Images cached for your service!");
})();