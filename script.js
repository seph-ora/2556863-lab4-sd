fetch("https://restcountries.com/v3.1/name/deutschland")
.then((r) => r.json())
.then((country) => {
    console.log(country)
    handleCountries(country)
});

const handleCountry = (countryDetails) => {
document.querySelector("p").innerText = countryDetails.capital
document.querySelector("p").innerText = countryDetails.population
document.querySelector("p").innerText = countryDetails.region
document.querySelector("p").innerText = countryDetails.flag
}

function clickFunction() {
    document.getElementById("theCountry").innerHTML = "Hello World";
  }