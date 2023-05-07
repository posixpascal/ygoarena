import {ReactNode} from "react";

export const Container : React.FC<{children: ReactNode}> = ({children}) => {
    return <div className={'p-6 mx-auto'}>
        {children}
    </div>
}