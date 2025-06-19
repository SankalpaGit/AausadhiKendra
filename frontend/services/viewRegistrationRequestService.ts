// services/OrganizationRequest.ts
// this service is reposible for the API calls related to donor organization requests
// Integrated in (admin)/admin/(routes)/requests/donor/page.tsx

import axios from 'axios';
import getAuthToken from './getAuthTokenService';

const BASE_URL = 'http://localhost:5134/api';


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

