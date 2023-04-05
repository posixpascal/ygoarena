import {ReactNode} from "react";

export const Container : React.FC<{children: ReactNode}> = ({children}) => {
    return <div className={'container mx-auto py-8'}>
        {children}
    </div>
}