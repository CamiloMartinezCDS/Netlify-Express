require('dotenv').config()

const config = {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    BRANCH_API_KEY: process.env.BRANCH_API_KEY,
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
}

module.exports = config;