#!/usr/bin/env node

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

import fetch from 'node-fetch';
import {prisma} from "@/server/prisma";
import {CardAttribute, CardFrame, CardRace, CardType} from '@/utils/enums';


type ProDeckFrameType =
    "effect"
    | "effect_pendulum"
    | "fusion"
    | "fusion_pendulum"
    | "link"
    | "normal"
    | "normal_pendulum"
    | "ritual"
    | "ritual_pendulum"
    | "skill"
    | "spell"
    | "synchro"
    | "synchro_pendulum"
    | "token"
    | "trap"
    | "xyz"
    | "xyz_pendulum";

type ProDeckCardType =
    "Effect Monster"
    | "Flip Effect Monster"
    | "Fusion Monster"
    | "Gemini Monster"
    | "Link Monster"
    | "Normal Monster"
    | "Normal Tuner Monster"
    | "Pendulum Effect Fusion Monster"
    | "Pendulum Effect Monster"
    | "Pendulum Effect Ritual Monster"
    | "Pendulum Flip Effect Monster"
    | "Pendulum Normal Monster"
    | "Pendulum Tuner Effect Monster"
    | "Ritual Effect Monster"
    | "Ritual Monster"
    | "Skill Card"
    | "Spell Card"
    | "Spirit Monster"
    | "Synchro Monster"
    | "Synchro Pendulum Effect Monster"
    | "Synchro Tuner Monster"
    | "Token"
    | "Toon Monster"
    | "Trap Card"
    | "Tuner Monster"
    | "Union Effect Monster"
    | "XYZ Monster"
    | "XYZ Pendulum Effect Monster"

type ProDeckCardAttribute = "DARK"
    | "DIVINE"
    | "EARTH"
    | "FIRE"
    | "LIGHT"
    | "WATER"
    | "WIND";

type ProDeckCardRace = ""
    | "Alexis Rhodes"
    | "Andrew"
    | "Aqua"
    | "Arkana"
    | "Aster Phoenix"
    | "Axel Brodie"
    | "Bastion Misaw"
    | "Beast"
    | "Beast-Warrior"
    | "Bonz"
    | "Chazz Princet"
    | "Christine"
    | "Chumley Huffi"
    | "Continuous"
    | "Counter"
    | "Creator-God"
    | "Cyberse"
    | "David"
    | "Dinosaur"
    | "Divine-Beast"
    | "Dr. Vellian C"
    | "Dragon"
    | "Emma"
    | "Equip"
    | "Espa Roba"
    | "Fairy"
    | "Field"
    | "Fiend"
    | "Fish"
    | "Insect"
    | "Ishizu Ishtar"
    | "Ishizu"
    | "Jaden Yuki"
    | "Jesse Anderso"
    | "Joey Wheeler"
    | "Joey"
    | "Kaiba"
    | "Keith"
    | "Lumis Umbra"
    | "Lumis and Umb"
    | "Machine"
    | "Mai Valentine"
    | "Mai"
    | "Mako"
    | "Normal"
    | "Odion"
    | "Paradox Broth"
    | "Pegasus"
    | "Plant"
    | "Psychic"
    | "Pyro"
    | "Quick-Play"
    | "Reptile"
    | "Rex"
    | "Ritual"
    | "Rock"
    | "Sea Serpent"
    | "Seto Kaiba"
    | "Spellcaster"
    | "Syrus Truesda"
    | "Tea Gardner"
    | "Thunder"
    | "Tyranno Hassl"
    | "Warrior"
    | "Weevil"
    | "Winged Beast"
    | "Wyrm"
    | "Yami Bakura"
    | "Yami Marik"
    | "Yami Yugi"
    | "Yubel"
    | "Yugi"
    | "Zane Truesdal"
    | "Zombie";


