//most of functionally was done by me, used the web to fix errors here and there
document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".button").addEventListener("click", clickFunction)
});

function clickFunction() {
    const countryName = document.getElementById("theCountry").value.trim();
    if (!countryName) {
        alert("Please enter a country name.");
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((r) => r.json())
        .then((country) => {
            if (country.status === 404) {
                alert("Country not found.");
                return;
            }
            handleCountry(country[0]);
        })
        .catch((error) => {
            console.error("Error fetching country data:", error);
        });
}

const handleCountry = (countryDetails) => {
    document.getElementById("capital").innerText = `Capital: ${countryDetails.capital}`;
    document.getElementById("population").innerText = `Population: ${countryDetails.population}`;
    document.getElementById("region").innerText = `Region: ${countryDetails.region}`;
    document.getElementById("label").innerText = `Flag:`;
    document.getElementById("img").src = countryDetails.flags.png;
    document.getElementById("bordering-countries").innerText = `Bordering Countries: ${countryDetails.borders}`;


    const bordersContainer = document.getElementById("bordering-countries");
    bordersContainer.innerHTML = "Bordering Countries: ";
    
    if (!countryDetails.borders || countryDetails.borders.length === 0) {
        bordersContainer.innerText += "None";
        return;
    }

    // Fetch details of each bordering country
    countryDetails.borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(r => r.json())
            .then(borderCountry => {
                const borderName = borderCountry[0].name.common;
                const borderFlag = borderCountry[0].flags.png;
                
                const borderDiv = document.createElement("div");
                const par = document.createElement("p");
                par.textContent = borderName
                const image = document.createElement("img");
                image.src = borderFlag

                borderDiv.appendChild(image);
                borderDiv.appendChild(par);
                bordersContainer.appendChild(borderDiv);
            })
            .catch(error => console.error(`Error fetching border country ${border}:`, error));
    });

};

window.clickFunction = clickFunction;
