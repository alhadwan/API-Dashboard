// getting all div from the HTML and assigning them to variables
const dogImageContainer = document.getElementById("dogImageSection");
const catImageContainer = document.getElementById("catImageSection");
const weatherContainer = document.getElementById("weatherSection");
const jokeContainer = document.getElementById("jokeSection");
const moviesContainer = document.getElementById("moviesSection");
const currencyContainer = document.getElementById("currencySection");
const publicApiContainer = document.getElementById("publicApiSection");
const githubUserContainer = document.getElementById("githubUserSection");

// getting all buttons from the HTML and assigning them to variables
const getDogImageBtn = document.getElementById("getDogImageBtn");
const getCatImageBtn = document.getElementById("getCatImageBtn");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const getJokeBtn = document.getElementById("getJokeBtn");
const getMoviesBtn = document.getElementById("getMoviesBtn");
const getCurrencyBtn = document.getElementById("getCurrencyBtn");
const getNewsBtn = document.getElementById("getNewsBtn");
const getGithubUserBtn = document.getElementById("getGithubUserBtn");

const dogImage = document.getElementById("dogImage");
const catImage = document.getElementById("catImage");

// function with url, container and button, type parameters to fetch API dynamically
async function getApi(url, container, type, city) {
  try {
    // Clear previous content
    container.innerHTML = "";

    // Handle weather separately since it needs special logic
    if (type === "weather") {
      const location = await getCoordinates(city);
      const weather = await getWeather(location.latitude, location.longitude);
      const weatherParagraph1 = document.createElement("p");
      weatherParagraph1.innerText = `Location: ${location.name}, ${location.country}`;
      container.appendChild(weatherParagraph1);
      const weatherParagraph2 = document.createElement("p");
      weatherParagraph2.innerText = `Temperature: ${weather.temperature}°C`;
      container.appendChild(weatherParagraph2);
      const weatherParagraph3 = document.createElement("p");
      weatherParagraph3.innerText = `Wind Speed: ${weather.windspeed} km/h`;
      container.appendChild(weatherParagraph3);
      const weatherParagraph4 = document.createElement("p");
      weatherParagraph4.innerText = `Wind Direction: ${weather.winddirection}°`;
      container.appendChild(weatherParagraph4);
      const weatherParagraph5 = document.createElement("p");
      weatherParagraph5.innerText = `Time: ${weather.time}`;
      container.appendChild(weatherParagraph5);
      return; //exits the function completely, goes back to the event listener
    }
    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // use conditional rendering based on the type of API
    if (type === "dog") {
      const dogImage = document.createElement("img");
      dogImage.src = data.message;
      dogImage.alt = "Random Dog";
      dogImage.style.maxWidth = "100%";
      container.appendChild(dogImage);
    } else if (type === "cat") {
      const catImage = document.createElement("img");
      catImage.src = data[0].url;
      catImage.alt = "Random Cat";
      catImage.style.maxWidth = "100%";
      container.appendChild(catImage);
    } else if (type === "joke") {
      const jokeHeader = document.createElement("h5");
      jokeHeader.innerText = data.category || "Random Joke";
      container.appendChild(jokeHeader);
      const jokeParagraph = document.createElement("p");
      jokeParagraph.innerText = data.joke || `${data.setup} - ${data.delivery}`;
      container.appendChild(jokeParagraph);
    } else if (type === "github") {
      const githubImage = document.createElement("img");
      githubImage.src = data.avatar_url;
      githubImage.alt = "GitHub User Avatar";
      container.appendChild(githubImage);
      const githubHeader = document.createElement("h5");
      githubHeader.innerText = data.name;
      container.appendChild(githubHeader);
      const githubParagraph = document.createElement("p");
      githubParagraph.innerText = `${data.bio}`;
      container.appendChild(githubParagraph);
      const githubParagraphLink = document.createElement("p");
      githubParagraphLink.innerHTML = `<a href="${data.html_url}" target="_blank">View Profile</a>`;
      container.appendChild(githubParagraphLink);
    } else if (type === "movies") {
      data.results.forEach((movie) => {
        container.innerHTML += `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} poster" style="margin-top:15px;">`;
        const movieTitle = document.createElement("h5");
        movieTitle.innerText = `${movie.title}- ${movie.popularity}%`;
        container.appendChild(movieTitle);
        const movieOverview = document.createElement("div");
        movieOverview.innerHTML = movie.overview;
        container.appendChild(movieOverview);
        const movieDetails = document.createElement("div");
        movieDetails.innerHTML = `<a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">View Details</a>`;
        container.appendChild(movieDetails);
      });
    } else if (type === "currency") {
      const rate = document.createElement("p");
      rate.innerText = `Conversion Rate: ${data.conversion_rate}`;
      container.appendChild(rate);
      const result = document.createElement("p");
      result.innerText = `Converted Amount: ${data.conversion_result}`;
      container.appendChild(result);
    } else if (type === "news") {
      data.results.forEach((article) => {
        const articleDiv = document.createElement("p");
        articleDiv.innerHTML = `
          <h5>${article.title}</h5>
          <p>${article.abstract}</p>
          <a href="${article.url}" target="_blank">Read more</a>`;
        container.appendChild(articleDiv);
      });
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading data</p>";
  }
}

// helper functions to get coordinates and weather data
async function getCoordinates(city) {
  const result = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await result.json();
  // Check if results are available
  if (data.results && data.results.length > 0) {
    const { latitude, longitude, name, country } = data.results[0];
    return { latitude, longitude, name, country };
  } else {
    throw new Error("City not found.");
  }
}
async function getWeather(lat, lon) {
  const result = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const data = await result.json();
  return data.current_weather;
}

// Adding event listeners to buttons to fetch data from respective APIs

getWeatherBtn.addEventListener("click", () => {
  if (!document.getElementById("cityInput").value) {
    weatherContainer.innerHTML =
      "<p style='color: red;'>Please enter a city name.</p>";
    return;
  }
  const city = document.getElementById("cityInput").value;
  getApi(null, weatherContainer, "weather", city);
});

getMoviesBtn.addEventListener("click", () => {
  if (!document.getElementById("movieInput").value) {
    moviesContainer.innerHTML =
      "<p style='color: red;'>Please enter a movie name.</p>";
    return;
  }
  const apiKey = "8f4dd870082a66405ff9dfb621892315";
  const movieName = document.getElementById("movieInput").value;
  getApi(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`,
    moviesContainer,
    "movies"
  );
});

getDogImageBtn.addEventListener("click", () => {
  getApi("https://dog.ceo/api/breeds/image/random", dogImageContainer, "dog");
});

getCatImageBtn.addEventListener("click", () => {
  getApi(
    "https://api.thecatapi.com/v1/images/search",
    catImageContainer,
    "cat"
  );
});

getJokeBtn.addEventListener("click", () => {
  getApi("https://sv443.net/jokeapi/v2/joke/any", jokeContainer, "joke");
});

getGithubUserBtn.addEventListener("click", () => {
  if (!document.getElementById("userInput").value) {
    githubUserContainer.innerHTML =
      "<p style='color: red;'>Please enter a GitHub username.</p>";
    return;
  }
  const username = document.getElementById("userInput").value;

  getApi(
    `https://api.github.com/users/${username}`,
    githubUserContainer,
    "github"
  );
});

getCurrencyBtn.addEventListener("click", () => {
  if (!document.getElementById("currencyInput").value) {
    currencyContainer.innerHTML =
      "<p style='color: red;'>Please enter an amount to convert.</p>";
    return;
  }
  const apiKey = "d3dd86d9bb754d3d68ef7957";
  const currencyInput = document.getElementById("currencyInput").value;
  const baseCurrency = document.getElementById("baseCurrency").value;
  const targetCurrency = document.getElementById("targetCurrency").value;
  getApi(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}/${currencyInput}`,
    currencyContainer,
    "currency"
  );
});

getNewsBtn.addEventListener("click", () => {
  const apiKey = "4tXpXPucbO3lyjg3ecB60jaHgUAkgFoR";
  const newsCategory = document.getElementById("newsCategory").value;
  getApi(
    `https://api.nytimes.com/svc/topstories/v2/${encodeURIComponent(newsCategory)}.json?api-key=${apiKey}`,
    publicApiContainer,
    "news"
  );
});
