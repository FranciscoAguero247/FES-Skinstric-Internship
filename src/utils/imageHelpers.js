/**
 * Converts a browser File object into a clean Base64 string for the Phase 2 API.
 * @param {File} file - The uploaded image file from the input field.
 * @returns {Promise<string>} - Resolves with the pure Base64 string payload.
 */
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // The result contains "data:image/jpeg;base64,..." 
      // We split and take everything after the comma to send the pure string.
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Takes the raw demographic objects from the Skinstric Phase 2 API,
 * converts values to percentages rounded to 2 decimal places,
 * and sorts them in descending order as requested.
 * * @param {Object} apiSection - E.g., data.race, data.age, or data.gender
 * @returns {Array<{label: string, percentage: string}>} - Sorted array of formatted objects
 */
export const formatAndSortDemographics = (apiSection) => {
  if (!apiSection) return [];
  
  return Object.entries(apiSection)
    .map(([label, probability]) => ({
      label: label,
      // Convert e.g., 0.252582 to "25.26"
      percentage: (probability * 100).toFixed(2)
    }))
    // Sort descending by highest percentage match
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
};