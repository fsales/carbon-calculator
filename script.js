// Brazilian State Capitals with coordinates
const brazilianCapitals = [
    { name: "São Paulo, SP", lat: -23.5505, lon: -46.6333 },
    { name: "Rio de Janeiro, RJ", lat: -22.9068, lon: -43.1729 },
    { name: "Brasília, DF", lat: -15.7939, lon: -47.8828 },
    { name: "Salvador, BA", lat: -12.9714, lon: -38.5014 },
    { name: "Fortaleza, CE", lat: -3.7172, lon: -38.5433 },
    { name: "Belo Horizonte, MG", lat: -19.9167, lon: -43.9345 },
    { name: "Manaus, AM", lat: -3.1190, lon: -60.0217 },
    { name: "Curitiba, PR", lat: -25.4297, lon: -49.2711 },
    { name: "Recife, PE", lat: -8.0476, lon: -34.8770 },
    { name: "Porto Alegre, RS", lat: -30.0346, lon: -51.2177 },
    { name: "Belém, PA", lat: -1.4558, lon: -48.5039 },
    { name: "Goiânia, GO", lat: -16.6869, lon: -49.2648 },
    { name: "Guarulhos, SP", lat: -23.4538, lon: -46.5333 },
    { name: "Campinas, SP", lat: -22.9099, lon: -47.0626 },
    { name: "São Luís, MA", lat: -2.5307, lon: -44.3068 },
    { name: "São Gonçalo, RJ", lat: -22.8268, lon: -43.0537 },
    { name: "Maceió, AL", lat: -9.6658, lon: -35.7350 },
    { name: "Duque de Caxias, RJ", lat: -22.7858, lon: -43.3054 },
    { name: "Natal, RN", lat: -5.7945, lon: -35.2110 },
    { name: "Teresina, PI", lat: -5.0892, lon: -42.8019 },
    { name: "Campo Grande, MS", lat: -20.4697, lon: -54.6201 },
    { name: "João Pessoa, PB", lat: -7.1195, lon: -34.8450 },
    { name: "Aracaju, SE", lat: -10.9472, lon: -37.0731 },
    { name: "Cuiabá, MT", lat: -15.6014, lon: -56.0979 },
    { name: "Florianópolis, SC", lat: -27.5954, lon: -48.5480 },
    { name: "Vitória, ES", lat: -20.3155, lon: -40.3128 },
    { name: "Macapá, AP", lat: 0.0349, lon: -51.0694 },
    { name: "Porto Velho, RO", lat: -8.7608, lon: -63.9006 },
    { name: "Rio Branco, AC", lat: -9.9747, lon: -67.8243 },
    { name: "Boa Vista, RR", lat: 2.8235, lon: -60.6758 },
    { name: "Palmas, TO", lat: -10.1840, lon: -48.3336 }
];

// CO₂ emission factors (kg CO₂ per km per passenger)
const emissionFactors = {
    car: 0.192,           // Gasoline car
    'car-diesel': 0.171,  // Diesel car
    bus: 0.089,           // Bus
    plane: 0.255,         // Airplane
    train: 0.041          // Train
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    populateCitySelects();
    setupEventListeners();
});

// Populate city selection dropdowns
function populateCitySelects() {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    
    brazilianCapitals.sort((a, b) => a.name.localeCompare(b.name));
    
    brazilianCapitals.forEach((city, index) => {
        const option1 = document.createElement('option');
        option1.value = index;
        option1.textContent = city.name;
        originSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = index;
        option2.textContent = city.name;
        destinationSelect.appendChild(option2);
    });
}

// Setup event listeners
function setupEventListeners() {
    const originSelect = document.getElementById('origin');
    const destinationSelect = document.getElementById('destination');
    const form = document.getElementById('calculatorForm');
    
    originSelect.addEventListener('change', calculateDistance);
    destinationSelect.addEventListener('change', calculateDistance);
    form.addEventListener('submit', handleSubmit);
}

// Calculate distance between two cities using Haversine formula
function calculateDistance() {
    const originIndex = document.getElementById('origin').value;
    const destinationIndex = document.getElementById('destination').value;
    
    if (originIndex === '' || destinationIndex === '') {
        document.getElementById('distance').value = '';
        return;
    }
    
    if (originIndex === destinationIndex) {
        document.getElementById('distance').value = '0';
        return;
    }
    
    const origin = brazilianCapitals[originIndex];
    const destination = brazilianCapitals[destinationIndex];
    
    const distance = haversineDistance(
        origin.lat, origin.lon,
        destination.lat, destination.lon
    );
    
    document.getElementById('distance').value = Math.round(distance);
}

// Haversine formula for calculating distance between two points on Earth
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const distance = parseFloat(document.getElementById('distance').value);
    const transport = document.getElementById('transport').value;
    const passengers = parseInt(document.getElementById('passengers').value);
    
    if (!distance || !transport || !passengers) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    if (distance === 0) {
        alert('Por favor, selecione cidades diferentes!');
        return;
    }
    
    calculateEmissions(distance, transport, passengers);
}

// Calculate CO₂ emissions
function calculateEmissions(distance, transport, passengers) {
    const emissionFactor = emissionFactors[transport];
    const totalEmissions = distance * emissionFactor * passengers;
    const perPersonEmissions = totalEmissions / passengers;
    
    displayResults(totalEmissions, perPersonEmissions, distance, transport, passengers);
}

