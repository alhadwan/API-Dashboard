# API Dashboard

A web app that brings together different APIs to offer useful services like weather updates, entertainment, financial info, and more.

## Features

- **Weather** Information: Get real-time weather data for any city worldwide
- **Dog & Cat Images**: Fetch random adorable pet photos
- **Programming Jokes**: Display random programming-related jokes
- **GitHub User Profiles**: Search and display GitHub user information
- **Movie Search**: Search for movies with detailed information and posters
- **Currency Converter**: Convert between different currencies with live exchange rates
- **News Headlines**: Get latest news from various categories
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5, Custom CSS
- **API Communication**: Fetch API with async/await
- **Responsive** Design: CSS Grid & Flexbox
- **Error Handling**: Try-catch blocks with user-friendly error messages

## Usage

Weather Information

1. Enter a city name in the weather input field
2. Click "Get Weather" to fetch current weather data
3. View location, temperature, wind speed, and direction

Movie Search

1. Enter a movie title in the movies input field
2. Click "Get Movies" to search the movie database
3. Browse through movie posters, titles, and descriptions

Currency Conversion

1. Select base and target currencies from dropdowns
2. Enter the amount to convert
3. Click "Get Currency" to see conversion rate and result

GitHub User Search

1. Enter a GitHub username
2. Click "Get GitHub User" to fetch profile information
3. View user's bio and profile link

## API Endpoints

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather**: `https://api.open-meteo.com/v1/forecast`
- **Dogs**: `https://dog.ceo/api/breeds/image/random`
- **Cats**: `https://api.thecatapi.com/v1/images/search`
- **Jokes**: `https://sv443.net/jokeapi/v2/joke/any`
- **GitHub**: `https://api.github.com/users/{username}`
- **Movies**: `https://api.themoviedb.org/3/search/movie`
- **Currency**: `https://v6.exchangerate-api.com/v6/{api-key}/pair/{from}/{to}/{amount}`
- **News**: `https://api.nytimes.com/svc/topstories/v2/{category}.json`

### For Development (Frontend Only)

API keys are included in the code for quick testing. **Note**: This is not secure for production.
