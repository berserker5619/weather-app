const addressForm=document.querySelector('form')
const search=document.querySelector('input')

const err=document.querySelector('#error')
const loc=document.querySelector('#location')
const weather=document.querySelector('#weather')
const temp=document.querySelector('#temperature')
const feelslike=document.querySelector('#feelslike')

let div=document.getElementById("weather_report")

div.style.display='none'

addressForm.addEventListener('submit',(e)=>{
    e.preventDefault()//prevents refresh of form
    const location=search.value
    // fetch(`http://localhost:3000/weather?address=${location}`).then(response=>{ //local
    fetch(`/weather?address=${location}`).then(response=>{ //heroku
    response.json().then(data=>{
        if(data.error){
            err.textContent=data.error
        }
        else{
            loc.textContent=data.place_name
            weather.textContent=data.weather_descriptions
            temp.textContent=data.temperature+" \xB0F"
            feelslike.textContent=data.feelslike+" \xB0F"
            div.style.display='block'
        }
    })
})
})
