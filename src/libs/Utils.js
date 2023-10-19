function extractFileName(filePath) {
    const pathSegments = filePath.split("/");
    const fileNameWithExtension = pathSegments[pathSegments.length - 1];
    const fileName = fileNameWithExtension.split(".")[0];
    return fileName;
}

function generateRandomBoolean(chancePercentage) {
if (chancePercentage < 0 || chancePercentage > 100) {
    throw new Error("Le pourcentage de chance doit être compris entre 0 et 100.");
}
    const randomValue = this.getRandom() * 100;
    return randomValue < chancePercentage;
}

function getRandom() {
    return Math.random();
}

export { extractFileName, generateRandomBoolean };