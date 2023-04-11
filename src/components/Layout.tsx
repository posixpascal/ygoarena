import React, {ReactNode} from "react";
import {Header} from "@/components/Header";

export const Layout : React.FC<{children: ReactNode}> = ({children}) => {
    return <div className={'bg-slate-900 min-h-screen text-white'}>
        <Header />
        {children}
    </div>
}