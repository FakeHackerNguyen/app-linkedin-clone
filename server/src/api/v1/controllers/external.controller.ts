import AppError from '../utils/appError';
import catchAsyncError from '../utils/catchAsyncError';

const LocalLocation = [
  'Australia',
  'Quận 4, Ho Chi Minh City, Vietnam',
  'Bình Thạnh, Ho Chi Minh City, Vietnam',
  'Bình Tân, Ho Chi Minh City, Vietnam',
  'Quận 7, Ho Chi Minh City, Vietnam',
  'Thủ Đức, Ho Chi Minh City, Vietnam',
  'Củ Chi, Ho Chi Minh City, Vietnam',
  'Quận 1, Ho Chi Minh City, Vietnam',
  'Quận 8, Ho Chi Minh City, Vietnam',
  'Quận 9, Ho Chi Minh City, Vietnam',
  'Quận 10, Ho Chi Minh City, Vietnam',
  'Quận 11, Ho Chi Minh City, Vietnam',
  'Quận 12, Ho Chi Minh City, Vietnam',
  'Quận 2, Ho Chi Minh City, Vietnam',
  'Quận 3, Ho Chi Minh City, Vietnam',
  'Quận 6, Ho Chi Minh City, Vietnam',
  'Gò Vấp, Ho Chi Minh City, Vietnam',
  'Tân Phú, Ho Chi Minh City, Vietnam',
  'Thành Phố Thủ Dầu Một, Binh Duong, Vietnam',
  'Biên Hòa, Dong Nai, Vietnam',
  'Long Thành, Dong Nai, Vietnam',
  'Vĩnh Cửu, Dong Nai, Vietnam',
  'Thống Nhất, Dong Nai, Vietnam',
  'Trảng Dài, Dong Nai, Vietnam',
  'Long Khánh, Dong Nai, Vietnam',
  'Cam My, Dong Nai, Vietnam',
  'Xuân Lộc, Dong Nai, Vietnam',
  'Long Bình, Dong Nai, Vietnam',
  'Nhơn Trạch, Dong Nai, Vietnam',
  'Thành Phố Kon Tum, Kon Tum, Vietnam',
  'Kon Rẫy, Kon Tum, Vietnam',
  'Đắk Hà, Kon Tum, Vietnam',
  'Hanoi, Hanoi, Vietnam',
  'Hoàn Kiếm, Hanoi, Vietnam',
  'Hai Bà Trưng, Hanoi, Vietnam',
  'Cầu Giấy, Hanoi, Vietnam',
  'Hà Đông, Hanoi, Vietnam',
  'Thanh Xuân, Hanoi, Vietnam',
  'Đống Đa, Hanoi, Vietnam',
  'Nam Từ Liêm, Hanoi, Vietnam',
];
const JobTitle = [
  'Assistant',
  'Associate',
  'Account Manager',
  'Sales Attendant',
  'Sales Advocate',
  'Analyst',
  'Sales And Marketing Specialist',
  'Administrative Clerk',
  'Administrative Aide',
  'Business Owner',
  'Business Specialist',
  'Budget Accountant',
  'Bank Accountant',
  'Board Member',
  'Branch Manager',
  'Business Development Specialist',
  'Consultant',
  'Chief Executive Officer',
  'Compiler Engineer',
  'Customer Service Specialist',
];
const Companies = [
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727671916/companies/atos.jpg',
      public_id: 'atos',
    },
    name: 'Atos',
    typeOfBusiness: 'IT Services and IT Consulting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727672790/companies/adobe.jpg',
      public_id: 'adobe',
    },
    name: 'Adobe',
    typeOfBusiness: 'Software Development',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727672972/companies/acca.jpg',
      public_id: 'acca',
    },
    name: 'ACCA',
    typeOfBusiness: 'Accounting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727673277/companies/amazon.jpg',
      public_id: 'amazon',
    },
    name: 'Amazon',
    typeOfBusiness: 'Software Development',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727673596/companies/adp.jpg',
      public_id: 'adp',
    },
    name: 'ADP',
    typeOfBusiness: 'Human Resources Services',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727674074/companies/FptSoftware.jpg',
      public_id: 'FptSoftware',
    },
    name: 'Fpt Software',
    typeOfBusiness: 'IT Services and IT Consulting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727674308/companies/blackrock.jpg',
      public_id: 'blackrock',
    },
    name: 'Blackrock',
    typeOfBusiness: 'Financial Services',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727674529/companies/bp.jpg',
      public_id: 'bp',
    },
    name: 'BP',
    typeOfBusiness: 'Oil And Gas',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727674649/companies/ernstandyoung.jpg',
      public_id: 'ernstandyoung',
    },
    name: 'Ernst And Young',
    typeOfBusiness: 'IT Services and IT Consulting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727675684/companies/microsoft.jpg',
      public_id: 'microsoft',
    },
    name: 'Microsoft',
    typeOfBusiness: 'Software Development',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727675793/companies/cognizant.jpg',
      public_id: 'cognizant',
    },
    name: 'Cognizant',
    typeOfBusiness: 'IT Services and IT Consulting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727675872/companies/cgi.jpg',
      public_id: 'cgi',
    },
    name: 'CGI',
    typeOfBusiness: 'IT Services and IT Consulting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727675959/companies/chevron.jpg',
      public_id: 'chevron',
    },
    name: 'Chevron',
    typeOfBusiness: 'Oil And Gas',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727676072/companies/cbre.jpg',
      public_id: 'cbre',
    },
    name: 'CBRE',
    typeOfBusiness: 'Real Estate',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727676246/companies/deloitte.jpg',
      public_id: 'deloitte',
    },
    name: 'Deloitte',
    typeOfBusiness: 'Business Consulting and Services',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727676515/companies/datadog.jpg',
      public_id: 'datadog',
    },
    name: 'Datadog',
    typeOfBusiness: 'Software Development',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727676639/companies/danone.jpg',
      public_id: 'danone',
    },
    name: 'Danone',
    typeOfBusiness: 'Food And Beverage Manufactoring',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727676866/companies/doordash.jpg',
      public_id: 'doordash',
    },
    name: 'Doordash',
    typeOfBusiness: 'Software Development',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727677107/companies/exl.jpg',
      public_id: 'exl',
    },
    name: 'EXL',
    typeOfBusiness: 'IT Services and IT Consulting',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727677270/companies/emirates.jpg',
      public_id: 'emirates',
    },
    name: 'Emirates',
    typeOfBusiness: 'Airlines and Aviation',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727677432/companies/erm.jpg',
      public_id: 'erm',
    },
    name: 'ERM',
    typeOfBusiness: 'Business Consulting and Services',
  },
];
const Universities = [
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727671604/universities/AmityUniversity.jpg',
      public_id: 'AmityUniversity',
    },
    name: 'Amity University',
    region: 'India',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727677623/universities/hcmute.jpg',
      public_id: 'hcmute',
    },
    name: 'HCMC University of Technology and Education',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727677871/universities/hutech.jpg',
      public_id: 'hutech',
    },
    name: 'Hutech',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727678005/universities/vnu.jpg',
      public_id: 'vnu',
    },
    name: 'International University - VNU HCMC',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727678139/universities/hubt.jpg',
      public_id: 'hubt',
    },
    name: 'Hanoi University of Business and Technology',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727678314/universities/lse.jpg',
      public_id: '',
    },
    name: 'The London School of Economics and Political Science',
    region: 'United Kingdom',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727678696/universities/afpa.jpg',
      public_id: 'afpa',
    },
    name: 'AFPA',
    region: 'France',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727678955/universities/BrownUniversity.jpg',
      public_id: 'BrownUniversity',
    },
    name: 'Brown University',
    region: 'United States',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727679118/universities/sda.jpg',
      public_id: 'sda',
    },
    name: 'SDA Bocconi',
    region: 'Italy',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727679206/universities/cae.jpg',
      public_id: 'cae',
    },
    name: 'CAE',
    region: 'Canada',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727679398/universities/curtinuniversity.jpg',
      public_id: 'curtinuniversity',
    },
    name: 'Curtin University',
    region: 'Australia',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727679521/universities/copenhagenbusinessschool.jpg',
      public_id: 'copenhagenbusinessschool',
    },
    name: 'Copenhagen Business School',
    region: 'Denmark',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727679688/universities/psl.jpg',
      public_id: 'pls',
    },
    name: 'University Paris Dauphine - PSL',
    region: 'France',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727680044/universities/emeritused.jpg',
      public_id: 'emeritused',
    },
    name: 'Emeritused',
    region: 'Singapore',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727680219/universities/uah.jpg',
      public_id: 'uah',
    },
    name: 'University of Architecture of Ho Chi Minh City',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727680558/universities/uit.jpg',
      public_id: 'uit',
    },
    name: 'University of Information Technology',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727680895/universities/huit.jpg',
      public_id: 'huit',
    },
    name: 'Ho Chi Minh City University of Industry and Trade (HUIT)',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727681031/universities/ulaw.jpg',
      public_id: 'ulaw',
    },
    name: 'Ho Chi Minh City University of Law (ULAW)',
    region: 'Viet Nam',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727681270/universities/harvard.jpg',
      public_id: 'harvard',
    },
    name: 'Harvard University',
    region: 'United States',
  },
  {
    avatar: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1727681413/universities/rmit.jpg',
      public_id: 'rmit',
    },
    name: 'RMIT University',
    region: 'Viet Nam',
  },
];

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

export const getCompanies = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  const query = (q as string)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '');

  const companies = Companies.filter(value =>
    value.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  res.status(200).json({
    data: companies,
  });
});

export const getUniversities = catchAsyncError(async (req, res, next) => {
  const {q} = req.query;

  const query = (q as string)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '');

  const universities = Universities.filter(value =>
    value.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  res.status(200).json({
    data: universities,
  });
});
