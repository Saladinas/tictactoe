export const randomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const flipACoin = () => {
    return Math.random() >= 0.5;
}