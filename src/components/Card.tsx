import React, {useState} from "react";
import {Card as PrismaCard} from '@prisma/client';
import {animated, useSpring} from "@react-spring/web";

export interface CardProps {
    card: PrismaCard,
    flippable?: boolean,
    flipped?: boolean;
    index?: number;
}

// TODO: Add Rare/SR/UR effect
// TODO: cleanup this mess :D
export const Card: React.FC<CardProps> = ({index = 0, flipped, flippable = false, card}) => {
    const [flip, setFlipped] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        delay: 300 * index,
        config: {mass: 5, tension: 500, friction: 80},
    })

    return <div>
        {showOverlay && <div className={`fixed z-20 isolation-auto bg-black/80 p-5 text-white isolate top-0 left-0`}>
            {card.desc}
        </div>}
        <div className={'relative w-full'}>
            <animated.div className={'absolute h-full w-full will-change-transform'}
                          style={{opacity: opacity.to(o => 1 - o), transform}}>
                <img src={'/images/CardBack.jpg'} className={`object-contain`}
                     alt={card.name} width={'100%'}/>
            </animated.div>
            <animated.div className={'absolute h-full w-full will-change-transform'} style={{
                opacity,
                transform,
                rotateY: '180deg',
            }}>
                <img
                    onMouseLeave={() => setShowOverlay(false)}
                    onMouseEnter={() => setShowOverlay(true)} src={card.image} className={`object-contain`}
                     alt={card.name} width={'100%'}/>
            </animated.div>
        </div>
    </div>
}
