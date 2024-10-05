import ICompany from '../interfaces/feature/page/company.interface';
import IUniversity from '../interfaces/feature/page/university.interface';
import companyModel from '../models/company.model';
import universityModel from '../models/university.model';

export default class PageService {
  static async getCompaniesByName(query: string): Promise<ICompany[]> {
    const q = query
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');

    const allCompanies = await companyModel.find().lean();
    const companies = allCompanies.filter(value =>
      value.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
    return companies;
  }
  static async getUniversitiesByName(query: string): Promise<IUniversity[]> {
    const q = query
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');

    const allUniversities = await universityModel.find().lean();
    const universities = allUniversities.filter(value =>
      value.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
    return universities;
  }
}
