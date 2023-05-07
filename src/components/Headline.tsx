import React, {ReactNode} from "react";

export const Headline : React.FC<{children: ReactNode}> = ({children}) => {
    return <h1 className={'text-6xl text-sky-900 font-black uppercase'}>
        {children}
    </h1>
}