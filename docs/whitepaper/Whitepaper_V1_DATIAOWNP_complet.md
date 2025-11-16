# DATIAOWNP – Whitepaper V1 (Draft)

## 1. Résumé exécutif

DATIAOWNP est un protocole décentralisé conçu pour permettre à chaque individu de :

- **contrôler** ses données personnelles,
- les **anonymiser localement** sur son smartphone (edge computing),
- décider **ce qu’il partage** avec des IA et à quelles conditions,
- être **rémunéré automatiquement** dès qu’une IA consomme ses données.

L’ambition : devenir le **standard souverain** de la donnée personnelle anonymisée pour l’IA, en particulier dans un contexte européen (RGPD, AI Act).

---

## 2. Problème

La révolution IA repose sur un carburant : la donnée humaine.

Aujourd’hui :

- Les données sont **captées par quelques plateformes** (Apple, Google, Meta, etc.).
- Les individus **ne sont ni protégés, ni rémunérés**.
- Les régulations (RGPD, AI Act) rendent l’usage de données personnelles **de plus en plus risqué** pour les entreprises.
- Il n’existe **aucun protocole standard** permettant :
  - une anonymisation locale irréversible,
  - une **permission granulaire** par l’utilisateur,
  - une **monétisation directe** au profit des individus,
  - une **transparence on-chain** des accès IA.

En parallèle, les IA modernes (modèles de bien‑être, assistants personnels, agents cognitifs) ont un besoin croissant de **données comportementales et émotionnelles longitudinales** (activité, sommeil, humeur, énergie…).

Nous avons donc un **triple désalignement** :

1. Les humains produisent des données → **sans contrôle, sans revenus**.  
2. Les IA ont besoin de données riches → **mais ne peuvent pas y accéder légalement / simplement**.  
3. Les régulateurs exigent plus de privacy → **sans offrir de solution technique clé-en-main**.

---

## 3. Vision et proposition de valeur

**Vision :**  
Créer le **pont éthique et souverain** entre les humains producteurs de données et les IA qui en ont besoin.

**Proposition de valeur :**

- Pour les individus :
  - Propriété réelle sur leurs données.
  - Anonymisation locale sur smartphone.
  - Monétisation automatique (token DATIA).
  - Transparence totale sur l’usage par les IA.
- Pour les IA / entreprises / chercheurs :
  - Accès à des **flux de données réelles**, longitudinales, anonymes.
  - Conformité RGPD / AI Act via un protocole standardisé.
  - Paiement simplifié via smart contracts.
- Pour l’écosystème :
  - Un protocole ouvert, auditable, extensible.
  - Une alternative éthique au modèle “surveillance capitalism”.

---

## 4. Architecture globale du protocole

Architecture mobile‑first, construite autour de 5 briques :

1. **App mobile DATIAOWNP (React Native – iOS / Android)**  
   - Collecte de données passives :
     - nombre de pas,
     - durée de sommeil,
     - (optionnel) fréquence cardiaque si disponible.
   - Collecte de données actives :
     - humeur (slider 1–5),
     - niveau d’énergie (1–5),
     - niveau de stress (1–5).
   - Anonymisation locale (hash + segmentation).
   - Interface de consentement et de configuration.

2. **Backend API (MVP léger)**  
   - Réception des données déjà anonymisées.
   - Stockage sécurisé dans un datastore (chiffré).
   - Agrégation par utilisateurs anonymes.
   - Exposition de flux agrégés aux IA (MVP simple).

3. **Smart contracts (v1 sur testnet)**  
   - Token DATIA (utilitaire).
   - Paiement par les clients IA.
   - Redistribution automatique aux utilisateurs contributeurs.
   - Traces on‑chain de chaque utilisation de données.

4. **Data layer / Datastore**  
   - Stockage des flux anonymisés.
   - Indexation par attributs (type de données, durée, région, etc.).
   - Pré‑agrégation statistique pour requêtes IA.

5. **Marketplace IA ↔ Données (future release)**  
   - Catalogue de “data products” (ex : “30 jours activité + sommeil + humeur”).
   - Gestion des permissions et licences.
   - Acheminement des flux vers les IA clientes.

---

## 5. Données collectées (MVP)

