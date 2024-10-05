import PageService from '../services/page.service';
import UserService from '../services/user.service';
import {shuffleArray} from '../utils';
import catchAsyncError from '../utils/catchAsyncError';

export const searchCommon = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;
  let combinedResults = [];

  if (q) {
    const companies = await PageService.getCompaniesByName(q as string);
    const universities = await PageService.getUniversitiesByName(q as string);
    const users = await UserService.getUsersByName(q as string);

    combinedResults = [
      ...users.map(e => ({
        type: 'User',
        fullName: e.fullName,
        avatar: e.avatar,
      })),
      ...companies.map(e => ({
        type: 'Company',
        name: e.name,
        avatar: e.avatar,
        industry: e.industry,
      })),
      ...universities.map(e => ({
        type: 'University',
        name: e.name,
        avatar: e.avatar,
        location: e.location,
      })),
    ];

    combinedResults = shuffleArray(combinedResults).slice(0, 6);
  }

  res.status(200).json({
    data: combinedResults,
  });
});

export const searchCompany = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  const companies = await PageService.getCompaniesByName(q as string);

  res.status(200).json({
    data: companies,
  });
});

export const searchUniversity = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  const universities = await PageService.getUniversitiesByName(q as string);

  res.status(200).json({
    data: universities,
  });
});
