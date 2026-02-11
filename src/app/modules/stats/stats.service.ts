import { Gdm } from '../patient-management/gdm/gdm.model';
import { User } from '../user/user.model';

const getAdminStats = async () => {
  const [userCount, GdmPatientCount] = await Promise.all([
    User.estimatedDocumentCount(),
    Gdm.estimatedDocumentCount(),
  ]);

  const data = {
    userCount,
    GdmPatientCount,
    totalPatient: GdmPatientCount,
  };

  return data;
};

export const statsServices = {
  getAdminStats,
};
