export const randomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const flipACoin = () => {
    return Math.random() >= 0.5;
}

export const isEmpty = (element) => {
    return element === '-';
}

export const isDraw = (userChar) => {
    return userChar !== 'x' ? 'x' : 'o';
}

export const getCPUChar = (userChar) => {
    return userChar !== 'x' ? 'x' : 'o';
}