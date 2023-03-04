document.getElementById('show-more-btn').addEventListener('click',function(){
const showMoreBtn = document.getElementById('show-more-btn')
showMoreBtn.classList.add('d-none')
loadSpiner(true)
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools))

const displayData = allData => {
console.log(allData)

    const divRow = document.getElementById('div-row')
   
     allData = allData.slice(6,12)
    for (data of allData) {
        const div = document.createElement('div')
        
        div.innerHTML = `
        <div class="col">
                    <div class="card h-100">
                        <img class=" m-3 rounded img-fluid" src="${data.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <ol>
                            <li>${data.features[0]}</li>
                            <li>${data.features[1]}</li>
                            <li>${data.features[2] ? data.features[2] : 'not available'}</li>
                            </ol>
                        </div>
                        <div class="card-footer bg-white">
                            <section class = "d-flex justify-content-between mt-3 mb-3">
                            <div>
                            <h5>${data.name}</h5>
                            <i class="fa-regular fa-calendar-days"> ${data.published_in}</i>
                            </div>
                            <button  onclick = "showModalInfo('${data.id}')" type="button" class="btn rounded" data-bs-toggle="modal" data-bs-target="#modal-btn-clicked" >→</button>
                            </section>
                        </div>
                    </div>
                </div>`
        divRow.appendChild(div)
        
    }

    loadSpiner(false)
    
}

function showModalInfo(id) {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllModalInfo(data.data))

}
const displayAllModalInfo = modalInfo => {
    document.getElementById('modal-info-body').innerHTML = `
        <section class = "d-flex justify-content-evenly gap-3">
        <div class="card w-50"  >
             <div class="card-body bg-danger-subtle border border-danger rounded">
                 <h5 class="card-text">${modalInfo.description}</h5>
                        <section class = "d-lg-flex gap-2 ">
                           <div class = "fw-bold text-success rounded text-center w-50 p-3 rounded mb-3 mt-3 bg-light-subtle"><p>${modalInfo.pricing ? modalInfo.pricing[0].price : 'Free of Cost/'}</p> <p>${modalInfo.pricing ? modalInfo.pricing[0].plan : 'Basic'}</p></div>
                           <div class = "fw-bold text-warning rounded text-center w-50 p-3 rounded mb-3 mt-3 bg-light-subtle"><p>${modalInfo.pricing ? modalInfo.pricing[1].price : 'Free Of Cost/'}</p><p>${modalInfo.pricing ? modalInfo.pricing[1].plan : 'Pro'}</p></div>
                           <div class = "fw-bold text-danger rounded text-center w-50 p-3 rounded mb-3 mt-3 bg-light-subtle"><p>${modalInfo.pricing ? modalInfo.pricing[2].price : 'Free of Cost /'}</p> <p>${modalInfo.pricing ? modalInfo.pricing[2].plan : 'Enterprise'}</p></div>
                        </section>

                        <section class = "d-lg-flex gap-5">
                              <div>
                                    <h5>Features</h5>
                                    <ul>
                                           <li>${modalInfo.features[1] ? modalInfo.features[1].feature_name : 'not available'}</li>
                                           <li>${modalInfo.features[2] ? modalInfo.features[2].feature_name : 'not available'}</li>
                                           <li>${modalInfo.features[3] ? modalInfo.features[3].feature_name : 'not available'}</li>
                                           <li>${modalInfo.features[4] ? modalInfo.features[4].feature_name : 'not available'}</li>
                                    </ul>
                              </div>
                              <div>
                                     <h5>Integrations</h5>
                                     <ul>
                                            <li>${modalInfo.integrations ? modalInfo.integrations[0] : 'not available'} </li>
                                            <li>${modalInfo.integrations ? modalInfo.integrations[1] : 'not available'}</li>
                                            <li>${modalInfo.integrations ? modalInfo.integrations[2] : 'not available'}</li>
                                     </ul>
                              </div>
                        </section>
                  </div>
           </div>
<div class="card w-50" >
<div class="position-relative">
   <div class="position-absolute top-0 end-0 bg-danger text-white px-5">${modalInfo.accuracy.score === null ? modalInfo.accuracy.score = ' ' :modalInfo.accuracy.score }</div>
   </div>
<img src="${modalInfo.image_link[0]}" class="card-img-top" alt="...">
   
  <div class="card-body">
    <h6>${modalInfo.input_output_examples ? modalInfo.input_output_examples[0].input : 'Can you give an example?'}</h6>
    <p class="card-text">${modalInfo.input_output_examples ? modalInfo.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
  </div>
</div>
</section>`
console.log(modalInfo)
    
}


})

function loadSpiner(isloading){
    const loader = document.getElementById('loader')
    if(isloading){
       loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}