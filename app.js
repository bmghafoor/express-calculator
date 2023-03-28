const express = require('express');

const app = express();

const math = require('mathjs');

function getArray(arg){

    const nums = arg.split(",");
    let myArray = nums.map(function (x) { 
        return parseInt(x, 10); 
      });
    return myArray
}


app.get('/mean', function(req, res){
    const myArray = getArray(req.query.nums)
    mean = math.mean(myArray)
    return res.send({operation: 'mean', value:mean})
})

app.get('/median', (req,res) => {
    const myArray = getArray(req.query.nums)
    median = math.median(myArray)
    return res.send({operation: 'median', value:median})
})

app.get('/mode', (req,res) => {
    const myArray = getArray(req.query.nums)
    mode = math.mode(myArray)
    return res.send({operation: 'mode', value:mode[0]})
})

app.listen(3000,function(){
    console.log('App on Port 3000')
})  