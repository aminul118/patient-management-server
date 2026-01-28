import { Request, Response } from 'express';

import httpStatus from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { GdmServices } from './gdm.service';

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await GdmServices.createGdmPatient(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gdm patient created successfully',
    data,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.id;
  const data = await GdmServices.updateGdmPatient(payload, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gdm patient updated successfully',
    data,
  });
});

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const { meta, data } = await GdmServices.getAllPatients(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gdm patients retrieved successfully',
    data,
    meta,
  });
});

const deleteSinglePatientInfo = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await GdmServices.deleteSinglePatientInfo(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gdm patients delete successfully',
      data,
    });
  },
);

export const GdmController = {
  createPatient,
  updatePatient,
  getAllPatients,
  deleteSinglePatientInfo,
};
