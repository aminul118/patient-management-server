import { Router } from 'express';
import { InfertilityController } from './infertility.controller';
import { InfertilityValidation } from './infertility.validation';
import { validateRequest } from '../../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create',
  validateRequest(InfertilityValidation.createInfertilityValidationSchema),
  InfertilityController.createPatient,
);
router.put(
  '/:id',
  validateRequest(InfertilityValidation.updateInfertilityValidationSchema),
  InfertilityController.updatePatient,
);
router.get('/get-all', InfertilityController.getAllPatients);
router.get('/:id', InfertilityController.getSinglePatientInfo);
router.delete('/:id', InfertilityController.deleteSinglePatientInfo);

export const InfertilityRouter = router;
