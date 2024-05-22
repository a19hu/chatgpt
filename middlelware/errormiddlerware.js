const errorResponce=require('../utilis/errorResponce')

const errorHandler=(errs,req,res,next)=>{
    let err={...errs}
    err.message=err.message
    if(err.name==='CastError'){
        const message=`resource not found with id of ${err.value}`
        err=new errorResponce(message,404)
    }
    
    if(err.code === 11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`
        err=new errorResponce(message,400)
    }
    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(value=>value.message)
        err=new errorResponce(message,400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message || 'internal server error'
    })
}
module.exports=errorHandler;