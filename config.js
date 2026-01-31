// Configuration file for Carbon Calculator - Brazil

export const BRAZILIAN_CAPITALS = {
  "Aracaju": { lat: -10.9472, lng: -37.0731, state: "SE" },
  "Belém": { lat: -1.4558, lng: -48.5044, state: "PA" },
  "Belo Horizonte": { lat: -19.9167, lng: -43.9345, state: "MG" },
  "Boa Vista": { lat: 2.8235, lng: -60.6758, state: "RR" },
  "Brasília": { lat: -15.7939, lng: -47.8828, state: "DF" },
  "Campo Grande": { lat: -20.4697, lng: -54.6201, state: "MS" },
  "Cuiabá": { lat: -15.6014, lng: -56.0979, state: "MT" },
  "Curitiba": { lat: -25.4297, lng: -49.2719, state: "PR" },
  "Florianópolis": { lat: -27.5969, lng: -48.5495, state: "SC" },
  "Fortaleza": { lat: -3.7172, lng: -38.5433, state: "CE" },
  "Goiânia": { lat: -16.6869, lng: -49.2648, state: "GO" },
  "João Pessoa": { lat: -7.1195, lng: -34.8450, state: "PB" },
  "Macapá": { lat: 0.0389, lng: -51.0664, state: "AP" },
  "Maceió": { lat: -9.6658, lng: -35.7353, state: "AL" },
  "Manaus": { lat: -3.1190, lng: -60.0217, state: "AM" },
  "Natal": { lat: -5.7945, lng: -35.2110, state: "RN" },
  "Palmas": { lat: -10.1689, lng: -48.3317, state: "TO" },
  "Porto Alegre": { lat: -30.0346, lng: -51.2177, state: "RS" },
  "Porto Velho": { lat: -8.7619, lng: -63.9039, state: "RO" },
  "Recife": { lat: -8.0476, lng: -34.8770, state: "PE" },
  "Rio Branco": { lat: -9.9753, lng: -67.8243, state: "AC" },
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729, state: "RJ" },
  "Salvador": { lat: -12.9714, lng: -38.5014, state: "BA" },
  "São Luís": { lat: -2.5387, lng: -44.2825, state: "MA" },
  "São Paulo": { lat: -23.5505, lng: -46.6333, state: "SP" },
  "Teresina": { lat: -5.0892, lng: -42.8019, state: "PI" },
  "Vitória": { lat: -20.3155, lng: -40.3128, state: "ES" }
};

// Emission factors in g CO₂/km for each transport mode
export const EMISSION_FACTORS = {
  car: 192,
  bus: 68,
  plane: 255,
  motorcycle: 103,
  train: 41
};

// Transport mode labels (Portuguese)
export const TRANSPORT_LABELS = {
  car: "Carro",
  bus: "Ônibus",
  plane: "Avião",
  motorcycle: "Motocicleta",
  train: "Trem"
};

// Specific route overrides (actual road distances for common routes)
// Format: "Origin-Destination": distance in km
export const ROUTE_OVERRIDES = {
  "São Paulo-Rio de Janeiro": 430,
  "Rio de Janeiro-São Paulo": 430,
  "São Paulo-Belo Horizonte": 586,
  "Belo Horizonte-São Paulo": 586,
  "São Paulo-Curitiba": 408,
  "Curitiba-São Paulo": 408,
  "São Paulo-Brasília": 1015,
  "Brasília-São Paulo": 1015,
  "Rio de Janeiro-Belo Horizonte": 434,
  "Belo Horizonte-Rio de Janeiro": 434,
  "São Paulo-Florianópolis": 705,
  "Florianópolis-São Paulo": 705,
  "São Paulo-Porto Alegre": 1130,
  "Porto Alegre-São Paulo": 1130,
  "Rio de Janeiro-Brasília": 1148,
  "Brasília-Rio de Janeiro": 1148,
  "Brasília-Goiânia": 209,
  "Goiânia-Brasília": 209,
  "Salvador-Recife": 839,
  "Recife-Salvador": 839,
  "Fortaleza-Recife": 800,
  "Recife-Fortaleza": 800
};

// Environmental equivalents for visualization
export const ENVIRONMENTAL_EQUIVALENTS = {
  treesPerKgCO2PerYear: 0.02, // 1 tree absorbs ~50 kg CO₂/year
  smartphoneChargesPerKgCO2: 121.95, // 1 smartphone charge = ~8.2 Wh = ~0.0082 kg CO₂
  kwhPerKgCO2: 2.17, // Average Brazilian energy mix: ~0.46 kg CO₂/kWh
  avgCarKmPerKgCO2: 5.21 // Using car emission factor of 192 g/km
};

// Impact thresholds (kg CO₂)
export const IMPACT_THRESHOLDS = {
  low: 50,
  medium: 200
};
