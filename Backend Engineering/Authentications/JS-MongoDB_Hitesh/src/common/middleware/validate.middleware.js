import ApiError from "../utils/api-error.js";

const validate = (Dtoclass) => {
    return (req, res, next) => {
        const {errors, value} = Dtoclass.validate(req.body)
        if(errors){
            throw ApiError.badRequest(errors.join("; "))
        }
        req.body = value
        next()
    }
}


export default validate


/*
validate: Same word, different owners.
const validate = ...      // function name
User.validate()           // class method

---------------------------------------------------------------------------
You could rename the first one: rename validate → validateRequest

This works the same:
const validateRequest = (Dtoclass) => { ... }

NOTE: Yes — renaming it will work exactly the same, as long as you also update where it's used.

---------------------------------------------------------------------------
Now it's clearer:
validateRequest → middleware
validate → DTO method

*/