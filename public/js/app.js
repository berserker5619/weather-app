const addressForm=document.querySelector('form')
const search=document.querySelector('input')

const err=document.querySelector('#error')
const loc=document.querySelector('#location')
const weather=document.querySelector('#weather')
const temp=document.querySelector('#temperature')

let div=document.getElementById("weather_report")

err.textContent=""
loc.textContent=""
weather.textContent=""
temp.textContent=""
div.style.display='none'

addressForm.addEventListener('submit',(e)=>{
    e.preventDefault()//prevents refresh of form
    const location=search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then(response=>{
    response.json().then(data=>{
        if(data.error){
            err.textContent=data.error
        }
        else{
            loc.textContent=data.place_name
            weather.textContent=data.weather_descriptions
            temp.textContent=data.temperature+" F"
            div.style.display='block'
        }
    })
})
})
