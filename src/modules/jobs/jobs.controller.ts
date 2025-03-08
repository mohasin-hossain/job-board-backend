import { Request, Response } from 'express';
import { JobService } from './jobs.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createJob = async (req: Request, res: Response) => {
  const job = await JobService.createJobIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Job created successfully',
    data: job,
  });
};

const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await JobService.getAllJobsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Jobs retrieved successfully!',
    data: jobs,
  });
};

const getJobById = async (req: Request, res: Response) => {
  const job = await JobService.getJobByIdFromDB(Number(req.params.id));

  sendResponse(res, {
    success: !!job,
    statusCode: job ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: job ? 'Job found!' : 'Job not found!',
    data: job,
  });
};

export const JobController = {
  createJob,
  getAllJobs,
  getJobById,
};