const TYPE_MAPPING: Record<ProDeckCardType, CardType> = {
    "Effect Monster": CardType.EFFECT_MONSTER,
    "Flip Effect Monster": CardType.FLIP_EFFECT_MONSTER,
    "Fusion Monster": CardType.FUSION_MONSTER,
    "Gemini Monster": CardType.GEMINI_MONSTER,
    "Link Monster": CardType.LINK_MONSTER,
    "Normal Monster": CardType.NORMAL_MONSTER,
    "Normal Tuner Monster": CardType.NORMAL_TUNER_MONSTER,
    "Pendulum Effect Fusion Monster": CardType.PENDULUM_EFFECT_FUSION_MONSTER,
    "Pendulum Effect Monster": CardType.PENDULUM_EFFECT_MONSTER,
    "Pendulum Effect Ritual Monster": CardType.PENDULUM_EFFECT_RITUAL_MONSTER,
    "Pendulum Flip Effect Monster": CardType.PENDULUM_FLIP_EFFECT_MONSTER,
    "Pendulum Normal Monster": CardType.PENDULUM_NORMAL_MONSTER,
    "Pendulum Tuner Effect Monster": CardType.PENDULUM_TUNER_EFFECT_MONSTER,
    "Ritual Effect Monster": CardType.RITUAL_EFFECT_MONSTER,
    "Ritual Monster": CardType.RITUAL_MONSTER,
    "Skill Card": CardType.SKILL_CARD,
    "Spell Card": CardType.SPELL_CARD,
    "Spirit Monster": CardType.SPIRIT_MONSTER,
    "Synchro Monster": CardType.SYNCHRO_MONSTER,
    "Synchro Pendulum Effect Monster": CardType.SYNCHRO_PENDULUM_EFFECT_MONSTER,
    "Synchro Tuner Monster": CardType.SYNCHRO_TUNER_MONSTER,
    "Token": CardType.TOKEN,
    "Toon Monster": CardType.TOON_MONSTER,
    "Trap Card": CardType.TRAP_CARD,
    "Tuner Monster": CardType.TUNER_MONSTER,
    "Union Effect Monster": CardType.UNION_EFFECT_MONSTER,
    "XYZ Monster": CardType.XYZ_MONSTER,
    "XYZ Pendulum Effect Monster": CardType.XYZ_PENDULUM_EFFECT_MONSTER,
}

const ATTRIBUTE_MAPPING: Record<ProDeckCardAttribute, CardAttribute> = {
    "DARK": CardAttribute.DARK,
    "DIVINE": CardAttribute.DIVINE,
    "EARTH": CardAttribute.EARTH,
    "FIRE": CardAttribute.FIRE,
    "LIGHT": CardAttribute.LIGHT,
    "WATER": CardAttribute.WATER,
    "WIND": CardAttribute.WIND,
}

