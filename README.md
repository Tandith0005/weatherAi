# 🌤️ WeatherAI - AI-Powered Weather Intelligence Dashboard

## 🌎 Live Link
Check out the live demo: https://weather-ai-iota.vercel.app/

## 📋 Overview

WeatherAI is a modern, AI-powered weather intelligence platform that provides real-time weather data, predictive analytics, and intelligent insights. Built with Next.js 14, TypeScript, and Tailwind CSS, it offers a seamless experience for tracking weather conditions worldwide.

### ✨ Key Features

- **🌍 Real-time Weather Data** - Current conditions, hourly forecasts, and 7-day predictions
- **🤖 AI-Powered Insights** - Gemini-powered weather summaries and analysis
- **📍 Location Intelligence** - Automatic location detection with city search
- **📊 Advanced Analytics** - Interactive charts and data visualization
- **🌳 Tree Analysis** - AI-powered tree counting and health assessment from drone/aerial imagery
- **📈 Usage Dashboard** - Monitor API usage and plan limits
- **🎨 Beautiful UI** - Dark/Light mode with particle animations
- **📱 Fully Responsive** - Optimized for all devices

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety and better DX |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Recharts](https://recharts.org/) | Charting library for analytics |
| [React Hot Toast](https://react-hot-toast.com/) | Beautiful toast notifications |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [Next Themes](https://github.com/pacocoursey/next-themes) | Dark/Light mode support |
| [OGL](https://github.com/oframe/ogl) | WebGL for particle animations |

## 📦 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- WeatherAI API Key ([Get one here](https://weather-ai.co))

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Tandith0005/weatherAi.git
cd weather-ai
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```
### 3. Environment Variables
Create a **.env** file in the root directory:
```bash
# Required - WeatherAI API Configuration

NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key_here

NEXT_PUBLIC_BASE_URL=https://api.weather-ai.co/v1
```
### 4. Install Additional Packages
For particle animations and charts:
```bash
npm install ogl recharts next-themes react-hot-toast react-icons
```
### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

#### Open http://localhost:3000 to view the application.

## 🎨 Features Overview
### 🌤️ Weather Dashboard
- City search with autocomplete

- Automatic location detection

- Current weather with animated backgrounds

- Hourly and 7-day forecasts

- AI-generated weather summaries

### 📊 Weather Analytics
- Interactive temperature charts

- Precipitation analysis

- Wind pattern visualization

- Historical data trends

- Ai generated Summery

### 🌳 Tree Analysis
- Upload drone/aerial images

- AI-powered tree detection

- Health assessment (Healthy/Needs Care/Needs Replacement)

- Annotated overlay images

- Gemini-powered recommendations

### 📈 Usage Dashboard
- Real-time API usage tracking

- Plan management

- Usage progress indicators

- Quick tips and insights

##  🔑 API Integration
	
| Endpoint	| Method | Description |
|------------|---------| ----------- |
| /weather| GET | Fetch weather data (current, hourly, daily)
| /usage | GET | Get API usage statistics
| /tree-analyse | POST | Analyze tree imagery

## 🎯 Performance Optimizations
- Static Generation: Pre-rendered pages for faster load times

- Image Optimization: Next.js Image component for optimized images

- Code Splitting: Automatic code splitting for faster page loads

- Lazy Loading: Components loaded on demand

## Acknowledgments
- [WeatherAI](https://weather-ai.co) for the weather API

- [OpenStreetMap](https://nominatim.openstreetmap.org) for geocoding services

- Next.js for the amazing framework
