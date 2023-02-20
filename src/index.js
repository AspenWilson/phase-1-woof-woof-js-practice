const dogDiv = document.querySelector('#dog-bar')
const dogInfoBucket = document.querySelector('#dog-summary-container')
const dogFilter= document.querySelector('#good-dog-filter')


function fetchDogs () {
    return fetch(`http://localhost:3000/pups`)
    .then (resp => resp.json())
    .then(json => getDoggos(json))
}


function getDoggos (pups) {
    pups.forEach(pup => {
        const dogSpan = document.createElement('span')
        dogSpan.innerText = `${pup.name}`
        dogSpan.className= `${pup.isGoodDog}`
        dogDiv.appendChild(dogSpan)
        const dogInfoDiv = document.createElement('div')
        const dogPic = document.createElement('img')
        const dogInfoName = document.createElement('h2')
        const dogBtn= document.createElement('button')
        dogSpan.addEventListener('click', () => {
            dogInfoDiv.id = 'dog-info'
            dogPic.src = `${pup.image}`
            dogInfoName.innerHTML= `${pup.name}`
                if(pup.isGoodDog===true) {
                    dogBtn.innerHTML = 'Good Dog!';
                } else (dogBtn.innerHTML = 'Bad Dog!')
                dogInfoBucket.appendChild(dogInfoDiv)
                dogInfoDiv.appendChild(dogPic)
                dogInfoDiv.appendChild(dogInfoName)
                dogInfoDiv.appendChild(dogBtn)
            })
            dogInfoDiv.innerText=''
            dogBtn.addEventListener('click', (e) => {
                e.preventDefault()
                // console.log(pup.isGoodDog)
                // const newDogStatus = pup.isGoodDog
                if(dogBtn.innerHTML==='Good Dog!'){
                    dogBtn.innerHTML = 'Bad Dog!';
                    pup.isGoodDog=false
                } else if (dogBtn.innerHTML === 'Bad Dog!'){
                    dogBtn.innerHTML= 'Good Dog!';
                    pup.isGoodDog = true}
                    console.log(pup.isGoodDog)
                fetch (`http://localhost:3000/pups/${pup.id}`, {
                    method: 'PATCH',
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: pup.isGoodDog
                    })
                })
                    .then(resp=> resp.json())
                    .then(json=>json)
            })
            })
        }


const goodDogs = document.getElementsByClassName('true')
const badDogs = document.getElementsByClassName('false')

function userClick (e) {
    // e.preventDefault()
    if (e.target.innerText === 'Filter good dogs: OFF') {
        e.target.innerText = 'Filter good dogs: ON'
    } else (e.target.innerText = 'Filter good dogs: OFF') 
    
}

dogFilter.addEventListener('click', userClick)
fetchDogs() 


