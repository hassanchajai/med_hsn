const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const comparePassword = async (password, user, res) => {
    
    bcrypt.compare(password, user.password)
        .then((isCorrect) => {
            if (isCorrect) {
                const payload = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
                jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' }, (err, token) => {
                    if (err) return res.json({ message: err.message })
                    return res.status(200).json({
                        token: token,
                        role: user.role,
                        email: user.email,
                    })

                })
            } else {
                res.status(404).json({ message: "Invalid Username or password" })
            }
        })
}

const verifyToken = (req, res, next, user) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (token) {
        jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
            if (err) return res.status(401).json({ message: "Failed To Authenticate" })
            if (decoded.role === `${user}`) {
                next()
            } else {
                res.status(400).json({ message: `You need to be ${user} to access` })
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = { comparePassword, verifyToken }