// Display results
function displayResults(totalEmissions, perPersonEmissions, distance, transport, passengers) {
    document.getElementById('totalEmissions').textContent = `${totalEmissions.toFixed(2)} kg CO₂`;
    document.getElementById('perPerson').textContent = `${perPersonEmissions.toFixed(2)} kg CO₂ por pessoa`;
    
    displayEquivalents(totalEmissions);
    displayImpactAnalysis(totalEmissions, distance, transport);
    displayRecommendations(totalEmissions, transport, distance);
    
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Display environmental equivalents
function displayEquivalents(emissions) {
    const equivalentsDiv = document.getElementById('equivalents');
    
    // Average tree absorbs about 22 kg CO₂ per year
    const trees = (emissions / 22 * 365).toFixed(1);
    
    // Average car emits about 4.6 metric tons per year
    const carDays = (emissions / (4600 / 365)).toFixed(1);
    
    // Average household emits about 7.5 tons per year
    const householdDays = (emissions / (7500 / 365)).toFixed(1);
    
    // Smartphone charging (about 0.008 kg CO₂ per charge)
    const phoneCharges = (emissions / 0.008).toFixed(0);
    
    equivalentsDiv.innerHTML = `
        <div class="equivalent-item">🌳 ${trees} dias de absorção de CO₂ por uma árvore</div>
        <div class="equivalent-item">🚗 ${carDays} dias de emissões de um carro médio</div>
        <div class="equivalent-item">🏠 ${householdDays} dias de emissões de uma casa</div>
        <div class="equivalent-item">📱 ${phoneCharges} carregamentos de smartphone</div>
    `;
}

// Display impact analysis
function displayImpactAnalysis(emissions, distance, transport) {
    const impactDiv = document.getElementById('impact');
    let impactLevel, impactClass, impactMessage;
    
    // Determine impact level based on emissions per km
    const emissionsPerKm = emissions / distance;
    
    if (emissionsPerKm < 0.1) {
        impactLevel = 'Baixo';
        impactClass = 'impact-low';
        impactMessage = 'Parabéns! Você escolheu um meio de transporte com baixo impacto ambiental.';
    } else if (emissionsPerKm < 0.2) {
        impactLevel = 'Médio';
        impactClass = 'impact-medium';
        impactMessage = 'Seu transporte tem impacto moderado. Considere alternativas mais sustentáveis quando possível.';
    } else {
        impactLevel = 'Alto';
        impactClass = 'impact-high';
        impactMessage = 'Este meio de transporte tem alto impacto ambiental. Recomendamos alternativas mais sustentáveis.';
    }
    
    const transportNames = {
        'car': 'Carro (gasolina)',
        'car-diesel': 'Carro (diesel)',
        'bus': 'Ônibus',
        'plane': 'Avião',
        'train': 'Trem'
    };
    
    impactDiv.innerHTML = `
        <p><strong>Meio de Transporte:</strong> ${transportNames[transport]}</p>
        <p><strong>Distância:</strong> ${distance.toFixed(0)} km</p>
        <p><strong>Nível de Impacto:</strong> <span class="impact-level ${impactClass}">${impactLevel}</span></p>
        <p style="margin-top: 15px;">${impactMessage}</p>
    `;
}

// Display recommendations
function displayRecommendations(emissions, transport, distance) {
    const recommendationsDiv = document.getElementById('recommendations');
    const recommendations = [];
    
    // Calculate potential savings with different transport modes
    const currentEmissionFactor = emissionFactors[transport];
    
    // General recommendations
    if (transport === 'plane' && distance < 500) {
        recommendations.push('Para distâncias curtas, considere usar ônibus ou carro compartilhado em vez de avião.');
    }
    
    if (transport === 'car' || transport === 'car-diesel') {
        recommendations.push('Compartilhe o carro com outras pessoas para dividir as emissões de CO₂.');
        recommendations.push('Mantenha o veículo em boas condições e com pneus calibrados para maior eficiência.');
        recommendations.push('Dirija de forma suave, evitando acelerações e frenagens bruscas.');
    }
    
    // Compare with other transport modes
    Object.keys(emissionFactors).forEach(mode => {
        if (mode !== transport && emissionFactors[mode] < currentEmissionFactor) {
            const savings = ((currentEmissionFactor - emissionFactors[mode]) / currentEmissionFactor * 100).toFixed(0);
            const transportNames = {
                'car': 'carro (gasolina)',
                'car-diesel': 'carro (diesel)',
                'bus': 'ônibus',
                'plane': 'avião',
                'train': 'trem'
            };
            recommendations.push(`Usar ${transportNames[mode]} reduziria suas emissões em ${savings}%.`);
        }
    });
    
    // Offset recommendations
    const treesToOffset = Math.ceil(emissions / 22);
    recommendations.push(`Plante ${treesToOffset} árvore(s) para compensar as emissões desta viagem ao longo de um ano.`);
    
    recommendations.push('Considere comprar créditos de carbono para compensar suas emissões.');
    
    recommendationsDiv.innerHTML = recommendations
        .map(rec => `<div class="recommendation-item">${rec}</div>`)
        .join('');
}
