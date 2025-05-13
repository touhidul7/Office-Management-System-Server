import { find_admin_only_with_id } from "./Check.js";

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin";

// Admin login controller
const admin_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Set a session or cookie manually (you can enhance this)
            res.cookie('admin_logged_in', true, { httpOnly: true, sameSite: "none", secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 }); // 3 days
            res.status(200).json({ email, loggedIn: true });
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Admin logout controller
const admin_logout = (req, res) => {
    try {
        res.clearCookie('admin_logged_in');
        res.status(200).json({ message: "Logged out!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Check admin login status
const check_admin_login = async (req, res) => {
    const isLoggedIn = req.cookies.admin_logged_in;

    if (isLoggedIn) {
        try {
            // Optional: You can return static or DB data here
            res.status(200).json({ email: ADMIN_EMAIL, loggedIn: true });
        } catch (error) {
            res.status(401).json({ loggedIn: false });
        }
    } else {
        res.status(401).json({ loggedIn: false });
    }
};

export { admin_login, admin_logout, check_admin_login };
