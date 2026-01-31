// Calculator module - Core calculation logic

import { 
  BRAZILIAN_CAPITALS, 
  EMISSION_FACTORS, 
  ROUTE_OVERRIDES,
  ENVIRONMENTAL_EQUIVALENTS,
  IMPACT_THRESHOLDS 
} from './config.js';

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate distance between two Brazilian capitals
 * Uses route overrides if available, otherwise applies road distance approximation
 * @param {string} origin - Origin capital name
 * @param {string} destination - Destination capital name
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(origin, destination) {
  if (origin === destination) {
    return 0;
  }

  // Check for specific route override
  const routeKey = `${origin}-${destination}`;
  if (ROUTE_OVERRIDES[routeKey]) {
    return ROUTE_OVERRIDES[routeKey];
  }

  // Calculate straight-line distance
  const originData = BRAZILIAN_CAPITALS[origin];
  const destinationData = BRAZILIAN_CAPITALS[destination];
  
  if (!originData || !destinationData) {
    return 0;
  }

  const straightDistance = haversineDistance(
    originData.lat,
    originData.lng,
    destinationData.lat,
    destinationData.lng
  );

  // Apply road distance approximation (typically 1.3x straight-line distance)
  return Math.round(straightDistance * 1.3);
}

/**
 * Calculate CO₂ emissions
 * @param {number} distance - Distance in km
 * @param {string} transportMode - Transport mode key
 * @param {boolean} roundTrip - Whether it's a round trip
 * @param {number} monthlyFrequency - Number of trips per month
 * @returns {number} Total CO₂ emissions in kg
 */
export function calculateEmissions(distance, transportMode, roundTrip = false, monthlyFrequency = 1) {
  const emissionFactor = EMISSION_FACTORS[transportMode] || 0;
  const tripMultiplier = roundTrip ? 2 : 1;
  
  // emissions in grams
  const emissionsGrams = distance * emissionFactor * tripMultiplier * monthlyFrequency;
  
  // Convert to kg
  return emissionsGrams / 1000;
}

/**
 * Calculate environmental equivalents
 * @param {number} emissionsKg - CO₂ emissions in kg
 * @returns {object} Environmental equivalents
 */
export function calculateEquivalents(emissionsKg) {
  return {
    trees: (emissionsKg * ENVIRONMENTAL_EQUIVALENTS.treesPerKgCO2PerYear).toFixed(2),
    smartphoneCharges: Math.round(emissionsKg * ENVIRONMENTAL_EQUIVALENTS.smartphoneChargesPerKgCO2),
    kwh: (emissionsKg * ENVIRONMENTAL_EQUIVALENTS.kwhPerKgCO2).toFixed(2),
    carKm: Math.round(emissionsKg * ENVIRONMENTAL_EQUIVALENTS.avgCarKmPerKgCO2)
  };
}

/**
 * Determine impact level and get recommendations
 * @param {number} emissionsKg - CO₂ emissions in kg
 * @returns {object} Impact analysis with level and recommendations
 */
export function analyzeImpact(emissionsKg) {
  let level, color, recommendations;

  if (emissionsKg < IMPACT_THRESHOLDS.low) {
    level = 'Baixo';
    color = 'green';
    recommendations = [
      'Ótimo! Continue optando por meios de transporte sustentáveis.',
      'Considere compartilhar viagens quando possível.',
      'Mantenha seu veículo bem conservado para máxima eficiência.'
    ];
  } else if (emissionsKg < IMPACT_THRESHOLDS.medium) {
    level = 'Médio';
    color = 'orange';
    recommendations = [
      'Considere alternativas mais sustentáveis, como transporte público.',
      'Se possível, opte por videoconferências em vez de viagens.',
      'Planeje viagens combinadas para reduzir deslocamentos.',
      'Avalie a possibilidade de compensação de carbono.'
    ];
  } else {
    level = 'Alto';
    color = 'red';
    recommendations = [
      'Considere fortemente alternativas mais ecológicas.',
      'Avalie a real necessidade de cada viagem.',
      'Priorize transporte público ou compartilhado.',
      'Considere programas de compensação de carbono.',
      'Planeje com antecedência para otimizar rotas e reduzir viagens.'
    ];
  }

  return { level, color, recommendations };
}
