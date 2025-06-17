// services/OrganizationRequest.ts
// this service is reposible for the API calls related to donor organization requests
// Integrated in (admin)/admin/(routes)/requests/donor/page.tsx

import axios from 'axios';

const BASE_URL = 'http://localhost:5134/api';

// Function to get the authentication token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Function to fetch organization requests
export const fetchOrganizationDonors = async () => {
  const token = getAuthToken();
  if (!token) throw new Error('No token found');

  const response = await axios.get(`${BASE_URL}/admin-review/organization-donors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

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
