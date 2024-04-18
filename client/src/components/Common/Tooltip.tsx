import React from 'react';
import { Tooltip as FlowbiteTooltip } from 'flowbite-react';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {

};

function Tooltip({ content, children, className="" }: React.PropsWithChildren<TooltipProps>) {

    return(
        <FlowbiteTooltip
            className={className + " bg-background text-text"}
            content={content}
        >
            {children}
        </FlowbiteTooltip>
    );
};

export default Tooltip;