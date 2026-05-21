const cors = require('cors');

/**
 * Parses the FRONTEND_URL environment variable into an array of allowed origins.
 * Trims whitespace and removes trailing slashes for standard CORS origin matching.
 * 
 * @returns {string|string[]}
 */
const getAllowedOrigins = () => {
    if (process.env.NODE_ENV === "development") {
        return "*";
    }

    const frontendUrls = process.env.FRONTEND_URL;
    if (!frontendUrls) {
        console.warn("Warning: FRONTEND_URL environment variable is not defined. Defaulting to allow all origins in non-development mode.");
        return "*";
    }

    return frontendUrls.split(',').map(url => {
        let trimmed = url.trim();
        // Remove trailing slash if it exists
        if (trimmed.endsWith('/')) {
            trimmed = trimmed.slice(0, -1);
        }
        return trimmed;
    });
};

/**
 * @type {cors.CorsOptions}
 */
const corsOptions = {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: "600"
};

console.log("CORS Node Env:", process.env.NODE_ENV);
console.log("CORS Allowed Origins:", corsOptions.origin);

module.exports = cors(corsOptions);