### 5.1 Données passives (automatiques)

Collectées via les API système (HealthKit, Google Fit, etc.) :

- **Nombre de pas** par jour.
- **Durée de sommeil** par nuit (temps total).
- (Optionnel MVP+ : fréquence cardiaque moyenne journalière).

Caractéristiques :
- Collecte sans effort utilisateur.
- Strictement comportementales / physiologiques simples.
- Faciles à agréger et à anonymiser.

### 5.2 Données actives (émotionnelles / comportementales)

Saisies par l’utilisateur via micro‑interactions (sliders) :

- Humeur (1–5).
- Énergie (1–5).
- Stress (1–5).

Objectif : **capturer des signaux subjectifs** impossibles à déduire uniquement des capteurs.

Fréquence :
- Invitation quotidienne ou pluri‑hebdomadaire.
- Non obligatoire : l’utilisateur reste libre.

---

## 6. Anonymisation et privacy by design

### 6.1 Principes

- **Anonymisation locale** : les données sont transformées sur le smartphone AVANT d’être envoyées.
- **Irreversibilité** : aucun identifiant direct (nom, email, téléphone) n’est transmis.
- **Segmentation** :
  - séparation des métadonnées (région, tranche d’âge, etc.) du flux brut,
  - agrégation sur des fenêtres (ex : 30 jours).
- **Minimisation** : seules les données nécessaires au cas d’usage sont partagées.

### 6.2 Mécanisme (MVP simplifié)

1. Création d’un identifiant local pseudonyme (UID) stocké seulement dans l’app.
2. Hashage + salt local pour générer un identifiant **non réversible** côté serveur.
3. Envoi des données horodatées sous la forme :

```json
{
  "user_hash": "a8c9f9e8…",
  "date": "2025-10-01",
  "steps": 7421,
  "sleep_hours": 6.8,
  "mood": 4,
  "energy": 3,
  "stress": 2
}
```

4. Côté serveur :
   - aucun lien possible avec l’identité réelle,
   - possibilité d’agréger par user_hash sans savoir qui est la personne.

---

## 7. Modèle économique & Token DATIA (version V1)

### 7.1 Rôle du token DATIA

Le token DATIA n’est pas un simple “jeton de spéculation”. Il a des fonctions claires :

1. **Unité de paiement** par les IA / clients pour consommer des flux de données.
2. **Récompense** des utilisateurs contributeurs.
3. **Outil d’alignement** économique entre :
   - utilisateurs,
   - opérateurs de la marketplace,
   - validateurs / stakers (dans les versions futures).

### 7.2 Flux économique (MVP)

Pour un achat de données par une IA :

- L’IA client paie X DATIA au smart contract.
- Le smart contract redistribue automatiquement :
  - **90 %** aux utilisateurs (proportionnellement à leur contribution),
  - **5 %** au pool de staking / sécurité,
  - **5 %** à la trésorerie du protocole (développement, audits, etc.).

Aucun acteur central ne “retient” les fonds hors protocole.

---

## 8. Cas d’usage : WellMind Fatigue Predictor

### 8.1 Contexte

**WellMind** est une startup qui développe une IA capable de :

- prédire la fatigue mentale,
- identifier des profils à risque de burnout,
- optimiser des programmes de bien‑être.

Pour cela, elle a besoin de **flux de données réels**, anonymisés, combinant :

- activité,
- sommeil,
- humeur,
- énergie.

---

### 8.2 Côté utilisateur : Marie, 43 ans

Marie active DATIAOWNP sur son smartphone :

- l’app lit ses pas quotidiens et sa durée de sommeil (données passives),
- 1 à 2 fois par jour, l’app lui demande son humeur / énergie / stress (sliders 1–5),
- toutes les données sont anonymisées localement.

Au bout de 30 jours, le protocole dispose, pour Marie, d’un flux du type :

| Jour | Pas | Sommeil | Humeur | Énergie | Stress |
|------|-----|---------|--------|---------|--------|
| 1    | 5200| 6.2 h   | 3      | 4       | 2      |
| 2    | 7400| 7.0 h   | 4      | 3       | 2      |
| 3    | 2900| 5.3 h   | 2      | 2       | 3      |
| …    | …   | …       | …      | …       | …      |

