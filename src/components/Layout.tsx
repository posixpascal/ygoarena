import React, {ReactNode} from "react";
import {Header} from "@/components/Header";
import {Sidebar} from "@/components/Sidebar";

export const Layout : React.FC<{children: ReactNode}> = ({children}) => {
    return <div className={'bg-background text-black'}>
        <div className={'flex'}>
            <Sidebar />
            <div className={'w-full h-screen overflow-auto'}>
                {children}
            </div>
        </div>
    </div>
}