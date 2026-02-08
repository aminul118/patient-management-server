import httpStatus from 'http-status-codes';
import AppError from '../../../errorHelpers/AppError';
import { Gdm } from './gdm.model';
import { IGdm } from './grm.interface';
import { gdmSearchableFields } from './gdm.constant';
import { QueryBuilder } from '../../../utils/QueryBuilder';

const createGdmPatient = async (payload: IGdm) => {
  const gdmPatient = await Gdm.create(payload);
  return gdmPatient;
};

const updateGdmPatient = async (payload: IGdm, id: string) => {
  const patientExits = await Gdm.findById(id);

  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Gdm Patient not found');
  }
  const gdmPatient = await Gdm.findByIdAndUpdate(id, payload, { new: true });
  return gdmPatient;
};

const getAllPatients = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Gdm.find(), query);

  const patients = await queryBuilder
    .search(gdmSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const [data, meta] = await Promise.all([
    patients.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSinglePatientInfo = async (id: string) => {
  const data = await Gdm.findById(id);
  return data;
};

const deleteSinglePatientInfo = async (id: string) => {
  const patientExits = await Gdm.findById(id);
  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return await Gdm.findByIdAndDelete(id);
};

export const GdmServices = {
  createGdmPatient,
  updateGdmPatient,
  getAllPatients,
  deleteSinglePatientInfo,
  getSinglePatientInfo,
};
