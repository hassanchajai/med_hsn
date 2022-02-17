const DeliveryManager = require('../models/deliveryManger.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const managerEmail = require('../utils/managerEmail')
const { comparePassword } = require('../helpers/JwtValidation')

const index = (req, res) => {
    DeliveryManager.find().then((result) => {
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ error: "No DeliveryManager Found" })
        }
    }).catch((err) => {
        res.status(400).json({ error: err.message })
    })
}

const show = async (req, res) => {
    let id = req.params.id;
    try {
        const result = await DeliveryManager.findById({ _id: id })
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


const loginDeliveryManager = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingDeliveryManager = await DeliveryManager.findOne({ email })

        if (!existingDeliveryManager) return res.status(400).json({ message: "DeliveryManager not found" })

        comparePassword(password, existingDeliveryManager, res)

        logger.info(`DeliveryManager email: ${existingDeliveryManager.email} logged in`)


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const store = async (req, res) => {
    const { email, firstName, lastName } = req.body
    let url = `http://localhost:3000/restDManagerPassword`
    try {
        if (!email || !firstName || !lastName) return res.status(400).json({ message: "Please fill all the fields" })

        const existingDeliveryManager = await DeliveryManager.findOne({ email })



        if (existingDeliveryManager) return res.status(400).json({ message: "DeliveryManager already exists" })

        let password = Math.random().toString(20).substring(2, 10)

        const hashedPassword = await bcrypt.hash(password, 12)
        const role = "DeliveryManager"

        const newDeliveryManager = await DeliveryManager.create({ email, firstName, lastName, password: hashedPassword })


        managerEmail(email, firstName, lastName, password, url, role)

        logger.info(`DeliveryManager email: ${newDeliveryManager.email} created by ${req.cookies.role} - ${req.cookies.id}`)
        res.status(200).json({ newDeliveryManager })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

const destroy = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    try {
        const result = await DeliveryManager.deleteOne(record)
        logger.info(`DeliveryManager id: ${id} deleted by ${req.cookies.role} - ${req.cookies.id}`)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    const record = { _id: id }
    const updatedData = { ...req.body }
    try {
        const result = await DeliveryManager.updateOne(record, updatedData, {
            new: true,
        })
        logger.info(`DeliveryManager id: ${id} updated by ${req.cookies.role} - ${req.cookies.id}`)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const resetPassword = async (req, res) => {
    const email = req.body.email
    const password = req.body.Password
    try {
        const DManager = await DeliveryManager.findOne({ email })
        if (DManager == null) return res.status(400).json({ message: "delivery Manager not found" })
        await DeliveryManager.updateOne({ _id: DManager.id }, {
            $set: {
                password: await bcrypt.hash(password, 12)
            }
        })
        logger.info(`delivery Manager with id: ${DManager.id} updated his status`)
        res.status(200).json({ message: "Password updated successfully" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports = {
    index,
    show,
    store,
    loginDeliveryManager,
    destroy,
    resetPassword,
    update
}