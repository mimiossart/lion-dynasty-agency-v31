# Lion Dynasty Agency — déploiement gratuit

Cette version cible un nouveau service Render sur le plan gratuit. Elle ne crée aucune base Render payante.

## Important sur le gratuit
- Le serveur Render Free s'endort après 15 minutes sans requêtes et peut prendre environ une minute à redémarrer.
- Il faut une base PostgreSQL gratuite externe pour l'application. Le plan gratuit de Supabase est une option, sous réserve de ses limites et conditions actuelles.
- Ne pas utiliser une base Render gratuite pour des données durables : elle expire après 30 jours.
- Le stockage local du serveur Render est éphémère : les fichiers téléversés ne doivent pas y être stockés à long terme.
- Daily vidéo peut nécessiter une configuration/une facturation distincte.

## Étapes
1. Créez un projet PostgreSQL gratuit chez un fournisseur qui propose un plan gratuit (par exemple Supabase) et copiez sa chaîne de connexion PostgreSQL. Vérifiez les limites et conditions du fournisseur.
2. Créez un nouveau dépôt GitHub, par exemple `lion-dynasty-agency-free`, et envoyez tous les fichiers de cette archive à sa racine.
3. Dans Render, choisissez **New + → Web Service**, reliez le nouveau dépôt et choisissez **Free**. Build command : `npm install`. Start command : `npm start`.
4. Dans Render → Environment, ajoutez `DATABASE_URL` avec la chaîne PostgreSQL du fournisseur et `SESSION_SECRET` avec une longue valeur aléatoire. Gardez ces secrets privés. Gardez `NODE_ENV=production`.
5. Lancez le déploiement et vérifiez `https://VOTRE-SITE.onrender.com/health`.
6. Pour Daily, configurez `DAILY_API_KEY` côté serveur seulement si vous utilisez cette fonction.

## Coût
Cette configuration n'ajoute aucun service Render payant. Le fournisseur de base doit être choisi sur son plan gratuit. Vérifiez régulièrement les limites, car les offres gratuites peuvent changer.

## Limites fonctionnelles à considérer
Les données relationnelles peuvent être conservées dans la base externe, mais les fichiers image téléversés ne doivent pas dépendre du disque local Render. Pour une galerie de coloriages durable, un stockage objet gratuit adapté est nécessaire; ses limites peuvent rendre impossible le stockage de très gros fichiers.
