import bcrypt from 'bcryptjs';
import envVars from '../config/env';
import { IAuthProvider, IUser, Role } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { Counter } from '../modules/counter/counter.model';
import { logger } from './logger';

const seedSupperAdmin = async () => {
  try {
    const isSupperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSupperAdminExist) {
      logger.info('❌ Super admin already exists');
      return;
    }

    logger.info('Trying to create super admin...');

    const hashedPassword = await bcrypt.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      envVars.BCRYPT_SALT_ROUND,
    );

    const authProvider: IAuthProvider = {
      provider: 'credentials',
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const counter = await Counter.findOneAndUpdate(
      { id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    const payload: IUser = {
      firstName: 'Super',
      lastName: 'Admin',
      phone: '01781082064',
      userId: counter.seq,
      email: envVars.SUPER_ADMIN_EMAIL,
      role: Role.SUPER_ADMIN,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    logger.info('✅ Super admin created successfully \n', superAdmin);
  } catch (error) {
    logger.error(error);
  }
};

export default seedSupperAdmin;
