# DATIAOWNP – Spécifications MVP v1

## 1. Objectif du MVP

Créer une première version fonctionnelle de DATIAOWNP qui permet :

- à un utilisateur d’installer une app mobile (React Native, iOS/Android),
- de partager volontairement :
  - des données **passives** (pas, sommeil),
  - des données **actives** (humeur, énergie, stress),
- d’assurer une **anonymisation locale** avant envoi,
- de transmettre ces données à un backend minimal,
- de simuler un **reward fictif** lorsqu’un “client IA” consomme ces données.

Le MVP sert à **démontrer le concept** (proof of concept), pas à couvrir tout le scope du protocole.

---

## 2. Périmètre du MVP

### Inclus

- App mobile React Native (iOS + Android) :
  - écran d’onboarding,
  - écran de consentement / configuration,
  - lecture pas + sommeil (si disponible via API),
  - sliders d’humeur / énergie / stress,
  - écran de visualisation simple (graphique simple ou liste),
  - écran “récompenses” (DATIA fictifs).
- Anonymisation locale des données (pseudonyme hashé).
- Backend minimal (Node/Express ou équivalent) :
  - endpoints REST pour recevoir les données,
  - stockage (base de données ou JSON store),
  - endpoint mock “IA client” qui déclenche une consommation de données.
- Logiciel de reward fictif (points DATIA simulés, pas encore on‑chain).

### Exclu pour le MVP

- Smart contracts réels sur blockchain (prévu en phase suivante).
- Marketplace IA complète.
- Tableau de bord web avancé.
- Permissions granulaires complexes (v1 simplifiée).
- Optimisation de performance / scale.

---

## 3. Persona cible

**Persona principal :**  
Adultes 25–55 ans, utilisateurs de smartphones, intéressés par :

- bien‑être,
- compréhension de leurs propres cycles,
- démarche “data ownership”.

Le MVP n’est pas pensé pour le grand public mais pour :

- early adopters,
- beta‑testeurs,
- partenaires potentiels,
- démonstration à des investisseurs.

---

## 4. Parcours utilisateur (MVP)

### 4.1 Onboarding

1. L’utilisateur installe l’app.
2. Premier écran : présentation courte de DATIAOWNP (3 points).
3. Écran suivant : demande d’accès aux données santé (pas, sommeil) – optionnel et explicite.
4. L’utilisateur choisit :
   - “Partager mes pas” (oui/non),
   - “Partager mon sommeil” (oui/non).
5. L’utilisateur accepte (ou non) la collecte d’humeur / énergie / stress via sliders.

### 4.2 Collecte quotidienne

- En arrière-plan : l’app récupère chaque jour :
  - le nombre de pas,
  - la durée de sommeil (si disponible).
- 1 fois par jour, à une heure configurable (par défaut 20h) :
  - l’app affiche une notification :  
    “Comment vous sentez‑vous aujourd’hui ?”
  - l’utilisateur peut saisir :
    - humeur (1–5),
    - énergie (1–5),
    - stress (1–5),
  - ou ignorer (aucune obligation).

### 4.3 Visualisation simple

L’utilisateur peut voir :

- un récapitulatif de ses derniers jours :
  - pas / jour,
  - sommeil / nuit,
  - humeur / énergie / stress sur un petit graphique ou une liste.
- un “score de contribution” (nombre de jours valides).

### 4.4 Reward fictif

- Une fois par session (par exemple via un bouton “Simuler une IA cliente” ou via une tâche CRON côté backend), l’app simule :
  - la vente d’un flux de données anonymisées à une IA.
- L’utilisateur voit :
  - “Une IA de bien‑être a utilisé vos données anonymisées.”  
  - “+0,01 DATIA (fictif) ajouté à votre solde.”

---

## 5. Données collectées et format

### 5.1 Côté mobile (avant anonymisation)

- Identifiant local (UUID généré à l’installation).
- Pour chaque jour :
  - date,
  - pas (entier),
  - sommeil en heures (float),
  - humeur (1–5, entier ou null),
  - énergie (1–5, entier ou null),
  - stress (1–5, entier ou null).

### 5.2 Anonymisation locale

L’app génère :

- un `user_hash` = hash( UUID_local + salt_local ).

Le backend **ne connaît jamais** l’UUID, ni l’identité.

### 5.3 Payload envoyé au backend

Exemple JSON :

```json
{
  "user_hash": "a8c9f9e8f2...",
  "date": "2025-11-10",
  "steps": 7421,
  "sleep_hours": 6.8,
  "mood": 4,
  "energy": 3,
  "stress": 2,
  "client_version": "mvp-0.1.0",
  "platform": "ios"
}
```

---

## 6. Architecture technique MVP

### 6.1 App mobile (React Native)

- Stack :
  - React Native,
  - TypeScript (idéalement),
  - librairie d’accès HealthKit (iOS) / Google Fit (Android),
  - gestion des permissions OS.

