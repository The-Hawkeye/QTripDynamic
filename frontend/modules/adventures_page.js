

import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // let ans = search.split("=");
  // let size = ans.size;
  // console.log(ans[1]);
  // return ans[1];

  const params = new URLSearchParams(search);

let ans = params.get('city');
// console.log(ans);
return ans;

  // 1. Extract the city id from the URL's Query Param and return it

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
// let getCity =getCityFromURL(search);
try{
  let apiData = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  let data  = await apiData.json();
  // console.log(data);
  return data;
} catch(err)
{
  return null;
}

  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  adventures.forEach(element => {
      let container = document.createElement("div");
      container.setAttribute("class", "col-12 col-sm-6 col-lg-3 position-relative mb-4");

      let link = document.createElement("a");
      link.setAttribute("href",`detail/?adventure=${element.id}`);
      link.setAttribute("id", element.id);

      let actContainer = document.createElement("div");
      actContainer.setAttribute("class", "activity-card");

      
      // let imgContainer = document.createElement("div");
      // imgContainer.setAttribute("class", "activity-card img");

      let img = document.createElement("img");
      img .setAttribute("src", element.image);
      img.setAttribute("class","activity-card-image");

      let banner = document.createElement("div");
      banner.setAttribute("class", "category-banner");
      banner.innerHTML = element.category;

      let text = document.createElement("div");
      text.setAttribute("class", "container d-flex flex-column");


      let row1 = document.createElement("div");
      row1.setAttribute("class", "d-flex flex-row justify-content-between");

      let col1 = document.createElement("div");
      col1.innerHTML=element.name;

      let col2 = document.createElement("div");
      col2.innerHTML="₹"+element.costPerHead;

      let row2 = document.createElement("div");
      row2.setAttribute("class", "d-flex flex-row justify-content-between");

      let col21 = document.createElement("div");
      col21.innerText="Duration";

      let col22 = document.createElement("div");
      col22.innerHTML=element.duration + " Hours";

      row1.appendChild(col1);
      row1.appendChild(col2);

      row2.appendChild(col21);
      row2.appendChild(col22);

      text.appendChild(row1);
      text.appendChild(row2);

      // imgContainer.appendChild(img);
      // actContainer.appendChild(imgContainer);
      actContainer.appendChild(img);

      actContainer.append(text);
      link.append(actContainer);
      // actContainer.appendChild(banner);
      container.appendChild(link);
      container.appendChild(banner);
      // container.appendChild(text);
      // return container;



      document.getElementById("data").appendChild(container);
      


  });
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS 
  let ans = [];

  for(let i=0;i<list.length;i++)
  {
    if(list[i].duration>=low&&list[i].duration<=high)
    {
        ans.push(list[i]);
    }
  }
  // console.log(ans);
  return ans;
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  let ans = [];

  
  for(let i=0;i<list.length;i++)
  {
    for (let j=0;j<categoryList.length;j++)
    {
      if(list[i].category=== categoryList[j])
      {
          ans.push(list[i]);
      }

    }
    
  }
  // console.log(ans);
  return ans;
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS


  // console.log(filters);
  // console.log(list);
  let ans = list;
  if(filters.duration!=="" && filters.category.length > 0)
  {
    

    let catag = filters.duration.split("-");
    ans = filterByDuration(ans, catag[0], catag[1] );

    // console.log(ans);
    return ans;
  }
  else if(filters.duration!=="")
  {
      let catag = filters.duration.split("-");
      ans = filterByDuration(ans, catag[0], catag[1] );

      // console.log(ans);
      return ans;
  }
  else if(filters.category.length>0)
  {
    ans = filterByCategory(ans, filters.category);
  }
  else
  {     
    // console.log(ans);
        return ans;
  }

  // console.log(list);
  // list.forEach((element)=>{
  //   if(element.category)
  
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // console.log(filters);
  
  const myJSON = JSON.stringify(filters);
  window.localStorage.setItem("filters", myJSON);
  

  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS

  // 1. Get the filters from localStorage and return String read as an object
  let text = window.localStorage.getItem("filters");
  if(text){
   text = JSON.parse(text);
  // console.log(text);
  // return text;
  }

  // if(text===null)
  // return filters;
  // else
  return null;

  //
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS

  // console.log(filters);
  for(let i =0 ;i<filters.category.length;i++)
  {
    let newEle = document.createElement("p");
    newEle.setAttribute("class", "category-filter");
    newEle.innerText = filters.category[i];

    document.getElementById("category-list").append(newEle);
  }
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
