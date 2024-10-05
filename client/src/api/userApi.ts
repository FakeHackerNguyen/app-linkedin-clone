import {baseUrlApi} from './baseUrlApi';

export async function register(userInfo: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${baseUrlApi}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {errorMessage: null};
  } catch (error) {
    if (error instanceof Error) {
      return {errorMessage: error.message};
    }

    return {errorMessage: 'An unknown error occurred'};
  }
}

export async function updateUser(formData: URLSearchParams) {
  try {
    const res = await fetch(`${baseUrlApi}/users/update-info`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData.toString(),
    });

    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {errorMessage: null};
  } catch (error) {
    if (error instanceof Error) {
      return {errorMessage: error.message};
    }

    return {errorMessage: 'An unknown error occurred'};
  }
}

export async function updateAvatar(formData: FormData) {
  try {
    const res = await fetch(`${baseUrlApi}/users/update-avatar`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {errorMessage: null};
  } catch (error) {
    if (error instanceof Error) {
      return {errorMessage: error.message};
    }

    return {errorMessage: 'An unknown error occurred'};
  }
}

export async function sendOtp(email: string, reason: string) {
  try {
    const res = await fetch(`${baseUrlApi}/users/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, reason}),
    });

    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {errorMessage: null};
  } catch (error) {
    if (error instanceof Error) {
      return {errorMessage: error.message};
    }

    return {errorMessage: 'An unknown error occurred'};
  }
}

export async function verifyOtp(email: string, otp: string, reason: string) {
  try {
    const res = await fetch(`${baseUrlApi}/users/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, otp, reason}),
    });

    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {data: data.data, errorMessage: null};
  } catch (error) {
    if (error instanceof Error) {
      return {errorMessage: error.message};
    }

    return {errorMessage: 'An unknown error occurred'};
  }
}

export async function resetPassword(
  email: string,
  otp: string,
  reason: string,
  newPassword: string,
) {
  try {
    const res = await fetch(`${baseUrlApi}/users/reset-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, otp, reason, newPassword}),
    });

    const data = await res.json();

    if (data.message) {
      throw new Error(data.message);
    }

    return {errorMessage: null};
  } catch (error) {
    if (error instanceof Error) {
      return {errorMessage: error.message};
    }

    return {errorMessage: 'An unknown error occurred'};
  }
}
