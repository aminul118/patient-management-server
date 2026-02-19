import { Router } from 'express';
import { GdmController } from './gdm.controller';
import { GdmValidation } from './gdm.validation';
import { validateRequest } from '../../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create',
  validateRequest(GdmValidation.createGdmValidationSchema),
  GdmController.createPatient,
);
router.put(
  '/:id',
  validateRequest(GdmValidation.updateGdmValidationSchema),
  GdmController.updatePatient,
);
router.get('/get-all', GdmController.getAllPatients);
router.get('/:id', GdmController.getSinglePatientInfo);
router.delete('/:id', GdmController.deleteSinglePatientInfo);

export const GdmRouter = router;
