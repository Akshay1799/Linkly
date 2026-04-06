
// middleware to validate a given zod schema 
export const validateRequest = (schema)=>{
    return (req, res, next)=>{
        
        const result = schema.safeParse(req.body);
        
        if (!result.success) {
           return next(result.error)
        } 

        req.body = result.data;
        next()
        
    }
}