const RACE_MAPPING: Record<ProDeckCardRace, CardRace> = {
    "": CardRace.NONE,
    "Alexis Rhodes": CardRace.CHAR_ALEXIS_RHODES,
    "Andrew": CardRace.CHAR_ANDREW,
    "Aqua": CardRace.AQUA,
    "Arkana": CardRace.CHAR_ARKANA,
    "Aster Phoenix": CardRace.CHAR_ASTER_PHOENIX,
    "Axel Brodie": CardRace.CHAR_AXEL_BRODIE,
    "Bastion Misaw": CardRace.CHAR_BASTION_MISAW,
    "Beast": CardRace.BEAST,
    "Beast-Warrior": CardRace.BEAST_WARRIOR,
    "Bonz": CardRace.CHAR_BONZ,
    "Chazz Princet": CardRace.CHAR_CHAZZ_PRINCET,
    "Christine": CardRace.CHAR_CHRISTINE,
    "Chumley Huffi": CardRace.CHAR_CHUMLEY_HIFFI,
    "Continuous": CardRace.CONTINIOUS,
    "Counter": CardRace.COUNTER,
    "Creator-God": CardRace.CREATOR_GOD,
    "Cyberse": CardRace.CYBERSE,
    "David": CardRace.CHAR_DAVID,
    "Dinosaur": CardRace.DINOSAUR,
    "Divine-Beast": CardRace.DIVINE_BEAST,
    "Dr. Vellian C": CardRace.CHAR_WEEVIL,
    "Dragon": CardRace.DRAGON,
    "Emma": CardRace.CHAR_EMMA,
    "Equip": CardRace.EQUIP,
    "Espa Roba": CardRace.CHAR_ESPA_ROBA,
    "Fairy": CardRace.FAIRY,
    "Field": CardRace.FIELD,
    "Fiend": CardRace.FIEND,
    "Fish": CardRace.FISH,
    "Insect": CardRace.INSECT,
    "Ishizu Ishtar": CardRace.CHAR_ISHIZU_ISHTAR,
    "Ishizu": CardRace.CHAR_ISHIZU,
    "Jaden Yuki": CardRace.CHAR_JADEN_YUKI,
    "Jesse Anderso": CardRace.CHAR_JESSE_ANDERSO,
    "Joey Wheeler": CardRace.CHAR_JOEY_WHEELER,
    "Joey": CardRace.CHAR_JOEY_WHEELER,
    "Kaiba": CardRace.CHAR_KAIBA,
    "Keith": CardRace.CHAR_KEITH,
    "Lumis Umbra": CardRace.CHAR_LUMIS_UMBRA,
    "Lumis and Umb": CardRace.CHAR_LUMIS_UMBRA,
    "Machine": CardRace.MACHINE,
    "Mai Valentine": CardRace.CHAR_MAI_VALENTINE,
    "Mai": CardRace.CHAR_MAI_VALENTINE,
    "Mako": CardRace.CHAR_MAKO,
    "Normal": CardRace.NORMAL,
    "Odion": CardRace.CHAR_ODION,
    "Paradox Broth": CardRace.CHAR_PARADOX_BROTHERS,
    "Pegasus": CardRace.CHAR_PEGASUS,
    "Plant": CardRace.PLANT,
    "Psychic": CardRace.PSYCHIC,
    "Pyro": CardRace.PYRO,
    "Quick-Play": CardRace.QUICK_PLAY,
    "Reptile": CardRace.REPTILE,
    "Rex": CardRace.CHAR_WEEVIL,
    "Ritual": CardRace.RITUAL,
    "Rock": CardRace.ROCK,
    "Sea Serpent": CardRace.SEA_SERPENT,
    "Seto Kaiba": CardRace.CHAR_KAIBA,
    "Spellcaster": CardRace.SPELLCASTER,
    "Syrus Truesda": CardRace.CHAR_SYRUS_TRUESDA,
    "Tea Gardner": CardRace.CHAR_TEA_GARDNER,
    "Thunder": CardRace.THUNDER,
    "Tyranno Hassl": CardRace.CHAR_TYRANNO_HASSL,
    "Warrior": CardRace.WARRIOR,
    "Weevil": CardRace.CHAR_WEEVIL,
    "Winged Beast": CardRace.WINGED_BEAST,
    "Wyrm": CardRace.WYRM,
    "Yami Bakura": CardRace.CHAR_YAMI_BAKURA,
    "Yami Marik": CardRace.CHAR_YAMI_MARIK,
    "Yami Yugi": CardRace.CHAR_YAMI_YUGI,
    "Yubel": CardRace.CHAR_YUBEL,
    "Yugi": CardRace.CHAR_YUGI,
    "Zane Truesdal": CardRace.CHAR_ZANE_TRUESDALE,
    "Zombie": CardRace.ZOMBIE,
}

const FRAME_MAPPING: Record<ProDeckFrameType, CardFrame> = {
    "effect": CardFrame.EFFECT,
    "effect_pendulum": CardFrame.EFFECT_PENDULUM,
    "fusion": CardFrame.FUSION,
    "fusion_pendulum": CardFrame.FUSION_PENDULUM,
    "link": CardFrame.LINK,
    "normal": CardFrame.NORMAL,
    "normal_pendulum": CardFrame.NORMAL_PENDULUM,
    "ritual": CardFrame.RITUAL,
    "ritual_pendulum": CardFrame.RITUAL_PENDULUM,
    "skill": CardFrame.SKILL,
    "spell": CardFrame.SPELL,
    "synchro": CardFrame.SYNCHRO,
    "synchro_pendulum": CardFrame.SYNCHRO_PENDULUM,
    "token": CardFrame.TOKEN,
    "trap": CardFrame.TRAP,
    "xyz": CardFrame.XYZ,
    "xyz_pendulum": CardFrame.XYZ_PENDULUM
};

