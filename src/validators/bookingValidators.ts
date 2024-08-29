import Joi, { ObjectSchema } from 'joi';


export const bookingSchema: ObjectSchema = Joi.object({
    guest: Joi.string().min(1).required(), 
    checkIn: Joi.date().iso().required(), 
    checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required(), 
    roomType: Joi.string().valid('Single', 'Double', 'Suite').required(), 
    specialRequest: Joi.string().optional(), 
    status: Joi.string().valid('Pending', 'Confirmed', 'Cancelled').required(), 
    orderDate: Joi.date().iso().required() 
});