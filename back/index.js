import express from "express";
import routes from "./Routes/routes.js";
import cors from 'cors'; // Importer CORS
import session from 'express-session'; // Importer express-session

const app = express();
const port = 3000;

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173', // Autoriser seulement ton frontend React
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Configuration de la session
app.use(session({
  secret: 'menoh22Test', // Change ce secret pour plus de sécurité
  resave: false, // Ne pas sauvegarder la session si elle n'est pas modifiée
  saveUninitialized: false, // Créer une session même si elle est vide
  cookie: {
    // secure: false
    maxAge: 1000 * 60* 60 * 24
  } // Si tu utilises HTTP, sinon true pour HTTPS
}));

app.use('/uploads', express.static('uploads'));

// Utilisation des routes
app.use('/api', routes); // Préfixe '/api' pour les routes

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
