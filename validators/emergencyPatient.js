const Joi = require('joi');

const emergencyPatientValidationSchema = Joi.object({
    patient_temporary_id: Joi.string().max(255).optional().allow(null).messages({
        'string.base': 'Temporary patient ID must be a string.',
        'string.max': 'Temporary patient ID must not exceed 255 characters.',
    }).external(async (value, helpers) => {
        // Custom validation for uniqueness can be implemented here with a database check
        const patientExists = await checkIfPatientExists(value); // Assuming this is a custom function
        if (patientExists) {
            throw new Error('The patient temporary ID must be unique.');
        }
        return value;
    }),
    
    emergency_time: Joi.string().pattern(new RegExp(/^\d{2}:\d{2}$/)).required().messages({
        'string.base': 'Emergency time must be a string.',
        'string.pattern.base': 'Emergency time must be in the format hh:mm.',
        'any.required': 'Emergency time is required.'
    }),

    emergency_first_name: Joi.string().max(255).required().messages({
        'string.base': 'First name must be a string.',
        'string.max': 'First name must not exceed 255 characters.',
        'any.required': 'First name is required.'
    }),

    emergency_middle_name: Joi.string().max(255).required().messages({
        'string.base': 'Middle name must be a string.',
        'string.max': 'Middle name must not exceed 255 characters.',
        'any.required': 'Middle name is required.'
    }),

    emergency_last_name: Joi.string().max(255).required().messages({
        'string.base': 'Last name must be a string.',
        'string.max': 'Last name must not exceed 255 characters.',
        'any.required': 'Last name is required.'
    }),

    emergency_extension: Joi.string().max(10).optional().allow(null).messages({
        'string.base': 'Extension must be a string.',
        'string.max': 'Extension must not exceed 10 characters.'
    }),

    emergency_sex: Joi.string().valid('Male', 'Female').optional().allow(null).messages({
        'any.only': 'Sex must be either Male or Female.'
    }),

    emergency_age: Joi.number().integer().min(0).max(120).optional().allow(null).messages({
        'number.base': 'Age must be a number.',
        'number.min': 'Age must be at least 0.',
        'number.max': 'Age must be at most 120.'
    }),

    priority_level: Joi.string().max(255).required().messages({
        'string.base': 'Priority level must be a string.',
        'string.max': 'Priority level must not exceed 255 characters.',
        'any.required': 'Priority level is required.'
    }),

    status: Joi.string().max(255).optional().allow(null).messages({
        'string.base': 'Status must be a string.',
        'string.max': 'Status must not exceed 255 characters.'
    }),

    B_P: Joi.string().pattern(new RegExp(/^\d{1,3}\/\d{1,3}$/)).required().messages({
        'string.base': 'Blood pressure must be a string.',
        'string.pattern.base': 'Blood pressure must be in the format: xxx/xxx.',
        'any.required': 'Blood pressure is required.'
    }),

    temperature: Joi.number().min(30).max(45).required().messages({
        'number.base': 'Temperature must be a number.',
        'number.min': 'Temperature must be at least 30°C.',
        'number.max': 'Temperature must be at most 45°C.',
        'any.required': 'Temperature is required.'
    }),

    heart_rate: Joi.number().integer().min(30).max(200).required().messages({
        'number.base': 'Heart rate must be an integer.',
        'number.min': 'Heart rate must be at least 30 bpm.',
        'number.max': 'Heart rate must be at most 200 bpm.',
        'any.required': 'Heart rate is required.'
    }),

    pulse_rate: Joi.number().integer().min(30).max(200).required().messages({
        'number.base': 'Pulse rate must be an integer.',
        'number.min': 'Pulse rate must be at least 30 bpm.',
        'number.max': 'Pulse rate must be at most 200 bpm.',
        'any.required': 'Pulse rate is required.'
    }),

    respiratory_rate: Joi.number().integer().min(10).max(60).required().messages({
        'number.base': 'Respiratory rate must be an integer.',
        'number.min': 'Respiratory rate must be at least 10 breaths per minute.',
        'number.max': 'Respiratory rate must be at most 60 breaths per minute.',
        'any.required': 'Respiratory rate is required.'
    }),

    vitals_note: Joi.string().max(1000).required().messages({
        'string.base': 'Vitals note must be a string.',
        'string.max': 'Vitals note must not exceed 1000 characters.',
        'any.required': 'Vitals note is required.'
    })
});

// Example function to validate data
const validateEmergencyPatient = async (data) => {
    return emergencyPatientValidationSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
    validateEmergencyPatient
};