const locationInput = document.getElementById("loc");
const submitBtn = document.querySelector("button");
const container = document.querySelector(".content");

async function getApi(loc) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=33VFFJQ6M9UVJ677C3V2KZSRY&contentType=json`,
    { mode: "cors" }
  );

  const weatherData = await response.json();

  return weatherData;
}

async function getInfo(location) {
  const data = await getApi(location);

  //console.log(data.days);

  for (let i = 0; i < 7; i++) {
    console.log(data.days);

    const addonScreen = document.createElement("div");
    addonScreen.classList = "weatherGrid";
    addonScreen.setAttribute("id", `day${i + 1}`);
    addonScreen.innerHTML = ` <h1>${data.days[i].datetime}</h1> <h2>${data.days[i].conditions}</h2> <img src = "icons/${data.days[i].icon}.svg"> <br> Temp is ${data.days[i].temp}&degC <br> Max: ${data.days[i].tempmax} <br> Min: ${data.days[i].tempmin}&degC <br> Humidity: ${data.days[i].humidity}% <br> Description: ${data.days[i].description} `;
    container.appendChild(addonScreen);
  }
}

submitBtn.addEventListener("click", () => {
  container.innerHTML = "";
  getInfo(locationInput.value);
});
