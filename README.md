# 🍕 FoodBoard App

A modern, full-stack food ordering and menu management application built with React and Firebase. This application allows users to browse food items, manage their cart, place orders, and for authenticated users, create and manage restaurant menus.

## ✨ Features

### 🍽️ Customer Features

- **Browse Menu**: View available food items with detailed information
- **Shopping Cart**: Add items to cart with quantity management
- **Order Management**: Review orders and proceed to checkout
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-friendly interface
- **Interactive Maps**: Location services integration
- **FAQ Section**: Frequently asked questions
- **Contact Information**: Restaurant contact details

### 👨‍🍳 Admin Features

- **Menu Creation**: Add new food items with images, descriptions, and pricing
- **Real-time Updates**: Live menu updates using Firebase Realtime Database
- **Category Management**: Organize items by food categories
- **Menu Preview**: Real-time preview of created menu items
- **Protected Routes**: Secure admin access with authentication

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **CSS Modules** - Scoped styling
- **AOS (Animate On Scroll)** - Scroll animations
- **Leaflet** - Interactive maps
- **Google Maps API** - Location services

### Backend & Services

- **Firebase Authentication** - User management
- **Firebase Realtime Database** - Real-time data storage
- **Firebase Hosting** - Application deployment

### Development Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **Node.js** - JavaScript runtime

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd foodboard_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   VITE_FIREBASE_DATABASE_URL=your_database_url
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AccordionMenu/   # Collapsible menu component
│   ├── BackToTop/       # Scroll to top button
│   ├── Button/          # Custom button component
│   ├── Card/            # Card layout component
│   ├── FaqComponent/    # FAQ section component
│   ├── FoodCard/        # Food item display card
│   ├── FoodDetailsModal/ # Food details popup
│   ├── Footer/          # Page footer
│   ├── Hero/            # Landing page hero section
│   ├── Navbar/          # Navigation bar
│   ├── OrderSummary/    # Order summary component
│   └── Service/         # Service information component
├── constants/           # Application constants
│   ├── custom-routes.js # Route definitions
│   └── Layout.jsx       # Main layout wrapper
├── firebase/            # Firebase configuration
│   └── firebase.js      # Firebase setup and utilities
├── pages/               # Page components
│   ├── Cart.jsx         # Shopping cart page
│   ├── Contacts.jsx     # Contact information page
│   ├── CreateMenus/     # Menu creation page
│   ├── Faq.jsx          # FAQ page
│   ├── Home.jsx         # Home page
│   ├── Login/           # User login page
│   ├── Order.jsx        # Food ordering page
│   └── Register/        # User registration page
├── services/            # External services
│   └── authServices.js  # Authentication services
├── stores/              # State management
│   ├── authContext.js   # Authentication context
│   ├── authProvider.jsx # Authentication provider
│   └── cartContext.jsx  # Shopping cart context
└── assets/              # Static assets
    └── images/          # Images and icons
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🔐 Authentication

The application uses Firebase Authentication with the following features:

- Email/password registration and login
- Protected routes for admin functionality
- User session management
- Secure API access

## 🗄️ Database Schema

### Food Menus Collection

```javascript
{
  id: "unique_id",
  title: "Food Item Name",
  imageUrl: "https://example.com/image.jpg",
  size: "Large/Medium/Small",
  price: "12.99",
  ingredients: "List of ingredients",
  category: "Pizza/Burger/Pasta/etc",
  createdAt: "2024-01-01T00:00:00.000Z",
  createdBy: "user_uid",
  createdByEmail: "user@example.com"
}
```

## 🎨 Styling

The application uses CSS Modules for component-scoped styling:

- Responsive design with mobile-first approach
- Modern UI with smooth animations
- Consistent color scheme and typography
- Accessible design patterns

## 🚀 Deployment

### Firebase Hosting

1. Build the project: `npm run build`
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Login to Firebase: `firebase login`
4. Initialize hosting: `firebase init hosting`
5. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- The project is currently marked as "UNFINISHED" in the workspace
- Some features may be in development
- Error handling could be enhanced in some areas

## 🔮 Future Enhancements

- Payment integration
- Order tracking system
- User reviews and ratings
- Advanced search and filtering
- Push notifications
- Multi-language support
- Admin dashboard analytics

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a development project and may contain experimental features. Use in production at your own risk.
