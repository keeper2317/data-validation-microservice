const express = require('express');
const router = express.Router();
const { validateEmergencyPatient } = require('../validators/emergencyPatient');

router.post('/emergency-patient', async (req, res) => {
    try {
        const value = await validateEmergencyPatient(req.body);  // Use async validation here
        res.json({ message: 'Data is valid', data: value });
    } catch (error) {
        const errorMessages = error.details.map(err => err.message); // Collect all error messages
        return res.status(400).json({ errors: errorMessages });
    }
});

module.exports = router;