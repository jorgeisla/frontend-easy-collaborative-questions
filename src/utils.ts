const readJsonFile = async (filePath: string) => {
    const response = await fetch(filePath);
    const fileContent = await response.text();
    return fileContent;
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
};

export { readJsonFile, formatTime };
