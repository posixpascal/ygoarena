import React, {ReactNode} from "react";

export const Headline : React.FC<{children: ReactNode}> = ({children}) => {
    return <h1 className={'text-6xl my-20 font-black uppercase'}>
        {children}
    </h1>
}