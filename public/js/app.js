

fetch('http://localhost:3000/wether?location=dubai').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data)
        }
    })
})
