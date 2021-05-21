const http = require('http');
const httpServer = http.createServer();

httpServer.on('request', (request, response) => {
    // On spécifie l'entête pour le CORS
    response.setHeader('Access-Control-Allow-Origin', '*');

    // On gère le cas où le navigateur fait un pré-contrôle avec OPTIONS ...
    // ... pas besoin d'aller plus loin dans le traitement, on renvoie la réponse
    if (request.method === 'OPTIONS') {
        // On liste des méthodes et les entêtes valides
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

        return response.end();
    }

    // suite du traitement ...
});

httpServer.listen(3000);