const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const redeModel = require('./redesocial/rede.model');


mongoose.connect("mongodb://localhost:27017/redesocial",{useNewUrlParser:true, useUnifiedTopology:true});

const Rede  = mongoose.model('user',redeModel);


const app = express();


/*const user =  new Rede({ nome: "Martil", idade: 25, status: "Casado" , interesses: [{name:"Musica"}] })

user.save();*/


app.get('/', (req, res) => {

    res.render("index.ejs");
})-

app.get('/todos',  async (req, res) => {
    var total=  await Rede.count();
    console.log(total)


    Rede.find({ }).then(result =>{
        res.render("principal.ejs",{Users : result, Total : total})
    });
})

app.get('/todoss',  async (req, res) => {
    var total=  await Rede.count();
    console.log(total)


    Rede.find({ }).then(result =>{
        res.render("total.ejs",{Users : result, Total : total})
    });
})


app.get('/withinteresse',  async (req, res) => {

    var total=  await Rede.count();
    console.log(total)

    Rede.find({ interesses: {$exists:true, $not: {$size: 0}}  }).then(result =>{
        res.render("principal.ejs",{Users : result, Total : total})
    });
})



app.get('/31anos',async (req, res) => {

    var total=  await Rede.count();
    console.log(total)

    Rede.find({ idade: 31 }).then(result =>{

        res.render("principal.ejs",{Users : result, Total : total})
    });
})

app.get('/useronlyname', (req, res) => {
    Rede.find({ idade: 31 } , { _id: 0, nome : 1}).then(result =>{

        res.render("31anos.ejs",{Users : result})
        
    });
})


app.get('/musica',async  (req, res) => {
    var total=  await Rede.count();

    Rede.find({ interesses:{ $elemMatch: {name: "Musica" }} }).then(result =>{
        console.log(result)
        res.render("principal.ejs",{Users : result,Total : total})
    });
})


app.get('/com_ma_ter_l', async (req, res) => {
    var total=  await Rede.count();

    Rede.find({ $and:[
        {nome:/^Ma/ },
        {nome: /l$/ }
    ]}).then(result =>{

        res.render("principal.ejs",{Users : result, Total:total})
    });
})

app.get('/com_ma', async (req, res) => {
    var total=  await Rede.count();
    Rede.find({nome:/^Ma/ }).then(result =>{

       res.render("principal.ejs",{Users : result, Total:total})
    });
})





app.listen(8080,()=>{
    console.log('listening on: 8080')
});