---

### 8.3 Côté IA : WellMind achète un flux

WellMind se connecte à la marketplace DATIAOWNP et demande :

> “Flux anonymisés activité + sommeil + humeur + énergie + stress  
> sur 30 jours pour 1 000 utilisateurs européens.”

- Prix : par exemple **10 DATIA** (chiffre fictif pour illustrer).
- Le smart contract gère le paiement et la distribution.

---

### 8.4 Exécution de la transaction

1. WellMind paie 10 DATIA → smart contract.
2. Le protocole sélectionne les flux d’utilisateurs correspondant aux critères.
3. Un dataset anonymisé est généré et transmis à WellMind.
4. Les 10 DATIA sont redistribués :
   - 9 DATIA (90 %) aux utilisateurs contribuants,
   - 0,5 DATIA (5 %) au pool de staking,
   - 0,5 DATIA (5 %) à la trésorerie.
5. Une transaction on‑chain enregistre :
   - le type de flux acheté,
   - la somme payée,
   - la période,
   - un identifiant de contrat WellMind (sans exposer d’identité utilisateur).

---

### 8.5 Ce que voit Marie

Dans l’app, Marie voit :

- “Vos données (activité + sommeil + humeur + énergie + stress) ont été utilisées par une IA de bien‑être.”  
- “Récompense : +0,009 DATIA.”  
- “Niveau de confidentialité : maximal (aucune possibilité d’identification).”

Marie reste totalement anonyme.  
Elle sait **quand**, **pour quoi** et **comment** ses données sont utilisées, et elle est rémunérée.

---

### 8.6 Ce que reçoit WellMind

WellMind reçoit un dataset de ce type :

```json
{
  "user_hash": "a8c9f9e8...",
  "steps": [5200, 7400, 2900, ...],
  "sleep_hours": [6.2, 7.0, 5.3, ...],
  "mood": [3, 4, 2, ...],
  "energy": [4, 3, 2, ...],
  "stress": [2, 2, 3, ...],
  "period_days": 30,
  "region": "EU"
}
```

Aucune possibilité de remonter à une personne physique.

---

## 9. Conformité RGPD / AI Act (principes)

DATIAOWNP est conçu pour être **nativement conforme** :

- **Privacy by design** :
  - anonymisation dès le smartphone,
  - minimisation des données partagées.
- **Consentement explicite** :
  - activation volontaire,
  - paramétrage des types de données partagées.
- **Droits utilisateurs** :
  - possibilité de stopper le partage à tout moment,
  - suppression locale des données de l’app.
- **Transparence** :
  - tableau de bord indiquant les usages des données,
  - logs on‑chain consultables pour vérifier les transactions de données (sans identifiant personnel).

---

## 10. Roadmap (version synthétique)

- **Mois 1–2** :  
  - Finalisation de la vision, whitepaper, cas d’usage.  
  - Spécifications MVP.  

- **Mois 3–4** :  
  - Développement de l’app mobile MVP (React Native).  
  - Backend minimal (API + stockage anonymisé).  

- **Mois 5–6** :  
  - Smart contract DATIA (testnet).  
  - Première version d’achat de flux de données (WellMind‑like).  

- **Mois 7–9** :  
  - Amélioration de l’app (multi‑données, UX).  
  - Début d’intégration d’autres IA clientes.  
  - Version Alpha de la marketplace.  

- **Mois 10–12** :  
  - Audits sécurité et privacy.  
  - Lancement public en Alpha.  
  - Préparation d’une levée de fonds / prévente.

---

## 11. Conclusion

DATIAOWNP ne se contente pas de “tracker” des données santé ou bien‑être.  
Le protocole vise à :

- **redonner aux individus la souveraineté** sur leurs données,
- **offrir aux IA un accès éthique** à des données de très haute valeur,
- **créer un marché entièrement nouveau** :  
  celui de la donnée personnelle anonymisée, librement consentie et rémunérée.

En combinant :
- mobile‑first,  
- anonymisation locale,  
- smart contracts,  
- marketplace IA,  

DATIAOWNP se positionne comme un candidat sérieux à devenir **l’infrastructure standard** de la donnée personnelle pour l’ère de l’IA.