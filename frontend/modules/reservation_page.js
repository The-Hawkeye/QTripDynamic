import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  try{
    let data = await fetch(`${config.backendEndpoint}/reservations/`);
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(reservations);
  if(reservations.length==0)
  {
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  }
  else{
    
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";
  }


  for(let i=0;i<reservations.length;i++)
  {

  
  let newRow = document.createElement("tr");

  let tId = document.createElement("td");
  tId.innerHTML= reservations[i].id;

  let bName = document.createElement("td");
  bName.innerHTML = reservations[i].name

  let adv = document.createElement("td");
  adv.innerHTML = reservations[i].adventureName;

  let person = document.createElement("td");
  person.innerHTML = reservations[i].person;

  let date = document.createElement("td");
  // date.innerHTML = reservations[i].date;
    const d = new Date(reservations[i].date);
    let yyyy = d.getFullYear();
    let mm = d.getMonth()+1;
    let dd = d.getDate();
    let str = dd+"/"+mm+"/"+yyyy;
    

  date.textContent = str;

  let price = document.createElement("td");
  price.innerHTML = reservations[i].price;

  let bTime = document.createElement("td");
  let t= new Date(reservations[i].time);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let newTime = t.toLocaleDateString("en-IN",options);
  // console.log(newTime);
  // bTime.innerHTML = reservations[i].time;
  let tm =t.toLocaleTimeString('en-IN');
  bTime.innerHTML = newTime+", "+ tm;

    
  let action = document.createElement("td");
 
 
  let a = document.createElement("a");
  let button = document.createElement("button");

    button.setAttribute("class","reservation-visit-button");
    action.setAttribute("id" , `${reservations[i].id}`);
    button.innerHTML = "Visit Adventure";
    a.href = `../detail/?adventure=${reservations[i].adventure}`;
    a.append(button)
  action.appendChild(a);

  newRow.append(tId, bName, adv,person, date, price, bTime, action);
  document.getElementById("reservation-table").appendChild(newRow);
  }

  
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
