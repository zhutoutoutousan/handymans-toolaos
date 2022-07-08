// If the length of the string is bigger than 143, trim the string and replace all the text bigger than 143 with '...'
const trimStringWithEllipses = string => {
    if (string.length > 143) {
        return string.substring(0, 140) + '...';
    }
    return string;
}