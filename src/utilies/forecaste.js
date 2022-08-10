import request from 'request'



const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4c019cfd8e17a6486239730a7b0d39ac&query='+latitude+','+longitude+''

    request({url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to wether app',undefined)
        }else if(response.body.error) {
            callback('unable to find the location',undefined)
        } 
        else{
            callback(undefined,response.body.current.temperature);
    }
    });
}

export default forecast