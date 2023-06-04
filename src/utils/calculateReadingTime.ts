export const calculateReadingTime = (content: string):number => {
    const wordsPerMinute = 180;
    const noOfWords = content.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime;
}