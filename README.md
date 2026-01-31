# 🌍 Carbon Calculator - Brazil

A small, browser-based CO₂ emissions calculator for trips in Brazil. It lets you pick origin/destination (Brazilian state capitals), auto-fills the distance, and estimates total CO₂ emissions based on the chosen transport mode. It also shows environmental equivalents and a simple impact analysis with recommendations.

## 🌐 Live Demo

**Access the application here:** [https://fsales.github.io/carbon-calculator/](https://fsales.github.io/carbon-calculator/)

The application is automatically deployed to GitHub Pages from the main branch.

## 📚 Features

- **Select origin and destination** from all 27 Brazilian state capitals
- **Auto-calculates distance** with road-distance approximation (1.3× straight-line distance)
- **Specific route overrides** for common routes with actual road distances
- **Transport-mode emission factors** (g/km) driven by a single configuration file:
  - 🚗 Car: 192 g/km
  - 🚌 Bus: 68 g/km
  - ✈️ Plane: 255 g/km
  - 🏍️ Motorcycle: 103 g/km
  - 🚆 Train: 41 g/km
- **Calculates total CO₂ emissions** with support for:
  - Round trip option
  - Monthly frequency (1-30 trips/month)
- **Shows environmental equivalents**:
  - Trees needed per year to absorb emissions
  - Smartphone charges equivalent
  - kWh of energy equivalent
  - Average car km equivalent
- **Impact analysis** (Low/Medium/High) with tailored recommendations

## 🚀 Built With

- **HTML5** - Semantic markup
- **CSS3** - Responsive layout with CSS Grid and Flexbox
- **CSS Variables** - Design tokens for consistent theming
- **Vanilla JavaScript** - ES Modules for clean code organization
- **No dependencies** - Pure vanilla implementation

## 🛠️ Project Setup

This is a static project (no build step required).

### Option A — Open directly

1. Clone the repository:
   ```bash
   git clone https://github.com/fsales/carbon-calculator.git
   cd carbon-calculator
   ```

2. Open `index.html` in your browser.

### Option B — Run with a local server (recommended)

1. Clone the repository (as above)

2. Use any local server:
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server
   ```
   
   **Using VS Code:**
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

3. Open the provided local URL in your browser (typically `http://localhost:8000`)

## 📁 Project Structure

```
carbon-calculator/
├── index.html        # Main HTML page
├── styles.css        # CSS styles with design tokens
├── app.js           # Main application module
├── calculator.js    # Core calculation logic
├── config.js        # Configuration (capitals, emission factors, routes)
├── .gitignore       # Git ignore file
└── README.md        # This file
```

## 🧮 How It Works

1. **Distance Calculation:**
   - Uses Haversine formula to calculate straight-line distance between capitals
   - Applies 1.3× multiplier for road distance approximation
   - Uses specific route overrides for common routes (e.g., São Paulo - Rio de Janeiro)

2. **Emission Calculation:**
   - Emissions (g) = Distance × Emission Factor × Trip Multiplier × Monthly Frequency
   - Trip Multiplier = 2 for round trip, 1 for one-way
   - Result converted from grams to kilograms

3. **Environmental Equivalents:**
   - Trees: Based on ~50 kg CO₂ absorbed per tree per year
   - Smartphone charges: Based on ~8.2 Wh per charge
   - kWh: Using Brazilian energy mix (~0.46 kg CO₂/kWh)
   - Car km: Using average car emissions (192 g/km)

4. **Impact Analysis:**
   - **Low Impact** (< 50 kg CO₂): Green badge with positive reinforcement
   - **Medium Impact** (50-200 kg CO₂): Orange badge with suggestions
   - **High Impact** (> 200 kg CO₂): Red badge with strong recommendations

## 🌱 Example Calculations

**Example 1: São Paulo to Rio de Janeiro by car (round trip)**
- Distance: 430 km (actual road distance)
- Emissions: 430 km × 192 g/km × 2 = 165.12 kg CO₂
- Impact: Medium

**Example 2: São Paulo to Brasília by plane (one-way)**
- Distance: ~1,015 km
- Emissions: 1,015 km × 255 g/km = 258.83 kg CO₂
- Impact: High

## 🎨 Design

The application uses CSS variables for a consistent design system:
- **Color palette**: Green tones representing environmental consciousness
- **Responsive layout**: Works on desktop, tablet, and mobile devices
- **Smooth animations**: Fade-in effects for results display
- **Accessible**: Semantic HTML and proper contrast ratios

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.