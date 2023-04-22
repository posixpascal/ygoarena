import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

interface NavigationItemProps {
    item: {
        to: string;
        name: string;
    }
}
export const NavigationItem : React.FC<NavigationItemProps> = ({ item: {to, name} }) => {
    const router = useRouter();
    const isActive = router.pathname === to ||  router.pathname.includes(to);
    return <Link href={to} className={`
        ${isActive ? 'bg-amber-100 text-amber-900 p-1.5 px-5 rounded-lg' : "p-1.5 px-5"}
    `}>
        {name}
    </Link>
}