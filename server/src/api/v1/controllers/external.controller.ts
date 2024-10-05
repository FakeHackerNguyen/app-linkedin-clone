import {JobTitle, LocalLocation} from '../data';
import AppError from '../utils/appError';
import catchAsyncError from '../utils/catchAsyncError';

export const getLocations = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  const query = (q as string)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, ''); // Normalize the query string

  const locations = LocalLocation.filter(value =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  res.status(200).json({
    data: locations,
  });
});

export const getJobTitles = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  const query = (q as string)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, ''); // Normalize the query string

  const locations = JobTitle.filter(value =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  res.status(200).json({
    data: locations,
  });
});
