import request from 'request'


const geocoding = (address,callback)=>{
    const urlapi = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoieW91c2lmMzAzMDMiLCJhIjoiY2tvcmFpMWJ0MGNsZDJ2b2gxam9nYTFwcCJ9.8aLBmk3jDffz39suvj3f_w'
    
    request({url:urlapi,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to geographic app',undefined)
        }else if(body.features.length == 0) {
            callback('unable to find the location',undefined)
        } 
        else{
            callback(undefined,
                {latitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 location:body.features[0].place_name
                }
                );
    }
    })
    }


    export default geocoding;