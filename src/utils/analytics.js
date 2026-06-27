// src/utils/analytics.js
export function extractTopDemographics(data) {
  if (!data) return null;

  const getTopKey = (obj) => {
    if (!obj) return 'Unknown';
    return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b), 'Unknown');
  };

  return {
    race: getTopKey(data.race),
    ageGroup: getTopKey(data.age),
    gender: getTopKey(data.gender),
  };
}