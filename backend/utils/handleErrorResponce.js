export const handleErrorResponse = (res, error, message = 'some error', status = 500) => {
    console.log(error)
    res.status(status).json({
        message,
        error
    })
}