# Lion Dynasty Agency — paquet de déploiement V31

Cette archive est préparée pour un **nouveau service Render**, séparé du site existant.

## Contenu
- `server.js` : serveur Express et API PostgreSQL
- `public/` : interface du portail
- `render.yaml` : Blueprint Render pour créer le service web et sa base PostgreSQL
- `.env.example` : exemple de variables locales
- `.gitignore` : évite d'envoyer les secrets et `node_modules`

## Déploiement sur un nouveau site Render

1. Décompressez cette archive sur votre PC.
2. Créez un **nouveau dépôt GitHub** (par exemple `lion-dynasty-agency-v31`).
3. Envoyez tous les fichiers et dossiers de cette archive à la racine du dépôt. Le fichier `render.yaml` doit être à la racine.
4. Dans Render, choisissez **New + → Blueprint**, puis connectez ce nouveau dépôt GitHub.
5. Vérifiez le plan et le coût affichés, puis validez la création des ressources.
6. Render doit créer le service web `lion-dynasty-agency-new` et la base `lion-dynasty-db`. La variable `DATABASE_URL` est reliée automatiquement et `SESSION_SECRET` est générée.
7. Attendez que le déploiement soit terminé, puis ouvrez l'URL `.onrender.com` attribuée au nouveau service.
8. Vérifiez `https://VOTRE-NOUVEAU-SITE.onrender.com/health` : la réponse attendue contient `"ok": true`.

## Configuration optionnelle Daily

Pour activer les réunions vidéo, ajoutez `DAILY_API_KEY` dans **Render → service web → Environment**. Utilisez une clé API privée Daily. Ne mettez jamais cette clé dans `public/` ou dans GitHub.

## Important
- Le Blueprint utilise un service web gratuit et une base PostgreSQL `basic-256mb` persistante, qui peut être payante. Vérifiez les prix affichés dans Render avant de confirmer.
- Le service gratuit peut s'endormir après une période d'inactivité.
- Cette archive ne crée pas automatiquement le dépôt GitHub et ne peut pas créer le service Render sans accès autorisé à vos comptes.
- N'utilisez pas une ancienne base de données si vous souhaitez garder ce nouveau site complètement séparé de l'ancien.
- Le premier compte Fondateur doit être créé selon le mécanisme d'initialisation déjà présent dans le code du projet.
- Les fichiers de coloriage sont stockés en base PostgreSQL. Pour des fichiers proches de 1 Go, un stockage objet externe est recommandé.
- Ne partagez jamais vos secrets, mots de passe ou clés API dans la conversation.

## Fonctionnalités documentées dans la base V30/V31
- rôles et gestion des accès
- coloriages avec votes et filtre Halloween
- matchs officiels avec modification et suppression par les rôles de gestion
- réunions Daily (si la clé est configurée)
- lien d'invitation agence