- Écrans :
  - Onboarding (texte + consentement),
  - Dashboard (récap données + reward),
  - Écran saisie humeur/énergie/stress,
  - Paramètres (heure de notification, activation/desactivation des types de données).

### 6.2 Backend

- Stack suggestion :
  - Node.js + Express (ou NestJS minimal),
  - base de données simple (PostgreSQL, MongoDB, ou même SQLite en MVP),
  - API REST JSON.

- Responsabilités :
  - endpoint `POST /api/data` pour recevoir les payloads de données,
  - endpoint `GET /api/data/:user_hash` (optionnel, pour debug / tests),
  - endpoint `POST /api/simulate-ai-consumption` qui simule une IA cliente.

---

## 7. API – Endpoints (MVP)

### 7.1 `POST /api/data`

- **Description** : reçoit les données anonymisées d’un jour donné.
- Body (JSON) :
  - `user_hash` (string, requis),
  - `date` (string, format YYYY-MM-DD),
  - `steps` (number, optionnel),
  - `sleep_hours` (number, optionnel),
  - `mood`, `energy`, `stress` (numbers 1–5 ou null),
  - `platform`, `client_version` (optionnels, pour debug).
- Réponse :
  - 200 OK + `{ "status": "ok" }`
  - ou 400 en cas de format invalide.

### 7.2 `POST /api/simulate-ai-consumption`

- **Description** : endpoint interne de test, simule l’achat d’un batch de données par une IA.
- Body :
  - `{ "days": 30 }` (nombre de jours à considérer, par ex.).
- Comportement :
  - sélectionne un échantillon de `user_hash`,
  - incrémente un “solde fictif” en base pour chaque utilisateur sélectionné,
  - retourne un objet de synthèse :
    - nombre d’utilisateurs impactés,
    - récompense moyenne.

- Réponse exemple :

```json
{
  "status": "ok",
  "ai_client": "WellMind (simulé)",
  "users_rewarded": 120,
  "reward_per_user": 0.01
}
```

### 7.3 `GET /api/reward/:user_hash`

- **Description** : retourne le solde fictif DATIA d’un utilisateur.
- Réponse :

```json
{
  "user_hash": "a8c9f9e8f2...",
  "reward_balance": 0.27
}
```

L’app mobile peut interroger cet endpoint pour afficher le solde de rewards.

---

## 8. Sécurité (niveau MVP)

- Utilisation de HTTPS obligatoire pour les appels API.
- Aucune donnée identifiante (nom, email, téléphone) n’est jamais envoyée.
- `user_hash` est généré localement et ne permet pas de retrouver l’utilisateur.
- Journaux côté serveur :
  - minimiser les logs,
  - ne jamais logguer les payloads bruts en production (MVP : logs activés en environnement de test uniquement).

---

## 9. UX & contraintes

- Temps d’interaction pour les données actives (humeur/énergie/stress) :
  - objectif : **< 3 secondes**.
- L’utilisateur doit pouvoir :
  - activer / désactiver chaque catégorie de données (pas, sommeil, humeur, etc.),
  - voir à tout moment ce qui est collecté.
- L’app doit fonctionner même si :
  - l’utilisateur ne répond jamais aux questions d’humeur,
  - les données de sommeil ne sont pas disponibles (téléphone sans capteur / wearable).

---

## 10. Scénarios de test (MVP)

1. **Installation + consentement**
   - Installer l’app.
   - Refuser l’accès aux données de santé → l’app ne plante pas, collecte seulement l’humeur/énergie/stress.
   - Accepter → l’app commence à récupérer des données passives.

2. **Envoi de données**
   - Générer un jour de données (manuellement ou via simulateur).
   - Vérifier que le payload arrive bien dans le backend.

3. **Simuler une IA cliente**
   - Appeler `/api/simulate-ai-consumption`.
   - Vérifier que des rewards sont générés.

4. **Affichage côté mobile**
   - L’utilisateur voit :
     - ses données (liste ou petit graphique),
     - son solde fictif DATIA,
     - un message indiquant qu’une IA a utilisé ses données (simulation).

---

## 11. Limites et prochaines itérations

### Limites MVP

- Rewards non on‑chain (points internes).
- Marketplace IA inexistante (un seul endpoint de simulation).
- Anonymisation simplifiée (hash local + segmentation).
- Aucun dashboard web.

### Prochaines étapes

- Déploiement de vrais smart contracts sur testnet.
- Définition de “data products” standards pour la marketplace.
- Mise en place d’un dashboard pour IA clientes.
- Amélioration de la granularité d’anonymisation (k‑anonymity, differential privacy, etc.).
- Ajout de nouveaux types de données (variabilité fréquence cardiaque, journaling texte anonymisé, etc.).

---

Ce document MVP v1 a pour objectif de donner à un développeur / freelance une base claire pour :

- estimer l’effort,
- construire l’architecture,
- livrer une app de démonstration réaliste,
- alignée sur la vision stratégique de DATIAOWNP.
