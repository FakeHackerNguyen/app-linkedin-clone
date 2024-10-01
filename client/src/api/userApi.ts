import {baseUrlApi} from './baseUrlApi';

type Data = {
  data: string[] | null;
  message: string;
};

export async function register(query: string): Promise<Data> {
  try {
    const res = await fetch(`${baseUrlApi}/externals/location?q=${query}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
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
