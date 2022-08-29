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
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text text-bold text-muted">${brand}</p>
         
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




searchInput.addEventListener('input',()=>{
    processSearch(6)
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

// show all btn click load all data

document.getElementById('show-btn').addEventListener('click',()=>{
    processSearch()
})