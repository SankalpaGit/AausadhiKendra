import axios from 'axios';
import getAuthToken from './getAuthTokenService';

const BASE_URL = 'http://localhost:5134/api';


// Function to verify a donor by ID
// isVerified is a boolean indicating whether the donor is verified or not
export const verifyDonor = async (donorId: string, isVerified: boolean) => {
  const token = getAuthToken();
  if (!token) throw new Error('No token found');

  const response = await axios.put(
    `${BASE_URL}/donor/verify/${donorId}`,
    isVerified,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};