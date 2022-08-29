// add dependencies

const row = document.getElementById('row')
const searchInput = document.getElementById('searchInput')

const loadPhone = async (searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)

}

const displayPhones = (phones)=>{
   
    phones.forEach(phone => {
       
        const{brand,phone_name,image,slug}=phone

        const div = document.createElement('div');
        div.classList.add('col')

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

    });
}

searchInput.addEventListener('input',()=>{
    row.innerHTML=''
   const searchText = searchInput.value

   loadPhone(searchText)
})

