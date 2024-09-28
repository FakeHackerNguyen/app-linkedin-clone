import catchAsyncError from '../utils/catchAsyncError';

type Location = {
  components: {
    city?: string;
    country: string;
  };
};

export const getLocations = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  res.status(200).json({
    data: location,
  });
});
