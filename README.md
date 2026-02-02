# Project Spots

A modern, responsive web application for discovering and sharing the best study and work spots around your city. This project is designed for students, remote workers, and anyone looking for the perfect environment to focus, collaborate, or relax. Built with Webpack, ES6 JavaScript, and integrated with a REST API backend.

## 🆕 Recent Updates

- **Full API Integration**: Complete CRUD operations for cards, user profiles, avatars, and likes
- **User Profile Management**: Edit profile name, description, and avatar picture
- **Card Management**: Create, delete, and like/unlike cards with real-time UI updates
- **Form Validation**: Client-side validation with error handling and visual feedback
- **Loading States**: "Saving..." indicator while API requests are processing
- **Modal Windows**: Smooth modal interactions for editing profiles, adding cards, and previewing images
- **Avatar Overlay**: Hover effect on avatar with edit button overlay

## 📋 Project Description

SE Project Spots is a full-stack web application that allows users to browse, create, and manage their favorite spots for studying or working. The platform features a clean, modern UI with complete API integration for data persistence. It is built with best practices in web development, responsive design, and modern JavaScript patterns.

**Why this project?** Finding the right spot to work or study can be challenging. This project demonstrates a complete workflow from frontend UI/UX design to backend API integration, creating a community-driven resource for discovering and sharing the best locations.

### ✨ Key Features & Functionality

- **Spot Cards**: Visual cards with images, titles, like buttons, and delete functionality
- **User Profiles**: Edit user name, description, and profile avatar picture
- **Like/Unlike**: Add and remove likes from cards with real-time updates
- **Card Management**: Create new cards and delete existing ones with confirmation modals
- **Image Preview**: Modal preview of card images with smooth overlay
- **Form Validation**: Real-time validation with error messages on form inputs
- **Delete Confirmation**: Safety confirmation modal when deleting cards
- **Responsive Design**: Optimized layouts for desktop, tablet, and mobile devices
- **Modern UI**: Clean design with smooth animations, transitions, and loading states

## 🛠️ Technologies and Techniques Used

### Core Technologies

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern layouts, effects, and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with Promises, async/await, and class syntax
- **Webpack**: Module bundling and asset management
- **REST API**: Integration with backend for data persistence

### Backend Integration

- **Fetch API**: Making HTTP requests (GET, POST, PUT, PATCH, DELETE)
- **Promise-based Architecture**: Handling asynchronous API calls with `.then()` and `.catch()`
- **Error Handling**: Comprehensive error management and user feedback
- **API Methods**:
  - `getAppInfo()`: Fetch user info and cards on page load
  - `getUserInfo()`: Get user profile data
  - `editUserInfo()`: Update user name and description
  - `updateAvatar()`: Change profile picture
  - `addNewCard()`: Create new spot cards
  - `deleteCard()`: Remove cards (with confirmation)
  - `likeCard()`: Like/unlike cards with PUT/DELETE requests

### Frontend Architecture

- **API Wrapper Class**: Centralized API communication in `Api.js`
- **Event Listeners**: Dynamic event delegation for card interactions
- **Form Validation**: Real-time input validation with error messages
- **Modal Management**: Reusable modal functions for overlays and dialogs
- **DOM Manipulation**: Efficient element creation and updating

### CSS Architecture & Methodologies

- **BEM (Block Element Modifier)**: Scalable, maintainable CSS class naming
- **Modular CSS**: Separate files for each component (card, header, footer, profile, etc.)
- **Normalize.css**: Cross-browser consistency
- **CSS Transitions**: Smooth animations and hover effects
- **Flexbox & Grid**: Modern layout techniques

### Layout & Responsive Design

- **Flexbox**: Flexible layouts for cards, header, profile, and footer
- **Media Queries**: Responsive breakpoints for mobile, tablet, and desktop
- **SVG & Optimized Images**: Scalable graphics for fast loading
- **Mobile-First Approach**: Designed for all screen sizes

## 🚀 Getting Started

### System Requirements

- **Node.js**: Version 12 or higher
- **npm**: Version 6 or higher
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shreyas-chigurupati07/se_project_spots.git
   cd se_project_spots
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:8080`

4. **Build for production:**

   ```bash
   npm run build
   ```

   Generated files will be in the `dist/` folder.

### Deployment

This project is deployed to GitHub Pages. To deploy:

```bash
npm run deploy
```

**Live Demo**: [https://shreyas-chigurupati07.github.io/se_project_spots/](https://shreyas-chigurupati07.github.io/se_project_spots/)

### File Structure

```
se_project_spots/
├── src/
│   ├── index.html                 # Main HTML file
│   ├── pages/
│   │   ├── index.js               # Main JavaScript with event listeners and API calls
│   │   └── index.css              # Page-level styles
│   ├── blocks/                    # BEM-structured CSS components
│   │   ├── card.css               # Card component styles
│   │   ├── cards.css              # Cards container styles
│   │   ├── content.css            # Main content area
│   │   ├── footer.css             # Footer styles
│   │   ├── header.css             # Header styles
│   │   ├── modal.css              # Modal dialog styles
│   │   ├── page.css               # Page-level layout
│   │   └── profile.css            # Profile section styles
│   ├── scripts/
│   │   └── validation.js          # Form validation logic
│   ├── utils/
│   │   └── Api.js                 # API wrapper class for backend calls
│   ├── images/                    # Project images and SVG icons
│   └── vendor/
│       ├── fonts.css              # Font imports
│       ├── normalize.css          # CSS reset
│       └── fonts/                 # Custom font files (Poppins)
├── dist/                          # Production build (generated)
├── package.json                   # Project dependencies and scripts
├── webpack.config.js              # Webpack configuration
├── babel.config.js                # Babel configuration
└── README.md                      # This file
```

### API Endpoints

The application connects to a REST API backend (Around API). Key endpoints:

- `GET /cards` - Fetch all cards
- `GET /users/me` - Get current user info
- `POST /cards` - Create a new card
- `DELETE /cards/:cardId` - Delete a card
- `PUT /cards/:cardId/likes` - Like a card
- `DELETE /cards/:cardId/likes` - Unlike a card
- `PATCH /users/me` - Update user info (name, description)
- `PATCH /users/me/avatar` - Update user avatar

## 🎯 How to Use

1. **View Cards**: Browse all study/work spots on the main page
2. **Like Cards**: Click the heart icon to like/unlike a card
3. **Preview Images**: Click a card image to view it in a modal
4. **Delete Cards**: Click the trash icon, confirm in modal, and remove a card
5. **Edit Profile**: Click "Edit Profile" to change name and description
6. **Add Avatar**: Hover over profile picture, click "Edit Avatar", and enter a new image URL
7. **Add Cards**: Click "+ New" to create a new spot card with name and image link

## 📋 Project Demo

Check out the [Pitch Video](https://drive.google.com/file/d/1UtCSCkMM1sokIOLgW4Ak92PDGWK5xk-3/view?usp=drive_link) where I describe the project, features, and challenges faced during development.
