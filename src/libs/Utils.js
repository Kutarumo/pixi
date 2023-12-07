/**
 * Extracts the file name (without extension) from a file path.
 * @param {string} filePath - The file path.
 * @returns {string} The extracted file name.
 */
function extractFileName(filePath) {
    // Split the file path into segments using the "/" separator
    const pathSegments = filePath.split("/");
    
    // Get the last segment, which represents the file name with extension
    const fileNameWithExtension = pathSegments[pathSegments.length - 1];
    
    // Split the file name with extension to get the actual file name
    const fileName = fileNameWithExtension.split(".")[0];
    
    return fileName;
}

/**
 * Generates a random boolean value based on the given chance percentage.
 * @param {number} chancePercentage - The chance percentage (between 0 and 100).
 * @returns {boolean} The randomly generated boolean value.
 * @throws {Error} Throws an error if the chance percentage is outside the valid range.
 */
function generateRandomBoolean(chancePercentage) {
    // Check if the chance percentage is within the valid range
    if (chancePercentage < 0 || chancePercentage > 100) {
        throw new Error("Le pourcentage de chance doit être compris entre 0 et 100.");
    }

    // Generate a random value between 0 and 100
    const randomValue = Math.random() * 100;

    // Return true if the random value is less than the chance percentage, otherwise, return false
    return randomValue < chancePercentage;
}

// Export the functions for use in other modules
export { extractFileName, generateRandomBoolean };
