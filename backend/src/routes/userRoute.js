const express = require('express');
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtValidation = require('./jwtValidation');

//metodo post
//agregar nuevo usuario
// @name
// @email
// @age
router.post('/post', async (req, res) => {
    const { name, email, age } = req.body;
    const data = new Model({ name, email, age });
    //rutina de validacion de email
    //registro unico de email, error.code:400 usuario/email ya registrado
    const isEmailExist = await Model.findOne({ email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' });
    }

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//insecure getAll
router.get('/insecureGetAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});


//Get all Method secure
router.get('/getAll', jwtValidation, async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//
router.post('/login', async (req, res) => {
    const { name, email } = req.body;

    const userData = await Model.findOne({ email });
    if (!userData) return res.status(400).json({ error: 'Usuario no encontrado' });
    if (userData.name != name) return res.status(400).json({ error: 'Usuario no encontrado' });
    const token = jwt.sign({
        name,
        email
    }, process.env.TOKEN_SECRET || 'venti@super_secret#string');

    res.header('auth_token', token).json({ id: userData._id, 'auth_token': token });
});


//metodo post
//agregar nuevo usuario
// @name
// @email
// @age
router.post('/register', async (req, res) => {
    const { name, email, age } = req.body;
    const data = new Model({ name, email, age });
    //rutina de validacion de email
    //registro unico de email, error.code:400 usuario/email ya registrado
    const isEmailExist = await Model.findOne({ email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' });
    }
    try {
        const dataToSave = await data.save();
        //Rutina de creacion de jwt con un super secreto
        const token = jwt.sign({ name, email }, process.env.TOKEN_SECRET || 'venti@super_secret#string');
        res.status(200).json({ "auth_token": token });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Get by ID Method
router.get('/getOne/:id', jwtValidation, async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;
