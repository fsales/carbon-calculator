# 🌍 Carbon Calculator - Calculadora de CO₂ Brasil

A small, browser-based CO₂ emissions calculator for trips in Brazil. Calculate carbon emissions for travel between Brazilian state capitals with automatic distance calculation and detailed environmental impact analysis.

## Features

- 🗺️ **Brazilian State Capitals**: Select from 31 major Brazilian cities
- 📏 **Automatic Distance Calculation**: Uses Haversine formula to calculate distance between cities
- 🚗 **Multiple Transport Modes**: 
  - Car (gasoline)
  - Car (diesel)
  - Bus
  - Plane
  - Train
- 📊 **CO₂ Emissions Calculation**: Based on real emission factors per transport mode
- 🌳 **Environmental Equivalents**: Compare emissions to trees, car usage, household emissions, and phone charges
- 💡 **Impact Analysis**: Get a clear understanding of your trip's environmental impact
- ♻️ **Personalized Recommendations**: Receive suggestions to reduce your carbon footprint

## How to Use

1. Open `index.html` in your web browser
2. Select your **origin** city from the dropdown
3. Select your **destination** city from the dropdown
4. The distance will be calculated automatically
5. Choose your **transport mode**
6. Enter the **number of passengers**
7. Click **"Calcular Emissões"** (Calculate Emissions)
8. View your results including:
   - Total CO₂ emissions
   - Environmental equivalents
   - Impact analysis
   - Recommendations to reduce emissions

## Technical Details

### Emission Factors (kg CO₂ per km per passenger)

- **Car (gasoline)**: 0.192 kg CO₂/km
- **Car (diesel)**: 0.171 kg CO₂/km
- **Bus**: 0.089 kg CO₂/km
- **Plane**: 0.255 kg CO₂/km
- **Train**: 0.041 kg CO₂/km

### Distance Calculation

The calculator uses the Haversine formula to calculate the great-circle distance between two points on Earth given their latitude and longitude coordinates.

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Core calculator logic and Brazilian cities data

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Educational Purpose

This calculator is designed for educational purposes. Emission factors are approximations and may vary based on specific vehicle models, fuel efficiency, passenger load, and other factors.

## License

MIT License - Feel free to use and modify as needed.