# Crypto Viewer

A Next.js application that allows users to view cryptocurrency price trends, current prices, and other relevant information using the CoinCap API. The app includes interactive charts, a table of popular cryptocurrencies, customizable time periods for price history and a table of popular cryptocurrencies exchange markets.

Live demo: [https://crypto-viewer-phi-three.vercel.app/](https://crypto-viewer-phi-three.vercel.app/)

---

## Features

- **Price Trends**: View historical price trends for any cryptocurrency using interactive charts.
- **Time Period Selection**: Choose from predefined time periods (1 day, 1 week, 1 month, 3 months, 6 months, 1 year) to visualize price changes.
- **Cryptocurrency Details**: Display current price, market cap, volume, and other key metrics.
- **Responsive Design**: Built with Tailwind CSS for a clean and responsive UI.
- **Data Visualization**: Powered by Chart.js for interactive and customizable charts.

---

## Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [HeroUI](https://www.heroui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **API**: [CoinCap API 2.0](https://docs.coincap.io/)
- **State Management**: [React Query](https://tanstack.com/query/v5)
- **Environment Variables**: `.env.local`

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NabilS94/crypto-viewer.git
   cd crypto-viewer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

- Create a `.env.local` file in the root directory.

- Add the following environment variable:
  ```bash
  NEXT_PUBLIC_COINCAP_API_BASE_URL=https://rest.coincap.io
  COINCAP_API_KEY=YOUR_API_KEY
  ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open the app**:

   Visit http://localhost:3000 in your browser.
