import httpStatus from 'http-status-codes';
import AppError from '../../../errorHelpers/AppError';
import { Infertility } from './infertility.model';
import { IInfertility } from './infertility.interface';
import { infertilitySearchableFields } from './infertility.constant';
import { QueryBuilder } from '../../../utils/QueryBuilder';

const createInfertilityPatient = async (payload: IInfertility) => {
  const isPatientExists = await Infertility.findOne({
    patientId: payload.patientId,
  });

  if (isPatientExists) {
    throw new AppError(httpStatus.CONFLICT, 'Patient already exists!');
  }

  const infertilityPatient = await Infertility.create(payload);
  return infertilityPatient;
};

const updateInfertilityPatient = async (payload: IInfertility, id: string) => {
  const patientExits = await Infertility.findById(id);

  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Infertility Patient not found');
  }

  // Check for duplicate patientId if it's being updated
  if (payload.patientId && payload.patientId !== patientExits.patientId) {
    const duplicate = await Infertility.findOne({
      patientId: payload.patientId,
    });
    if (duplicate) {
      throw new AppError(httpStatus.CONFLICT, 'Patient ID already exists');
    }
  }

  const infertilityPatient = await Infertility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return infertilityPatient;
};

const getAllPatients = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Infertility.find(), query);

  const patients = await queryBuilder
    .search(infertilitySearchableFields)
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
  const data = await Infertility.findById(id);

  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return data;
};

const deleteSinglePatientInfo = async (id: string) => {
  const patientExits = await Infertility.findById(id);
  if (!patientExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  return await Infertility.findByIdAndDelete(id);
};

export const InfertilityServices = {
  createInfertilityPatient,
  updateInfertilityPatient,
  getAllPatients,
  deleteSinglePatientInfo,
  getSinglePatientInfo,
};
