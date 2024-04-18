export function truncateText(str: string, charLimit: number): string {

    if(str.length < charLimit) {
        return str;
    }

    let newStr = "";

    for(let i = 0; i < charLimit; i++) {
        newStr += str[i];
    };

    return newStr + "...";
};