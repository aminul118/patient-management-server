import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { PcosServices } from './pcos.service';

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await PcosServices.createPcosPatient(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pcos patient created successfully',
    data,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.id;
  const data = await PcosServices.updatePcosPatient(payload, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pcos patient updated successfully',
    data,
  });
});

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const { meta, data } = await PcosServices.getAllPatients(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pcos patients retrieved successfully',
    data,
    meta,
  });
});

const getSinglePatientInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await PcosServices.getSinglePatientInfo(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pcos patient retrieved successfully',
    data,
  });
});

const deleteSinglePatientInfo = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await PcosServices.deleteSinglePatientInfo(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pcos patients delete successfully',
      data,
    });
  },
);

export const PcosController = {
  createPatient,
  updatePatient,
  getAllPatients,
  deleteSinglePatientInfo,
  getSinglePatientInfo,
};
