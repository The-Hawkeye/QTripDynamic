import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES

  try
  {let apiData = await fetch(config.backendEndpoint+"/cities")
  let data= apiData.json();
  return data;
}
catch(err){
  return null;
}
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOMlet newCard = document.createElement("div");
  

  let newCard = document.createElement("div");  
  newCard.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4 ");
  newCard.setAttribute("id" , id);

  let link = document.createElement("a");
  link.setAttribute("href", `pages/adventures/?city=${id}`);
    // newCard.setAttribute("")
    let newcol = document.createElement("div");
    newcol.setAttribute("class" , "tile d-flex align-items-center flex-column");

   

    
    

    let img = document.createElement("img");
    img.setAttribute("src", image);

   

    

    // let adCard = document.createElement("div");
    // adCard.setAttribute("class", "activity-card");

    let tileText = document.createElement("div");
    tileText.setAttribute("class", "tile-text");

    let h3 = document.createElement("h3");
    h3.innerHTML=city;

    let h5 = document.createElement("h5");
    h5.innerHTML = description;

    tileText.appendChild(h3);
    tileText.appendChild(h5);

    // adCard.appendChild(tileText);

    newcol.appendChild(img);
    newcol.appendChild(tileText);
    


    // newCard.appendChild(link);
    link.appendChild(newcol);
    newCard.appendChild(link);
    // link.appendChild(newCard);
    
    
    document.getElementById("data").appendChild(newCard);
    // document.getElementsByClassName("row").appendChild(newCard);

}

export { init, fetchCities, addCityToDOM };
