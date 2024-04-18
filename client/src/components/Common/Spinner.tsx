import { Spinner as FlowbiteSpinner } from 'flowbite-react';
import React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
};

function Spinner({ size="md", ...rest }: SpinnerProps) {

    return(
        <div {...rest}>
            <FlowbiteSpinner 
                theme={{
                    color: {
                        "primary": "fill-primary",
                        "secondary": "fill-secondary"
                    },
                    light: {
                        off: {
                            base: "text-text"
                        }
                    }
                }}
                color="primary"
                aria-label="Loading spinner" 
                size={size} 
            />
        </div>
    );
};

export default Spinner;