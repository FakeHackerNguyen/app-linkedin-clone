import {baseUrlApi} from './baseUrlApi';

export async function getLocations(query: string) {
  try {
    const res = await fetch(`${baseUrlApi}/externals/location?q=${query}`);
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

export async function getJobTitles(query: string) {
  try {
    const res = await fetch(`${baseUrlApi}/externals/job-title?q=${query}`);
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
