const errorHandler = (err, req, res, next) => {
    let code = err.code || 500
    let message;

    if(err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError" || "SequelizeConstraintError"){
        const errors = err.errors.map(error => {
            return error.message
        })
        message = errors
        code = 400
    } else if(err.name === "NotFound"){
        message = "Data not found"
    } else if(err.name === "Bad Request"){
        message = "Bad Request" 
    } else if(err.name === "Forbidden"){
        message = "Forbidden to access" 
    } else if(err.name === "Unauthorized"){
        message = "Wrong email / password" 
    } else if(err.name === "Invalid_Credentials"){
        message = "invalid token" 
    } else { 
        message = "Internal Server Error"
    }

    res.status(code).json({message})
}

module.exports = errorHandler