interface ProDeckCardSet {
    set_name: string,
    set_code: string,
    set_rarity: string,
    set_rarity_code: string,
    set_price: string
}

interface ProDeckCard {
    id: number;
    name: string;
    desc: string;
    race?: ProDeckCardRace,
    type: ProDeckCardType,
    frameType: ProDeckFrameType,
    attribute: ProDeckCardAttribute,
    atk?: number,
    def?: number,
    level?: number,
    card_sets?: ProDeckCardSet[],
    card_images: Array<{
        id: number,
        image_url: string,
        image_url_small: string,
        image_url_cropped: string
    }>
}

interface ProDeckResponse {
    data: ProDeckCard[]
}

(async () => {
    console.info("Getting list of cards")
    const response = await fetch(API_URL);
    const {data} : ProDeckResponse = await response.json();
    console.info('Received', data.length, 'cards');

    console.info("Clearing DB...");
    await prisma.cardsInCardSet.deleteMany({});
    await prisma.cardSet.deleteMany({});
    await prisma.card.deleteMany({});
    console.info("Starting import process...");

    console.info("Importing Cards alone...");
    for await (const proDeckCard of data){
        const isKnownCard = await prisma.card.findUnique({
            where: {
                konamiId: proDeckCard.id
            }
        });

        if (isKnownCard){
            continue;
        }

        await prisma.card.create({
            data: {
                konamiId: proDeckCard.id,
                name: proDeckCard.name,
                desc: proDeckCard.desc,
                type: TYPE_MAPPING[proDeckCard.type],
                frame: FRAME_MAPPING[proDeckCard.frameType],
                race: RACE_MAPPING[proDeckCard.race ?? ""],
                attribute: ATTRIBUTE_MAPPING[proDeckCard.attribute] ?? null,

                atk: proDeckCard.atk,
                def: proDeckCard.def,
                level: proDeckCard.level,

                image: proDeckCard.card_images[0].image_url,
                imageCropped: proDeckCard.card_images[0].image_url_cropped,
            }
        });

        console.info("ADD_CARD", proDeckCard.name);
    }

    console.info("Importing Sets...");
    const sets: ProDeckCardSet[] = data.reduce((sets: ProDeckCardSet[], card) => {
        return [...sets, ...(card.card_sets ?? [])];
    }, []);

    for await (const proDeckSet of sets){
        const isKnownSet = await prisma.cardSet.findUnique({
            where: {
                name_code: {
                    name: proDeckSet.set_name,
                    code: proDeckSet.set_code
                },
            }
        });

        if (isKnownSet){
            continue;
        }

        await prisma.cardSet.create({
            data: {
                name: proDeckSet.set_name,
                code: proDeckSet.set_code
            }
        });
        console.info("ADD SET", proDeckSet.set_name);

    }

    console.info("Importing Cards into sets...")
    for await (const proDeckCard of data){
        const prismaCard = await prisma.card.findUnique({
            where: {
                konamiId: proDeckCard.id
            }
        });

        if (!prismaCard || !proDeckCard.card_sets){
            continue;
        }

        for await (const proDeckSet of proDeckCard.card_sets) {
            const prismaSet = await prisma.cardSet.findUnique({
                where: {
                    name_code: {
                        name: proDeckSet.set_name,
                        code: proDeckSet.set_code
                    },
                }
            });

            if (!prismaSet){
                continue;
            }

            const cardAlreadyInSet = await prisma.cardsInCardSet.findFirst({
                where: {
                    AND: {
                        cardId: prismaCard.id,
                        cardSetId: prismaSet.id
                    }
                }
            })

            if (cardAlreadyInSet){
                continue;
            }

            await prisma.cardsInCardSet.create({
                data: {
                    cardId: prismaCard.id,
                    cardSetId: prismaSet.id,
                    rarity: proDeckSet.set_rarity,
                    price: proDeckSet.set_price,
                    rarityCode: proDeckSet.set_rarity_code
                }
            })

            console.info("  ADD [", prismaCard.name, '] >>> ', prismaSet.name);
        }
    }
})();