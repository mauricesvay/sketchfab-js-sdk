var CONFIG = {
    HOSTNAME: 'sketchfab.com',

    BASE_API_URL: 'https://api.{{HOSTNAME}}',
    BASE_SERVER_URL: 'https://{{HOSTNAME}}',

    POLL_ENDPOINT: '/v2/models/{uid}/status',
    MODEL_URL: '/models/{uid}',

    CATEGORIES_ENDPOINT: '/v2/categories',
    COLLECTIONS_ENDPOINT: '/i/collections',
    COMMENTS_ENDPOINT: '/i/comments',
    MODELS_ENDPOINT: '/v2/models',
    USERS_ENDPOINT: '/v2/users',
    FEED_ENDPOINT: '/i/feeds',
};

module.exports = CONFIG;
