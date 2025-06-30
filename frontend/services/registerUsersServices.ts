import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Function of the delivery partner registration
export const deliveryPartnerRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    licenseNumber: string;
    phoneNumber: string;
    vehicleType: string;
    vehicleNumber: string;
}) => {
    const response = await axios.post(`${API_BASE_URL}/delivery-partner/register`, data);
    return response.data;
};
