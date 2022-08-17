import {body} from "express-validator";

export const registerValidation = [
    body('email', 'Invalid mail format.').isEmail(),
    body('password', 'Password must be longer then 3 symbols.').isLength({min: 3}),
    body('fullName', 'Specify the name.').isLength({min: 3}),
    body('avatarUrl', 'Invalid avatar ref.').optional().isURL()
]

export const loginValidation = [
    body('email', 'Invalid mail format.').isEmail(),
    body('password', 'Password must be longer then 3 symbols.').isLength({min: 3}),
]