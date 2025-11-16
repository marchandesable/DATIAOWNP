# DATIAOWNP – App mobile (MVP)

## 🎯 Objectif

Développer une app mobile (iOS + Android) en React Native permettant :

- Onboarding + consentement utilisateur
- Collecte passive :
  - nombre de pas
  - durée de sommeil (via HealthKit / Google Fit)
- Collecte active :
  - humeur (1–5)
  - énergie (1–5)
  - stress (1–5)
- Anonymisation locale (UUID + hash + salt)
- Envoi des données au backend DATIAOWNP
- Dashboard simple (historique + récompense fictive)
- Notification quotidienne pour la saisie

---

## 📁 Structure recommandée

- `screens/` : écrans principaux (Onboarding, Dashboard, History, Inputs…)
- `components/` : composants réutilisables
- `services/` : client API (appel du backend)
- `config/` : constantes, URL backend
- `contexts/` : context global (user, data…)
- `utils/` : fonctions utilitaires

---

## 🧰 Stack souhaitée

- React Native (Expo ou CLI — choix du développeur)
- TypeScript recommandé
- Intégration :
  - **HealthKit** (iOS)
  - **Google Fit** (Android)
- Appels API vers backend (voir dossier `../backend`)

---

## 🔌 Endpoints backend

- `GET /health`
- `POST /api/data`
- `POST /api/simulate-ai-consumption`
- `GET /api/reward/:user_hash`

---

## 📚 Documentation complète disponible dans :

- `docs/whitepaper/Whitepaper_V1_DATIAOWNP_complet.md`
- `docs/whitepaper/DATIAOWNP_Brief_Developpeur_Complet.md`
- `mvp/DATIAOWNP_Specs_MVP_v1_complet.md`

