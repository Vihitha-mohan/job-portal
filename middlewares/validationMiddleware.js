import {body,param,validationResult} from 'express-validator';
import { BadRequestError,NotFoundError, UnauthenticatedError } from '../errors/customError.js';
import { JOB_STATUS,JOB_TYPE} from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';


const withvalidationErrors = (validateValues)=>
{
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          console.log(errorMessages);
          if(errorMessages[0].startsWith('no job'))
          {
            throw new NotFoundError(errorMessages);
          }
          if(errorMessages[0].startsWith('Not authorised'))
          {
            throw new UnauthenticatedError('Not authorised to acces this route')            
          }
          throw new BadRequestError(errorMessages);
        }
        next();
    }
    ];
};


export const validateJobInput = withvalidationErrors([  
body('company').notEmpty().withMessage('company is required'),
body('position').notEmpty().withMessage('position is required'),
body('jobLocation').notEmpty().withMessage('job location is required'),
body('jobStatus')
  .isIn(Object.values(JOB_STATUS))
  .withMessage('invalid status value'),
body('jobType')
  .isIn(Object.values(JOB_TYPE))
  .withMessage('invalid type value'),
])

export const validateIdParam = withvalidationErrors(
    [
        param('id').custom(async (value,{req})=>
        {
            const isValidId =   mongoose.Types.ObjectId.isValid(value);
            if(!isValidId) throw new BadRequestError('invalid MongoDb id');
            const job =await Job.findById(value);
            if(!job)throw new NotFoundError(`no job with ${value}`);
            const isAdmin = req.user.role === 'admin';
            const isOwner = req.user.userId === job.createdBy.toString();
            if(!isAdmin && !isOwner)
            throw new UnauthenticatedError('Not authorised to acces this route')
        }),
      
    ]
)

export const validateRegisterInput = withvalidationErrors(
  [
    body('name').notEmpty().withMessage('name is required'),
    body('lastName').notEmpty().withMessage('lastName  is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email)=>
    {
      const user = await User.findOne({email})
      if(user)
      {
        throw new BadRequestError('email already exists');
      }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('Password must be atleast 8 characters'),
    body('location').notEmpty().withMessage('location is required'),
  ]
);

export const validateLoginInput = withvalidationErrors(
  [
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required')
  ]
);

export const validateUpdateUserInput = withvalidationErrors(
  [
    body('name').notEmpty().withMessage('name is required'),
    body('lastName').notEmpty().withMessage('lastName  is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email,{req})=>
    {
      const user = await User.findOne({email})
      if(user && user._id.toString() !== req.user.userId)
      {
        throw new BadRequestError('email already exists');
      }
    }),
    body('location').notEmpty().withMessage('location is required'),   
  ]
)