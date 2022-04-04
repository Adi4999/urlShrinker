const express= require('express')
const mongoose= require('mongoose')

const ShortUrl=require('./models/shortUrl')


const uri='mongodb+srv://Adi:Adi@cluster0.djy2w.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(uri,{
    useNewUrlParser:true,useUnifiedTopology:true
})
const app= express()


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))




app.get('/',async(req,res)=>{
    const shortUrls= await ShortUrl.find()

    console.log(shortUrls)
    shortUrls.forEach(url=>{
        console.log(url.short)
    })


res.render('index',{urls:shortUrls})
})

app.post('/shortUrls',async(req,res)=>{
    let newUrl= new ShortUrl({
    full:req.body.fullUrl
    })
    newUrl.save()
res.redirect('/')
}) 


app.get('/:shortUrl',async(req,res)=>{
    const shortUrl= await ShortUrl.findOne({short:req.params.shortUrl})
if(shortUrl==null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)

})


app.listen(process.env.PORT||5000)