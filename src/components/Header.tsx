import React, {useMemo} from "react";
import Link from "next/link";
import {NavigationItem} from "@/components/NavigationItem";

export const Header = () => {
    const navItems = [
        {
            to: "/arena",
            name: "Arena"
        },
        // {
        //     to: "/deckmaster",
        //     name: "Deckmaster"
        // },
    ];

    const navigation = useMemo(() => {
        return <nav className={'flex gap-8 text-2xl'}>
            {navItems.map(item => (<>
              <NavigationItem item={item} key={item.to} />
            </>))}
        </nav>
    }, [navItems]);

    return <header className={'p-5 flex justify-between items-center'}>
        <a href={'/'} className={'font-black text-4xl'}>
            YGO Battle City
        </a>
        {navigation}
    </header>
}