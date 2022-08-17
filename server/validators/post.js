import {body} from 'express-validator'

export const postCreateValidation = [
    body('title', 'Enter article title.').isLength({min: 3}).isString(),
    body('text', 'Enter article text.').isLength({min: 3}).isString(),
    body('tags', 'Invalid tags format, specify array.').optional().isString(),
    body('imageUrl', 'Invalid avatar ref.').optional().isString()
]