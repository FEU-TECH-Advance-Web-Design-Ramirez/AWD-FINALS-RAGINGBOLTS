# Education Seeker App - Project Plan

## 1. Persona

**Name:** Education Seeker (Raging Bolt TW22)  
**Age:** 40 years old  

**Background:**  
A lifelong learner who highly values continuous education. Actively seeks flexible and accessible opportunities to upskill, explore new interests, and stay updated in their field. Balances personal and professional commitments while prioritizing personal growth through learning.

**Key Characteristics:**
- Self-motivated and goal-oriented  
- Prefers bite-sized, flexible content  
- Enjoys learning at their own pace  
- Seeks trustworthy reviews and ranked resources  
- Appreciates clean, professional user interfaces  

---

## 2. UX Flow

**User Authentication:**
- **Login/Registration:** Secure authentication via Firebase Authentication or OAuth (Google, LinkedIn).
- **Onboarding:** Brief walkthrough highlighting platform features and how to start learning.

**Home Screen:**
- **Featured Platforms:** Highlight top-rated or newly added learning platforms.
- **Navigation Menu:** Quick access to Submit a Platform, Review List, and Rankings.

**Platform Interaction:**
- **Platform Detail:** Information about the learning platform, including features, reviews, and course categories.
- **Submit Review:** Users can share written reviews and give ratings based on their experiences.
- **Platform Submission:** Users can suggest new learning platforms using a guided form and upload a logo or image.

**Community Engagement:**
- **Rankings Page:** Display ranked platforms based on user reviews and ratings.
- **Interactive Learning Tips Feed:** Share bite-sized learning tips or course recommendations.

**Admin Workflow:**
- **Admin Dashboard:** View and approve new platform submissions and user reviews.
- **Notification System:** Notifies admin upon pending submissions or flagged content.

---

## 3. Layout and Navigation

**Navigation Drawer / Bottom Navigation Bar:**
- **Home:** Discover platforms and browse featured content.
- **Submit Platform:** Form for submitting a new learning platform.
- **Rankings:** View platforms sorted by popularity or rating.
- **Profile:** View and edit user details, contribution history.

**Screen Layouts:**
- **Home Screen:** Clean grid or card-based layout showing learning platforms.
- **Platform Detail Screen:** Scrollable screen with sections for overview, features, user reviews, and rating submission.
- **Submission Screen:** Form layout for adding new platforms, images, and descriptions.
- **Rankings Screen:** List with filters (e.g., top-rated, most reviewed).
- **Profile Screen:** User profile with list of reviews and submissions.

**Consistent Navigation:**
- Back navigation, breadcrumbs (if needed), and intuitive buttons/icons to guide user actions.

---

## 4. Color Scheme and Visual Style

**Primary Colors:**
- **Navy Blue:** Professional, trustworthy
- **White:** Clean and minimal

**Accent Colors:**
- **Muted Teal or Gray-Blue:** Adds a calming, accessible touch without overwhelming the layout

**Visual Style:**
- **Accessible & Professional:** High-contrast text, clean UI with large tap targets
- **Minimalistic & Empowering:** Focused on readability and simplicity
- **Consistent Iconography:** Neutral, flat icons to represent learning, submissions, and reviews
- **Typography:** Clear, legible fonts like Open Sans or Roboto for easy reading

---

## 5. Entity Relational Database (ERD)

**Key Entities:**

**User**  
- user_id (Primary Key)  
- name  
- email  
- password_hash  
- profile_image_url  
- date_joined  

**Learning_Platform**  
- platform_id (Primary Key)  
- user_id (Foreign Key - User)  
- name  
- description  
- website_url  
- logo_url  
- categories (Array/String)  
- approved (Boolean)  
- timestamp  

**Review**  
- review_id (Primary Key)  
- platform_id (Foreign Key - Learning_Platform)  
- user_id (Foreign Key - User)  
- rating (Numeric)  
- comment  
- timestamp  

**Ranking** (Derived dynamically based on reviews)  
- platform_id (Foreign Key - Learning_Platform)  
- average_rating  
- total_reviews  

---

## 6. Dataflow

**User Authentication & Registration:**
- Uses Firebase Authentication or OAuth for secure logins.
- **Dataflow:** User credentials → Firebase Auth → Token issued → Secure session established.

**Platform Submission:**
- User submits new platform via form.
- **Dataflow:**  
  User input → Firebase Storage (for logo/image)  
  → Firestore (stores platform details, `approved = false`)  
  → Admin reviews → On approval, `approved = true`

**Review Submission:**
- Users add reviews and rate platforms.
- **Dataflow:**  
  User input → Stored in Firestore under Review  
  → Ratings contribute to dynamic platform ranking

**Ranking Display:**
- Rankings generated dynamically by aggregating ratings.
- **Dataflow:**  
  Firestore query calculates average ratings per platform  
  → Displays ordered list on Rankings screen

**Admin Workflow:**
- Admin notified of new submissions via Firebase Cloud Functions.
- **Dataflow:**  
  New content triggers admin alert → Admin reviews via dashboard  
  → Updates `approved` status → Changes reflected in public view

---

## 7. Mission & Vision

**Mission:**  
To democratize education by making skill-based learning accessible, professional, and user-driven for adult learners worldwide.

**Vision:**  
Empowering individuals through knowledge by curating high-quality, community-verified learning platforms and micro-education resources.


