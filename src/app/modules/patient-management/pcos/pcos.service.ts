import httpStatus from 'http-status-codes';
import AppError from '../../../errorHelpers/AppError';
import { Pcos } from './pcos.model';
import { IPcos } from './pcos.interface';
import { pcosSearchableFields } from './pcos.constant';
import { QueryBuilder } from '../../../utils/QueryBuilder';

const createPcosPatient = async (payload: IPcos) => {
  const isPatientExists = await Pcos.findOne({
    patientId: payload.patientId,
  });

  if (isPatientExists) {
    throw new AppError(httpStatus.CONFLICT, 'Patient already exists!');
  }

  const pcosPatient = await Pcos.create(payload);
  return pcosPatient;
};

const updatePcosPatient = async (payload: IPcos, id: string) => {
  const patientExits = await Pcos.findById(id);

  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Pcos Patient not found');
  }

  // Check for duplicate patientId if it's being updated
  if (payload.patientId && payload.patientId !== patientExits.patientId) {
    const duplicate = await Pcos.findOne({ patientId: payload.patientId });
    if (duplicate) {
      throw new AppError(httpStatus.CONFLICT, 'Patient ID already exists');
    }
  }

  const pcosPatient = await Pcos.findByIdAndUpdate(id, payload, { new: true });
  return pcosPatient;
};

const getAllPatients = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Pcos.find(), query);

  const patients = await queryBuilder
    .search(pcosSearchableFields)
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
  const data = await Pcos.findById(id);

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return data;
};

const deleteSinglePatientInfo = async (id: string) => {
  const patientExits = await Pcos.findById(id);
  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return await Pcos.findByIdAndDelete(id);
};

export const PcosServices = {
  createPcosPatient,
  updatePcosPatient,
  getAllPatients,
  deleteSinglePatientInfo,
  getSinglePatientInfo,
};
