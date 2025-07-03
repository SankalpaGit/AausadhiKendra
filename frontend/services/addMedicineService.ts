const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const singleUploadMedicine = async (medicine: {
    name: string;
    quantity: number;
    expiryDate: string;
    unitPrice: number;
    donorId: string;
}) => {
    const res = await fetch(`${API_BASE_URL}/medicine/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if needed
        },
        body: JSON.stringify(medicine),
    });

    return await res.json();
};

export const bulkUploadMedicine = async (data: {
    medicines: {
        name: string;
        quantity: number;
        expiryDate: string;
        unitPrice: number;
        donorId: string;
    }[];
}) => {
    const res = await fetch(`${API_BASE_URL}/medicine/add-bulk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if needed
        },
        body: JSON.stringify(data),
    });

    return await res.json();
};
