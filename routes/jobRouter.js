import { Router } from 'express';
const router = Router();
import {getAllJobs,createJob,getJob,updateJob,deleteJob,showStats} from '../controllers/jobControllers.js'
import { validateJobInput,validateIdParam } from '../middlewares/validationMiddleware.js';
import { checkForTestUser } from '../middlewares/authMiddleware.js';

router.route('/').get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);
router.route('/stats').get(showStats);
router.route('/:id').get(validateIdParam,getJob).patch(checkForTestUser,validateJobInput,validateIdParam, updateJob).delete(checkForTestUser,validateIdParam,deleteJob);

export default router;