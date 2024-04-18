import React from 'react';

export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {

};

function Layout({ className, children, ...rest }: React.PropsWithChildren<LayoutProps>) {
    return(
        <div 
            className={`
                flex 
                flex-col
                w-full
                px-5 lg:px-52
                pt-32
                items-center
                justify-center
                ${className}
            `}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Layout;