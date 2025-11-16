# DATIAOWNP – BRIEF DÉVELOPPEUR (VERSION COMPLETE)

## 1. Résumé du projet
DATIAOWNP est un protocole mobile-first permettant aux utilisateurs de :
- collecter volontairement des données comportementales (pas, sommeil),
- saisir des données émotionnelles (humeur, énergie, stress),
- anonymiser localement ces données,
- les transmettre à un backend,
- recevoir des rewards fictifs lorsque des “IA clientes” consomment ces données.

Le MVP n'intègre aucune blockchain réelle : tout est simulé.
Objectif : démontrer la valeur du concept + valider l'architecture.

---

## 2. Objectifs du MVP

Le MVP doit permettre :
1. Installation app mobile iOS/Android (React Native)
2. Consentement et configuration des données collectées
3. Collecte passive : pas + sommeil
4. Collecte active : humeur / énergie / stress
5. Anonymisation locale (hash + salt)
6. Envoi des données quotidiennement
7. Backend minimal capable de stocker les données et simuler la consommation par une IA
8. App mobile affichant historique + rewards + notifications

---

## 3. Technologies imposées

### Mobile
- React Native
- TypeScript recommandé

### Backend
- Node.js (Express)
- Base PostgreSQL ou SQLite
- API REST JSON

---

## 4. Architecture
React Native App → Backend Node.js → Base de données

Voir sections suivantes pour les détails.

---

## 5. Écrans
- Onboarding
- Dashboard
- Historique
- Saisie humeur/énergie/stress
- Paramètres

---

## 6. Collecte des données
- Passive : pas, sommeil (HealthKit / Google Fit)
- Active : humeur, énergie, stress

---

## 7. Anonymisation locale
UUID local + salt → hash → envoyé au backend

---

## 8. API
- POST /api/data
- POST /api/simulate-ai-consumption
- GET /api/reward/:user_hash

---

## 9. Base de données
Tables :
- daily_data
- rewards

---

## 10. Livrables
- Code RN (iOS + Android)
- APK Android
- Build iOS (TestFlight)
- Backend Node.js + DB
- Documentation complète

---

## 11. Organisation du travail
GitHub : branches main / dev  
Livraison sur 4 semaines avec milestones définies.

---

## 12. Critères d’acceptation
App fonctionnelle, anonymisation respectée, API OK, rewards visibles, tests OK.
