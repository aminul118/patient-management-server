import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.routes';
import { AuthRouter } from '../../modules/auth/auth.route';
import { OTPRouter } from '../../modules/otp/otp.route';
import { ContactRouter } from '../../modules/contact/contact.route';
import { IModuleRoutes } from '../../types';
import { GdmRouter } from '../../modules/patient-management/gdm/gdm.router';
import { StatsRouter } from '../../modules/stats/stats.routes';

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
  {
    path: '/stats',
    element: StatsRouter,
  },
];

moduleRoutes.forEach((r) => {
  router.use(r.path, r.element);
});

export const routerV1 = router;
