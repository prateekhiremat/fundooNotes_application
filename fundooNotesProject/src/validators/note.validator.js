import Joi  from "@hapi/joi";

export const noteValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        discription: Joi.string().required(),
        color: Joi.string(),
        createdBy: Joi.string().required()
    });
    const{error, value} = schema.validate(req.body)
    if(error)
        next(error)
    else
        next()
}