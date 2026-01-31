// Main application module

import { BRAZILIAN_CAPITALS, TRANSPORT_LABELS } from './config.js';
import { 
  calculateDistance, 
  calculateEmissions, 
  calculateEquivalents, 
  analyzeImpact 
} from './calculator.js';

// Initialize the application
function init() {
  populateCitySelects();
  setupEventListeners();
}

/**
 * Populate origin and destination select elements with Brazilian capitals
 */
function populateCitySelects() {
  const originSelect = document.getElementById('origin');
  const destinationSelect = document.getElementById('destination');

  // Get sorted list of capitals
  const cities = Object.keys(BRAZILIAN_CAPITALS).sort();

  cities.forEach(city => {
    const state = BRAZILIAN_CAPITALS[city].state;
    const optionText = `${city} (${state})`;

    const originOption = new Option(optionText, city);
    const destinationOption = new Option(optionText, city);

    originSelect.add(originOption);
    destinationSelect.add(destinationOption);
  });
}

/**
 * Setup event listeners for form interactions
 */
function setupEventListeners() {
  const form = document.getElementById('calculator-form');
  const originSelect = document.getElementById('origin');
  const destinationSelect = document.getElementById('destination');

  // Auto-calculate distance when origin or destination changes
  originSelect.addEventListener('change', updateDistance);
  destinationSelect.addEventListener('change', updateDistance);

  // Handle form submission
  form.addEventListener('submit', handleSubmit);
}

/**
 * Update the distance field when origin or destination changes
 */
function updateDistance() {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const distanceInput = document.getElementById('distance');

  if (origin && destination) {
    const distance = calculateDistance(origin, destination);
    distanceInput.value = distance;
  }
}

/**
 * Handle form submission and calculate emissions
 */
function handleSubmit(event) {
  event.preventDefault();

  const distance = parseFloat(document.getElementById('distance').value);
  const transportMode = document.getElementById('transport').value;
  const roundTrip = document.getElementById('roundTrip').checked;
  const monthlyFrequency = parseInt(document.getElementById('frequency').value) || 1;

  if (!distance || distance <= 0) {
    alert('Por favor, selecione origem e destino válidos.');
    return;
  }

  // Calculate emissions
  const emissions = calculateEmissions(distance, transportMode, roundTrip, monthlyFrequency);

  // Calculate equivalents
  const equivalents = calculateEquivalents(emissions);

  // Analyze impact
  const impact = analyzeImpact(emissions);

  // Display results
  displayResults(emissions, equivalents, impact, distance, transportMode, roundTrip, monthlyFrequency);
}

/**
 * Display calculation results
 */
function displayResults(emissions, equivalents, impact, distance, transportMode, roundTrip, monthlyFrequency) {
  const resultsSection = document.getElementById('results');
  const emissionsValue = document.getElementById('emissions-value');
  const equivalentsDiv = document.getElementById('equivalents');
  const impactDiv = document.getElementById('impact-analysis');

  // Display total emissions
  emissionsValue.textContent = emissions.toFixed(2);

  // Display trip details
  const tripDetails = document.getElementById('trip-details');
  const tripType = roundTrip ? 'ida e volta' : 'só ida';
  const transportLabel = TRANSPORT_LABELS[transportMode];
  const frequencyText = monthlyFrequency > 1 ? ` × ${monthlyFrequency} viagens/mês` : '';
  
  tripDetails.textContent = `${distance} km • ${transportLabel} • ${tripType}${frequencyText}`;

  // Display environmental equivalents
  equivalentsDiv.innerHTML = `
    <div class="equivalent-item">
      <div class="equivalent-icon">🌳</div>
      <div class="equivalent-content">
        <div class="equivalent-value">${equivalents.trees}</div>
        <div class="equivalent-label">árvores/ano para absorver</div>
      </div>
    </div>
    <div class="equivalent-item">
      <div class="equivalent-icon">📱</div>
      <div class="equivalent-content">
        <div class="equivalent-value">${equivalents.smartphoneCharges.toLocaleString('pt-BR')}</div>
        <div class="equivalent-label">cargas de smartphone</div>
      </div>
    </div>
    <div class="equivalent-item">
      <div class="equivalent-icon">⚡</div>
      <div class="equivalent-content">
        <div class="equivalent-value">${equivalents.kwh}</div>
        <div class="equivalent-label">kWh de energia</div>
      </div>
    </div>
    <div class="equivalent-item">
      <div class="equivalent-icon">🚗</div>
      <div class="equivalent-content">
        <div class="equivalent-value">${equivalents.carKm.toLocaleString('pt-BR')}</div>
        <div class="equivalent-label">km rodados de carro médio</div>
      </div>
    </div>
  `;

  // Display impact analysis
  impactDiv.innerHTML = `
    <div class="impact-header">
      <span class="impact-level impact-${impact.color}">${impact.level}</span>
    </div>
    <div class="recommendations">
      <h4>Recomendações:</h4>
      <ul>
        ${impact.recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    </div>
  `;

  // Show results section with animation
  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
