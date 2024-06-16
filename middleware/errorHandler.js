const { constants } = require('../constants');

const errorHandler = ( err, req, res, next ) => {
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({
                titile: "Not found",
                message: err.message,
                stackTracer: err.stack
            });
            break;
        case constants.VALIDATION_ERROR:
            res.json({
                titile: "Validation Failed",
                message: err.message,
                stackTracer: err.stack
            });
            break;
        case constants.UNAUTHOURIZED:
            res.json({
                titile: "Unauthorized",
                message: err.message,
                stackTracer: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                titile: "Forbidden",
                message: err.message,
                stackTracer: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                titile: "Server Error",
                message: err.message,
                stackTracer: err.stack
            });
            break;
        default:
            console.log('No Error, All good')
    }
};

module.exports = errorHandler;