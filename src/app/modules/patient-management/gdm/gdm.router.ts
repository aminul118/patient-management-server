import { Router } from 'express';
import { GdmController } from './gdm.controller';

const router = Router();

router.post('/create', GdmController.createPatient);
router.put('/:id', GdmController.updatePatient);
router.get('/get-all', GdmController.getAllPatients);
router.get('/:id', GdmController.getSinglePatientInfo);
router.delete('/:id', GdmController.deleteSinglePatientInfo);

export const GdmRouter = router;
