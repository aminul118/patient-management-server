import { Router } from 'express';
import { OverWeightController } from './over-weight.controller';
import { OverWeightValidation } from './over-weight.validation';
import { validateRequest } from '../../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create',
  validateRequest(OverWeightValidation.createOverWeightValidationSchema),
  OverWeightController.createPatient,
);
router.put(
  '/:id',
  validateRequest(OverWeightValidation.updateOverWeightValidationSchema),
  OverWeightController.updatePatient,
);
router.get('/get-all', OverWeightController.getAllPatients);
router.get('/:id', OverWeightController.getSinglePatientInfo);
router.delete('/:id', OverWeightController.deleteSinglePatientInfo);

export const OverWeightRouter = router;
