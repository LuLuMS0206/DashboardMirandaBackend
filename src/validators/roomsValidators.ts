import Joi, { ObjectSchema } from 'joi';

export const roomSchema: ObjectSchema = Joi.object({
    image: Joi.string().uri().required(), 
    roomNumber: Joi.string().alphanum().required(), 
    roomType: Joi.string().valid('Single', 'Double', 'Suite', 'Deluxe').required(), 
    amenities: Joi.array().items(Joi.string()).required(), 
    price: Joi.number().greater(0).required(), 
    offerPrice: Joi.number().greater(0).optional(), 
    status: Joi.string().valid('Available', 'Occupied', 'Under Maintenance').required(), 
    availability: Joi.string().valid('Available', 'Not Available').required()
});