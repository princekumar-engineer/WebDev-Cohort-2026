import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
      .min(8)
      .pattern(/(?=.*[A-Z])(?=.*\d)/)
      .message(
        "Password must contain at least one uppercase letter and one digit",
      )
      .required(),
    role: Joi.string().valid("customer", "seller").default("customer"),
  });
}

export default RegisterDto;


/*
schema from RegisterDto
validate() from BaseDto
------------------------------------------------------------
static schema
static schema = Joi.object({

This defines validation rules.

Because it's static, you can call:
RegisterDto.validate()

without creating object.

*/