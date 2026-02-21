import { Router } from 'express';
import { PcosController } from './pcos.controller';
import { PcosValidation } from './pcos.validation';
import { validateRequest } from '../../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create',
  validateRequest(PcosValidation.createPcosValidationSchema),
  PcosController.createPatient,
);
router.put(
  '/:id',
  validateRequest(PcosValidation.updatePcosValidationSchema),
  PcosController.updatePatient,
);
router.get('/get-all', PcosController.getAllPatients);
router.get('/:id', PcosController.getSinglePatientInfo);
router.delete('/:id', PcosController.deleteSinglePatientInfo);

export const PcosRouter = router;
