import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import forecaste from './utilies/forecaste.js'
import geocode from './utilies/geocode.js'


import hbs from 'hbs'

const app = express()


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const publicDirectortPath = path.join(__dirname,'../public');

const viewDirectortPath = path.join(__dirname,'../templates/views');
const partialsDirectortPath = path.join(__dirname,'../templates/partials');


app.use(express.static(publicDirectortPath))

app.set('views', viewDirectortPath);


app.set('view engine', 'hbs');

hbs.registerPartials(partialsDirectortPath)

app.get('',(req,res)=>{
    res.render('index',{
        'title':'home',
        'name':'yousif'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'about',
        'name':'yousif'
    })
})

app.get('/wether',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'please provide location'
        })
    }
    geocode(req.query.location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecaste(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                temp:data
            })
        })
        
    })
    
})

/* app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'please provide search'
        })
    }
    
    res.send({
        search:req.query.search
    })
}) */

app.get('/help',(req,res)=>{
  res.render('help',{
    'title':'help',
    'message':'this page help to discover new features',
    'name':'yousif'
  })
})

app.get('/help/*',(req,res)=>{
    res.render('404_page',{
        'title':'404',
        'name':'yousif',
        'error':'HELP ARTICLE NOT FOUND'
    })
})

app.get('*',(req,res)=>{
    res.render('404_page',{
        'name':'yousif',
        'title':'404',
        'error':'PAGE NOT FOUND'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})