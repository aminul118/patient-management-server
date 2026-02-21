import httpStatus from 'http-status-codes';
import AppError from '../../../errorHelpers/AppError';
import { OverWeight } from './over-weight.model';
import { IOverWeight } from './over-weight.interface';
import { overWeightSearchableFields } from './over-weight.constant';
import { QueryBuilder } from '../../../utils/QueryBuilder';

const createOverWeightPatient = async (payload: IOverWeight) => {
  const isPatientExists = await OverWeight.findOne({
    patientId: payload.patientId,
  });

  if (isPatientExists) {
    throw new AppError(httpStatus.CONFLICT, 'Patient already exists!');
  }

  const overWeightPatient = await OverWeight.create(payload);
  return overWeightPatient;
};

const updateOverWeightPatient = async (payload: IOverWeight, id: string) => {
  const patientExits = await OverWeight.findById(id);

  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'OverWeight Patient not found');
  }

  // Check for duplicate patientId if it's being updated
  if (payload.patientId && payload.patientId !== patientExits.patientId) {
    const duplicate = await OverWeight.findOne({
      patientId: payload.patientId,
    });
    if (duplicate) {
      throw new AppError(httpStatus.CONFLICT, 'Patient ID already exists');
    }
  }

  const overWeightPatient = await OverWeight.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return overWeightPatient;
};

const getAllPatients = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(OverWeight.find(), query);

  const patients = await queryBuilder
    .search(overWeightSearchableFields)
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
  const data = await OverWeight.findById(id);

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return data;
};

const deleteSinglePatientInfo = async (id: string) => {
  const patientExits = await OverWeight.findById(id);
  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return await OverWeight.findByIdAndDelete(id);
};

export const OverWeightServices = {
  createOverWeightPatient,
  updateOverWeightPatient,
  getAllPatients,
  deleteSinglePatientInfo,
  getSinglePatientInfo,
};
