import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.routes';
import { AuthRouter } from '../../modules/auth/auth.route';
import { OTPRouter } from '../../modules/otp/otp.route';
import { ContactRouter } from '../../modules/contact/contact.route';
import { IModuleRoutes } from '../../types';
import { GdmRouter } from '../../modules/patient-management/gdm/gdm.router';

const router = Router();

const moduleRoutes: IModuleRoutes[] = [
  {
    path: '/user',
    element: UserRoutes,
  },
  {
    path: '/auth',
    element: AuthRouter,
  },
  {
    path: '/otp',
    element: OTPRouter,
  },
  {
    path: '/contact',
    element: ContactRouter,
  },
  {
    path: '/gdm',
    element: GdmRouter,
  },
];

moduleRoutes.forEach((r) => {
  router.use(r.path, r.element);
});

export const routerV1 = router;
