import React, {ReactNode} from "react";

export const Layout : React.FC<{children: ReactNode}> = ({children}) => {

    return <div className={'bg-slate-900 min-h-screen text-white'}>{children}</div>
}