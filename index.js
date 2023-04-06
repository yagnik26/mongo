const express = require('express');
const connect = require('./config/db');
const bookData = require('./models/book');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {

    let {min,max,category,sort} = req.query;

    if(min && max){
        if(sort == 'lth'){
            try {
                let data = await bookData.find({price : {$gte : min,$lte : max}}).sort({price : 1});
                res.status(200).send(data);
            } catch (error) {
                res.status(500).send(error);
            }
        }
        else if(sort == 'htl'){
            try {
                let data = await bookData.find({price : {$gte : min,$lte : max}}).sort({price : -1});
                res.status(200).send(data);
            } catch (error) {
                res.status(500).send(error);
            }
        }
        else{
            try {
                console.log('jj');
                let data = await bookData.find({price : {$gte : min,$lte : max}});
                res.status(200).send(data);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
    else if(sort == 'lth'){
        try {
            let data = await bookData.find().sort({price : 1});
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    else if(sort == 'htl'){
        try {
            let data = await bookData.find().sort({price : -1});
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    else if(category)
    {
        try {
            let data = await bookData.find({category : category});
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
})

app.post('/data', async (req, res) => {

    try {
        await bookData.create(req.body);
        res.status(200).send("done");
    } catch (error) {
        res.status(400).send("data invalide..");
    }

});

app.patch('/edit/:id', async (req, res) => {
    let { id } = req.params;
    let data = req.body;

    try {
        await bookData.findByIdAndUpdate(id, data);
        res.status(200).send('done')
    } catch (error) {
        res.status(400).send(error);
    }

})

app.delete('/delete/:id',async (req,res)=>{
    let{id} = req.params;

    try {
        await bookData.findByIdAndDelete(id)
    } catch (error) {
        res.status(200).send(error);
    }
    res.status(200).send('done');
})

app.listen(5555, () => {
    console.log("5555");
    connect();
})