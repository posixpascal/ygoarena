import Sword from "@/icons/swords.svg";
import Money from "@/icons/money.svg";
import Crown from "@/icons/crown.svg";
import React, {ReactNode, useState} from "react";
import {animated, useSpring} from "@react-spring/web";
import Link from "next/link";
import {useRouter} from "next/router";

const Logo = () => (<div className={'p-1'}>
    <svg viewBox="0 0 272 364" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
           fontFamily="Inter-Regular_Black, Inter, Arial" fontWeight="800">
            <g id="Artboard" transform="translate(12.000000, 62.000000)">
                <g id="Group" transform="translate(-12.000000, -62.000000)">
                    <text id="C" font-size="227" fill="#B0C4CB">
                        <tspan x="96.7791193" y="309">C</tspan>
                    </text>
                    <text id="B" font-size="253" fill="#1E202C">
                        <tspan x="0.546875" y="245">B</tspan>
                    </text>
                </g>
            </g>
        </g>
    </svg>
</div>);

interface MenuItemProps {
    icon: ReactNode;
    name: string;
    expand: boolean;
    soon?: boolean;
    titleClassName?: string;
    to?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, titleClassName = 'text-lg', soon = false, icon, name, expand}) => {
    const router = useRouter();
    const isActive = router.pathname.includes(to!) && to && to !== '/';
    const expandTransition = useSpring({opacity: expand ? 1 : 0});
    return <Link href={to!} className={`flex items-center gap-3 min-w-[250px] p-3 px-5 w-full overflow-hidden ${soon ? 'opacity-50 grayscale pointer-events-none' : ''} ${isActive ? 'bg-sky-200/50' : ''}`}

    >
        <div className={'w-16'}>
            {icon}
        </div>
        <animated.div style={expandTransition} className={`w-full flex text-center ${titleClassName}`}>
            {name} {soon && <div>(soon)</div>}
        </animated.div>
    </Link>
}

export const Sidebar = () => {
    const [isHover, setHover] = useState(false);
    const expandTransition = useSpring({
        width: isHover ? 280 : 85, config: {
            duration: 200
        }
    })

    return <animated.div
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={expandTransition}
        className={`bg-white border-r overflow-hidden h-screen shadow-2xl flex flex-col`}>
        <MenuItem icon={<Logo/>} to="/" titleClassName={'font-black text-2xl'} name={"Battle City"} expand={isHover}/>
        <hr/>
        <nav className={'w-full flex flex-col gap-2'}>
            <MenuItem to="/arena" icon={<Sword/>} name={"Arena Mode"} expand={isHover}/>
            <MenuItem to="/auction" soon={true} icon={<Money/>} name={"Auctions"} expand={isHover}/>
            <MenuItem to="/deckmaster" soon={true} icon={<Crown/>} name={"DM"} expand={isHover}/>
        </nav>
    </animated.div>
}