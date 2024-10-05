import 'dotenv/config';
import fs from 'fs';
import Database from '../../../config/database';
import companyModel from '../models/company.model';
import {Companies, Universities} from '../data';
import universityModel from '../models/university.model';

const db: Database =
  process.env.NODE_ENV === 'development'
    ? new Database(process.env.DB_LOCAL as string, {})
    : new Database(process.env.DB_HOST as string, {});

db.connect();

switch (process.argv[2]) {
  case '--companies':
    companyModel.create(Companies);
    break;
  case '--universities':
    universityModel.create(Universities);
    break;
}