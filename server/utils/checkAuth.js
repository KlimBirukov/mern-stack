import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id.toObject
            next()
        } catch (err) {
            return res.status(404).json({
                message: 'Access denied.', err
            })
        }
    } else {
        console.log('2 here')
        return res.status(404).json({
            message: 'Access denied.'
        })
    }
}