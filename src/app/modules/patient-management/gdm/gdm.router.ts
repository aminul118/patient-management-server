import { Router } from 'express';
import { GdmController } from './gdm.controller';

const router = Router();

router.post('/create', GdmController.createPatient);
router.put('/update/:id', GdmController.updatePatient);
router.get('/get-all', GdmController.getAllPatients);
router.delete('/:id', GdmController.deleteSinglePatientInfo);

export const GdmRouter = router;
