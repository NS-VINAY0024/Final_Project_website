const BASE_URL = process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        return handleResponse(response);
    },
    post: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    }
};



export const fetchSmartCartData = async () => {
    const response = await fetch('/api/smartcart'); // Adjust endpoint as needed
    if (!response.ok) {
        throw new Error('Failed to fetch smart cart data');
    }
    return await response.json();
};


export const processPayment = async (items) => {
    const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
    });
    if (!response.ok) {
        throw new Error('Payment processing failed');
    }
    return await response.json(); // Expecting { success: true/false }
};
