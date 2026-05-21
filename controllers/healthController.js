const mongoose = require('mongoose');

const checkHealth = (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const health = {
        status: dbStatus === 'connected' ? 'UP' : 'DOWN',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
            database: dbStatus
        }
    };

    if (dbStatus === 'connected') {
        return res.status(200).json(health);
    } else {
        return res.status(503).json(health);
    }
};

module.exports = { checkHealth };
