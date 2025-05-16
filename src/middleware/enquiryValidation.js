import { body, param } from 'express-validator';

export const createEnquiryValidation = [
  body('house_id').isMongoId().withMessage('Invalid House ID'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('telephone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number'),
  body('message')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message too long (max 1000 chars)')
];

export const updateStatusValidation = [
  param('id').isMongoId().withMessage('Invalid Enquiry ID'),
  body('status')
    .notEmpty()
    .isIn(['pending', 'contacted', 'rejected', 'booked'])
    .withMessage('Invalid status value')
];