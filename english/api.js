// api.js - ننشئ هذا الملف جديد
const API_BASE_URL = 'https://kamela-backend-1.onrender.com';

class API {
    static async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options
            });
            
            // إذا الرد مش JSON (مثل 204 No Content)
            if (response.status === 204) {
                return { success: true, data: null, status: response.status };
            }
            
            const data = await response.json();
            return { success: response.ok, data, status: response.status };
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, data: { detail: 'Connection error' } };
        }
    }

    static async get(endpoint) {
        return this.request(endpoint);
    }

    static async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// دوال محددة للباك إند
export const PropertyAPI = {
    getAll: () => API.get('/places'),
    getById: (id) => API.get(`/places/${id}`),
    createBooking: (placeId, bookingData) => API.post(`/places/${placeId}/bookings`, bookingData),
    createPlace: (placeData) => API.post('/places', placeData),
    deletePlace: (placeId) => API.delete(`/places_d/${placeId}`)
};

export const CalendarAPI = {
    getBookedDates: (placeId) => API.get(`/calendar/${placeId}/booked-dates`)
};

export const AuthAPI = {
    login: (credentials) => API.post('/login', credentials),
    register: (userData) => API.post('/register', userData),
    forgotPassword: (email) => API.post('/forgot-password', { email })
};

export const BookingAPI = {
    updateStatus: (bookingId, newStatus) => API.put(`/booking/${bookingId}/status`, { new_status: newStatus })
};

export const ContactAPI = {
    submit: (contactData) => API.post('/contact', contactData)
};

export const ReviewAPI = {
    submit: (reviewData) => API.post('/review', reviewData)
};