import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // console.log(search);

  const newID = new URLSearchParams(search);
  let ans = newID.get("adventure");
  // console.log(ans)
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  return ans;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // console.log(adventureId);
  try{
  let data = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  // console.log(data);
  let ans = await data.json()
  // console.log(ans);
  // 1. Fetch the details of the adventure by making an API call


  // Place holder for functionality to work in the Stubs
  return ans;
  }
  catch(err)
  {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // console.log(adventure);
  // let mainDiv = document.createElement("div");
  // mainDiv.class = "conatiner";


  // let name = document.createElement("div");
  // name.id = "name";

 

  // let h1 = document.createElement("h1");
  // h1.innerText = adventure.name;

  // name.appendChild(h1);

  // let subtitle = document.createElement("div");
  // subtitle.id = "subtitle";
  // subtitle.innerHTML = adventure.subtitle;

  // let image = document.createElement("div");
  // image.setAttribute("id","images");
  // image.setAttribute("class","container");
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  for (let i=0;i<adventure.images.length;i++)
  {
    let div = document.createElement("div");
    // div.setAttribute("class", "activity-card-image");
    let img = document.createElement("img");
    img.setAttribute("class","activity-card-image")
    img.src = adventure.images[i];
    
    div.append(img);

    document.getElementById("photo-gallery").appendChild(div);

    // image.appendChild(img);
  }

  document.getElementById("adventure-content").innerHTML = adventure.content;
  // image.setAttribute("class", "activity-card-image");
  // image.href = adventure.images;

  // let content = document.createElement("div");
  // content.setAttribute("id","content");
  
  // let p = document.createElement("p");
  // p.innerHTML = adventure.content;

  // content.appendChild(p);

  // mainDiv.append(name, subtitle, image);


  // document.getElementById("photo-gallery").appendChild(mainDiv);
  // document.getElementById("adventure-content").appendChild(content);
  // 1. Add the details of the adventure to the HTML DOM

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // console.log(images);
  document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  ${images.map((image, index) => `
  <div class="carousel-item ${index === 0 ? 'active' : ''}">
    <img src="${image}" class="d-block w-100 activity-card-image" alt="Image ${index + 1}">
  </div>
`)}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  // document.getElementById("photo-gallery").data-bs-ride = "carousel";
  // 1. Add the bootstrap carousel to show the Adventure images

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // console.log(adventure);

  // document.getElementsByClassName("reserve-button")

  if(adventure.available==true)
  {
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";
  }
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  if(adventure.available==true)
  {
    document.getElementById("reservation-cost").innerHTML = persons*(adventure.costPerHead);
  }
  
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS


const ele = document.getElementById("myForm");
ele.addEventListener("submit", async (e) => {
  e.preventDefault();
  const obj = {
    name :ele.elements["name"].value,
    date :ele.elements["date"].value,
    person:ele.elements["person"].value,
    adventure:adventure.id
  };
  try {
      
      
      const res = await fetch(`${config.backendEndpoint}/reservations/new` , {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(obj)
       });
      //  const data = await response.json();
    // enter you logic when the fetch is successful
      //  console.log(data);

       if(res.ok)
       {
        alert("Succes!");
       }
       else
       {
        alert("Failed!");
       }
     } catch(error) {
   // enter your logic for when there is an error (ex. error toast)

        console.log(error)
       } 
  });

  // asyncPostCall()



  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // console.log(adventure);
  if(adventure.reserved==true)
  {
    document.getElementById("reserved-banner").style.display="block";
  }
  else
  {
    document.getElementById("reserved-banner").style.display="none";
  }

  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
