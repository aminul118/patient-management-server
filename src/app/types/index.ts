import { Router } from 'express';
export type { SendEmailOptions } from './email.types';
export type { EnvConfig } from './env.type';

export interface IModuleRoutes {
  path: string;
  element: Router;
}
