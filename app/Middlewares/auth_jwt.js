const verifyJWT = (req, res, next) => {
    var token = req.headers['x-access-token']

    if (!token) return res.status(401).send({auth: false, message: "No token provided."})
    
    jwt.very(token, process.env.SECRET, function(err, decoded) {
        if (err) return  res.satuts(500).send({ auth: false, message: "Failed to authenticate token."})

        req.userId = decoded.id
        next()

    })

}