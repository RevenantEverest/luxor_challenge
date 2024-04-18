import type { IconType } from 'react-icons';

import React, { useRef } from 'react';

export interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    icon?: IconType,
    iconRight?: boolean,
    iconClassName?: string,
    errorMessage?: string
};

function TextArea({ id="", className="", label, icon, iconRight, iconClassName="", errorMessage, ...rest }: TextAreaProps) {

    const tabSpaces = 4;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const baseInputClassName = `
        block w-full border 
        disabled:cursor-not-allowed 
        disabled:opacity-50 
        bg-card-light 
        ${errorMessage ? "border-red-500" : "border-card-light"} 
        rounded-lg 
        p-2.5
        text-sm
        placeholder:text-muted text-text
        ${(icon && !iconRight) && "pl-11"} 
    `;

    const focusInputClassName = `
        focus:border-primary 
        focus:ring-primary
    `;

    const renderIcon = (IconComponent: IconType) => {
        const iconContainerClassName = `
            pointer-events-none absolute flex items-center p-3
            bg-background
            text-text
            ${iconRight ? "inset-y-0 right-0 pr-3" : "inset-y-0 left-0 pl-3"}
        `;

        return(
            <div className={`${iconContainerClassName} rounded-l-[0.4rem]`}>
                <IconComponent className={iconClassName} />
            </div>
        );
    };

    const renderErrorMessage = () => {
        return(
            <p className="text-red-500 text-sm">{errorMessage}</p>
        );
    };

    const renderLabel = () => (
        <div>
            <p className="text-sm font-semibold">{label}</p>
        </div>
    );

    return(
        <React.Fragment>
            {label && renderLabel()}
            <div className={`relative w-full h-full ${label && "mt-1.5"}`}>
                {icon && renderIcon(icon)}
                <textarea
                    id={id}
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        const content = e.currentTarget.value;
                        const caret = e.currentTarget.selectionStart;

                        if(e.key === "Tab") {
                            e.preventDefault();

                            const newText = content.substring(0, caret) + " ".repeat(tabSpaces) + content.substring(caret);
                            
                            if(textareaRef.current) {
                                textareaRef.current.value = newText;
                            }

                            if(caret >= 0 && textareaRef.current){
                                textareaRef.current.setSelectionRange(caret + tabSpaces, caret + tabSpaces);
                            }
                        }
                    }}
                    className={`${baseInputClassName} ${focusInputClassName} ${className}`}
                    {...rest}
                />
            </div>
            {errorMessage && renderErrorMessage()}
        </React.Fragment>
    );
};

export default TextArea;