// add dependencies
const warningDiv = document.getElementById('warning');




const row = document.getElementById('row')
const searchInput = document.getElementById('searchInput')

const loadPhone = async (searchText,limit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data,limit)

}

const displayPhones = (phones,limit)=>{

    // show all btn
    const showBtn= document.getElementById('showBtn')

    if (limit && phones.length>6) {
        phones = phones.slice(0,6) 
       
        showBtn.classList.remove('d-none')
    }else{
        showBtn.classList.add('d-none')
    }

   

//    display notfound msg
if (phones.length===0) {
    warningDiv.classList.remove('d-none')
}else{
    warningDiv.classList.add('d-none')  
}

   
    phones.forEach(phone => {
       
        const{brand,phone_name,image,slug}=phone

        const div = document.createElement('div');
        div.classList.add('col-lg-4')

        div.innerHTML = `
        <div class="card">
        <img src="${image}" class="card-img-top" alt="phones images">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text text-bold text-muted">${brand}</p>
         <button data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="loadPhoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        
        
        `
        row.appendChild(div)
        toggleSpinner(false)

    });
}

// process search
const processSearch= (dataLimit)=>{
    toggleSpinner(true)
    row.innerHTML=''
   const searchText = searchInput.value
   
   loadPhone(searchText,dataLimit)
}

// btn click event

document.getElementById('searchBtn').addEventListener('click',()=>{processSearch()})


searchInput.addEventListener('keypress',(e)=>{

    if(e.key === "Enter"){
        processSearch(6)
    }
   
})


// loadewr

const toggleSpinner = (isLoading)=>{
    const spinner = document.getElementById('spinner');
    if (isLoading) {
       spinner.classList.remove('d-none') 
    }else{
        spinner.classList.add('d-none')  
    }
}

// display Phone details

const displayPhoneDetails = phoneDetails =>{

const { releaseDate,mainFeatures,others,name,image} = phoneDetails
const {storage,chipSet,displaySize,memory}= mainFeatures
const {Bluetooth,GPS,USB,NFC,Radio,WLAN}= others



// create a dynamic modal

const detailsModal = document.getElementById('exampleModal');
detailsModal.innerHTML = ''
const modal = document.createElement('div')
modal.classList.add('modal-fullscreen')


modal.innerHTML = `
<div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-auto">
        <div class="col-lg-6 hidden ">
       <div> <img  src="${image}" class="img-fluid" alt="phones images"></div>
        <div>
        <h5>Release Date : ${releaseDate}</h5>
        <p class="text-muted text-bold">Storage : ${storage}</p>
        <p class="text-muted text-bold">Memory : ${memory}</p>
        <p class="text-muted text-bold">Chipset : ${chipSet}</p>
        <p class="text-muted text-bold">display : ${displaySize}</p>
        <p class="text-muted text-bold">Bluetooth : ${Bluetooth}</p>
        <p class="text-muted text-bold">GPS : ${GPS}</p>
        <p class="text-muted text-bold">Radio : ${Radio}</p>
        <p class="text-muted text-bold">WLAN : ${WLAN}</p>
        <p class="text-muted text-bold">NFC : ${NFC}</p>
        </div>
        
        </div>
       

         
        </div>
      
      </div>

`
detailsModal.appendChild(modal)



}



// load phone details

const loadPhoneDetails = async id=>{
const url = `https://openapi.programming-hero.com/api/phone/${id}`

const res = await fetch(url)
const data = await res.json()
displayPhoneDetails(data.data)
}


// show all btn click load all data

document.getElementById('show-btn').addEventListener('click',()=>{
    processSearch()
})

loadPhone('samsung')