import {baseUrlApi} from './baseUrlApi';

type Data = {
  data: string[] | null;
  message: string;
};

export async function getLocations(query: string): Promise<Data> {
  try {
    const res = await fetch(`${baseUrlApi}/externals/location?q=${query}`);
    const data: Data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: ''};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}

export async function getJobTitles(query: string): Promise<Data> {
  try {
    const res = await fetch(`${baseUrlApi}/externals/job-title?q=${query}`);
    const data: Data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: ''};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}

export async function getCompanies(query: string): Promise<Data> {
  try {
    const res = await fetch(`${baseUrlApi}/externals/company?q=${query}`);
    const data: Data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: ''};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}

export async function getUniversities(query: string): Promise<Data> {
  try {
    const res = await fetch(`${baseUrlApi}/externals/university?q=${query}`);
    const data: Data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: ''};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}
