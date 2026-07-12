import { reactive } from 'vue';

// Try to parse stored token and user from localStorage
const storedToken = localStorage.getItem('token');
let storedUser = null;
try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        storedUser = JSON.parse(userStr);
    }
} catch (e) {
    console.error("Failed to parse user from localStorage", e);
}

export const store = reactive({
    token: storedToken || null,
    user: storedUser || null,
    
    get isAuthenticated() {
        return !!this.token;
    },
    
    get role() {
        return this.user ? this.user.role : null;
    },
    
    login(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    
    // Auth header for API calls
    get authHeader() {
        return this.token ? { 'Authorization': 'Bearer ' + this.token } : {};
    }
});
