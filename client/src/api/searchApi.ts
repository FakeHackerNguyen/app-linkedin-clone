import {baseUrlApi} from './baseUrlApi';

export async function searchCompany(query: string) {
  try {
    const res = await fetch(`${baseUrlApi}/searchs/company?q=${query}`);
    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: null};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}

export async function searchUniversity(query: string) {
  try {
    const res = await fetch(`${baseUrlApi}/searchs/university?q=${query}`);
    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: null};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}

export async function searchCommon(query: string) {
  try {
    const res = await fetch(`${baseUrlApi}/searchs/common?q=${query}`);
    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, message: null};
  } catch (error) {
    if (error instanceof Error) {
      return {data: null, message: error.message};
    }
    return {data: null, message: 'An unknown error occurred'};
  }
}
