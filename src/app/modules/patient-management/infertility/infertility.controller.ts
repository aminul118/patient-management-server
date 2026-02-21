import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { InfertilityServices } from './infertility.service';

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await InfertilityServices.createInfertilityPatient(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Infertility patient created successfully',
    data,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.id;
  const data = await InfertilityServices.updateInfertilityPatient(payload, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Infertility patient updated successfully',
    data,
  });
});

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const { meta, data } = await InfertilityServices.getAllPatients(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Infertility patients retrieved successfully',
    data,
    meta,
  });
});

const getSinglePatientInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await InfertilityServices.getSinglePatientInfo(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Infertility patient retrieved successfully',
    data,
  });
});

const deleteSinglePatientInfo = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await InfertilityServices.deleteSinglePatientInfo(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Infertility patients delete successfully',
      data,
    });
  },
);

export const InfertilityController = {
  createPatient,
  updatePatient,
  getAllPatients,
  deleteSinglePatientInfo,
  getSinglePatientInfo,
};
