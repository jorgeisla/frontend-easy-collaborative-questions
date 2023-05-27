const readJsonFile = async (filePath: string) => {
    const response = await fetch(filePath);
    const fileContent = await response.text();
    return fileContent;
};

export { readJsonFile };
