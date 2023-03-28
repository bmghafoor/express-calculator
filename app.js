const express = require('express');

const app = express();

const math = require('mathjs');

class ExpressError extends Error {
    constructor(message,status){
        super();
        this.message = message
        this.status = status
        console.error(this.stack)
    }
}


function getArray(arg,next){

    const nums = arg.split(",");
    if (arg.length == 0){return next(new ExpressError('Need numbers for operation',400))}
    let myArray = nums.map(function (x) { 
        if (!parseInt(x,10)){return next(new ExpressError(`${x} is not an integer`,400))}
        return parseInt(x, 10); 
      });
    return myArray
}



app.get('/mean', function(req, res,next){

    const myArray = getArray(req.query.nums,next)
    mean = math.mean(myArray)
    return res.send({operation: 'mean', value:mean})
})

app.get('/median', (req,res,next) => {
    const myArray = getArray(req.query.nums,next)
    median = math.median(myArray)
    return res.send({operation: 'median', value:median})
})

app.get('/mode', (req,res,next) => {
    const myArray = getArray(req.query.nums, next)
    mode = math.mode(myArray)
    return res.send({operation: 'mode', value:mode[0]})
})

app.use(function(err, req, res, next) {
    let status = err.status || 500
    let message = err.message
    return res.status(status).json({
        error:{message,status}
    })
})

app.listen(3000,function(){
    console.log('App on Port 3000')
})  