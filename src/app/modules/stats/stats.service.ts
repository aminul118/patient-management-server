import { Gdm } from '../patient-management/gdm/gdm.model';
import { User } from '../user/user.model';
import { Infertility } from '../patient-management/infertility/infertility.model';
import { OverWeight } from '../patient-management/over-weight/over-weight.model';
import { Pcos } from '../patient-management/pcos/pcos.model';

const getAdminStats = async () => {
  const [
    userCount,
    GdmPatientCount,
    InfertilityPatientCount,
    OverWeightPatientCount,
    PcosPatientCount,
  ] = await Promise.all([
    User.estimatedDocumentCount(),
    Gdm.estimatedDocumentCount(),
    Infertility.estimatedDocumentCount(),
    OverWeight.estimatedDocumentCount(),
    Pcos.estimatedDocumentCount(),
  ]);

  const data = {
    userCount,
    GdmPatientCount,
    InfertilityPatientCount,
    OverWeightPatientCount,
    PcosPatientCount,
    totalPatient:
      GdmPatientCount +
      InfertilityPatientCount +
      OverWeightPatientCount +
      PcosPatientCount,
  };

  return data;
};

export const statsServices = {
  getAdminStats,
};
