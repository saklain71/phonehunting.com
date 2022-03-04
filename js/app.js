
//error text
document.getElementById('error-message').style.display = 'none';
// seach Field 
const loadSearchText = () =>{
    const searchBox = document.getElementById('input-field');
    const searchText = searchBox.value;
 
    searchBox.value = '';
    //clear data
    if(searchText == '' ){
      document.getElementById('error-message').style.display = 'block';
    }   
    else{
          // seach field Dinamic APi fetch
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
            fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.data))  
        }
         
}
 
// display phone function call
const displayData = phones =>{
  if(phones.length == 0 ){
   document.getElementById('error-message').style.display = 'block';
  }

    const div = document.getElementById('phone-list');
    div.innerHTML = '';
    document.getElementById('phone-Details').innerHTML = '';
   const phone = phones.slice(0,20);
phone.forEach(phone => {

   div.classList.add('col');
   const phonesDiv = document.createElement('div');
    phonesDiv.innerHTML =`
   <div class="card h-100">
   <img class="w-50 mx-auto mt-2" src="${phone.image}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-text">${phone.brand}</h5>
     <p class="card-text">${phone.phone_name}</p>
     <button class="bg-primary rounded" onclick="phoneDetails('${phone.slug}')" >Details</button>  
   </div>
  
   `;
   div.appendChild(phonesDiv);
   
})
}
// fetch phone details
const phoneDetails = (id) => {
const url = `https://openapi.programming-hero.com/api/phone/${id}`;
fetch(url)
.then(res => res.json())
.then(data => displayphoneDetails(data.data));
}

// phone details function call
const  displayphoneDetails = (phoneDetail) =>{
    
    // if(phoneDetail.releaseDate == ''){
    //   phoneDetail.releaseDate = 'There is no release Data';
    // }
    const sensors = phoneDetail.mainFeatures.sensors;
    let sensorsValue= [];
    sensors.map(data =>{
      sensorsValue.push(data);
    })


  
    const phoneDetailShow = document.getElementById('phone-Details');
    phoneDetailShow.innerHTML = `
    <div class="card h-100 mx-auto">
    <img class="w-25 mx-auto mt-2" src="${phoneDetail.image}" class="card-img-top" alt="...">
      <div class="card-body text-center">
      <hr>
      <p class="card-text"> <b>ChipSet</b>: ${phoneDetail.mainFeatures.chipSet}</p>
      <p class="card-text"> <b>DisplaySize:</b> ${phoneDetail.mainFeatures.displaySize}</p>
      <p class="card-text"> <b>Memory:</b> ${phoneDetail.mainFeatures.memory}</p>
      <p class="card-text"> <b>Storage:</b>${phoneDetail.mainFeatures.storage}</p>
      <p class="card-text"> <b>Sensor:</b> ${sensorsValue}</p>
      <p class="card-text"> <b>Others:</b><br>
      <span class="text-decoration-underline">Bluetooth</span>: ${phoneDetail?.others?.Bluetooth? phoneDetail?.others?.Bluetooth:"There is no data"}<br>
      <span class="text-decoration-underline">GPS</span>:${phoneDetail?.others?.GPS? phoneDetail?.others?.GPS:"There is no data"}<br>
      <span class="text-decoration-underline">NFC</span>:${phoneDetail?.others?.NFC? phoneDetail?.others?.NFC:"There is no data"}<br>
      <span class="text-decoration-underline">Radio</span>: ${phoneDetail?.others?.Radio? phoneDetail?.others?.Radio:"There is no data"}<br>
      <span class="text-decoration-underline">USB</span>:${phoneDetail?.others?.USB? phoneDetail?.others?.USB:"There is no data"}<br>
      <span class="text-decoration-underline">WLAN</span>:${phoneDetail?.others?.WLAN? phoneDetail?.others?.WLAN:"There is no data"}
      </p>
      <p class="card-text"> <b>ReleaseDate:</b> ${phoneDetail.releaseDate || 'There is no data'}</p>
      <hr>
      </div>
    </div>
    `;
}

