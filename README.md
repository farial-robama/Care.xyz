# 🏥 Care.xyz - Baby Sitting & Elderly Care Service Platform

A comprehensive care service booking platform built with Next.js 15, TypeScript, and MongoDB. Care.xyz connects families with verified professional caretakers for baby care, elderly care, and sick people care services across Bangladesh.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Stripe](https://img.shields.io/badge/Stripe-Payment-blueviolet)

## 🌟 Live Demo

- **Live Site**: https://care-xyz-gamma-two.vercel.app
- **GitHub Repository**: https://github.com/farial-robama/Care.xyz

## 📸 Screenshots

### Homepage
![Homepage Hero](public/hero.png)
*Modern hero section with animated gradients*

### Services
![Services Section](public/Services.png)
*Three professional care services*

### Booking Flow
![Booking Page](public/booking.png)
*Easy 3-step booking process*

## ✨ Key Features

### 🔐 Authentication & Authorization
- Email and password authentication via Firebase
- Google OAuth integration
- Protected routes for authenticated users
- Persistent login sessions
- User profile management

### 📋 Service Management
- **Baby Care Service**: Professional babysitting and child care
- **Elderly Care Service**: Compassionate care for elderly family members
- **Sick People Care**: Specialized care for sick or recovering patients
- Detailed service pages with pricing and features
- Service comparison and selection

### 🎯 Smart Booking System
- Dynamic duration selection (hourly/daily)
- Bangladesh location hierarchy (Division → District → City → Area)
- Real-time cost calculation
- Instant booking confirmation
- Email invoice generation

### 💳 Payment Integration
- Stripe payment gateway integration
- Secure payment processing
- Payment confirmation emails
- Transaction history tracking
- Multiple payment methods support

### 📊 Booking Management
- View all bookings in one place
- Real-time status tracking (Pending/Confirmed/Completed/Cancelled)
- Cancel pending bookings
- Booking details with full information
- Email notifications for status updates

### 🎨 Modern UI/UX
- Responsive design (Mobile, Tablet, Desktop)
- Smooth animations and transitions
- Custom CSS keyframe animations
- Gradient effects and hover states
- Interactive components
- FAQ section with accordion
- "How It Works" step-by-step guide
- Customer testimonials
- Trust badges and social proof

### 📧 Email System
- Automated booking confirmation emails
- Beautiful HTML email templates
- Invoice generation with booking details
- Status update notifications
- Professional email formatting

### 🔍 SEO Optimization
- Dynamic metadata for all pages
- OpenGraph tags for social sharing
- Structured data markup
- Semantic HTML structure
- Fast page load times

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Feather Icons)
- **Notifications**: React Hot Toast
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: Firebase Auth
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer
- **Payment**: Stripe

### DevOps & Tools
- **Version Control**: Git & GitHub
- **Deployment**: Vercel
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Firebase project
- Gmail account (for Nodemailer)
- Stripe account (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/care-xyz.git
cd care-xyz
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create `.env.local` file in the root directory:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careXyz?retryWrites=true&w=majority

# Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable **Email/Password**
   - Enable **Google**
4. Add your app and copy configuration to `.env.local`

### 5. Setup MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user with username and password
4. Whitelist IP address: `0.0.0.0/0` (for development)
5. Get connection string and add to `.env.local`

### 6. Setup Gmail for Email

1. Enable 2-Factor Authentication on your Google Account
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
3. Add email and app password to `.env.local`

### 7. Setup Stripe (Optional)

1. Create account at [Stripe](https://stripe.com)
2. Get your API keys from Dashboard
3. Add keys to `.env.local`

### 8. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 9. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure
```
care-xyz/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── register/         # User registration
│   │   │   │   └── login/            # User login
│   │   │   ├── bookings/             # Booking CRUD
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   └── user/[userId]/
│   │   │   └── services/             # Services API
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   ├── service/                  # Service detail pages
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── booking/                  # Booking page
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── my-bookings/              # User bookings dashboard
│   │   │   └── page.tsx
│   │   ├── (auth)/                   # Authentication pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── not-found.tsx             # 404 page
│   │   └── globals.css               # Global styles
│   ├── components/                   # Reusable components
│   │   ├── common/
│   │   │   ├── Navbar.tsx            # Navigation bar
│   │   │   ├── Footer.tsx            # Footer
│   │   │   └── PrivateRoute.tsx      # Route protection
│   │   ├── cards/
│   │   │   └── ServiceCard.tsx       # Service display card
│   │   └── forms/
│   │       └── BookingForm.tsx       # Booking form
│   ├── context/                      # React Context
│   │   └── AuthContext.tsx           # Authentication context
│   ├── lib/                          # Libraries & utilities
│   │   ├── mongodb.ts                # MongoDB connection
│   │   ├── firebase.ts               # Firebase configuration
│   │   ├── models/                   # Database models
│   │   │   ├── User.ts
│   │   │   ├── Booking.ts
│   │   │   └── Service.ts
│   │   └── utils/                    # Helper functions
│   │       ├── sendEmail.ts          # Email utilities
│   │       ├── auth.ts               # Auth utilities
│   │       └── locations.ts          # Bangladesh locations
│   └── types/                        # TypeScript definitions
│       └── index.ts                  # Type definitions
├── public/                           # Static assets
│   └── images/
├── .env.local                        # Environment variables
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind configuration
├── postcss.config.mjs                # PostCSS config
├── next.config.ts                    # Next.js configuration
└── README.md                         # This file
```

## 🎯 Core Functionality

### User Registration Flow
1. User visits `/register`
2. Fills in NID, name, email, contact, password
3. Password validation (6+ chars, 1 uppercase, 1 lowercase)
4. Creates Firebase account
5. Stores user data in MongoDB
6. Redirects to homepage

### Booking Flow
1. User browses services on homepage
2. Clicks "View Details" on a service
3. Reviews service details and pricing
4. Clicks "Book This Service" (requires login)
5. Selects duration (hourly/daily)
6. Chooses location (Division → District → City → Area)
7. Enters full address
8. Reviews total cost
9. Confirms booking
10. Receives email invoice
11. Booking appears in "My Bookings"

### Payment Flow (Stripe)
1. User confirms booking
2. Redirects to Stripe checkout
3. Enters payment details
4. Payment processed securely
5. Success confirmation
6. Booking status updated to "Confirmed"
7. Confirmation email sent

## 📊 Database Schema

### User Collection
```typescript
{
  _id: ObjectId,
  nidNo: String (unique),
  name: String,
  email: String (unique),
  contact: String,
  password: String (hashed),
  role: 'user' | 'admin',
  createdAt: Date
}
```

### Booking Collection
```typescript
{
  _id: ObjectId,
  userId: String,
  userEmail: String,
  userName: String,
  serviceId: Number,
  serviceName: String,
  duration: Number,
  durationType: 'hours' | 'days',
  location: {
    division: String,
    district: String,
    city: String,
    area: String,
    address: String
  },
  totalCost: Number,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
```bash
npm i -g vercel
```

2. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

3. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

4. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy

5. **Update Firebase Authorized Domains**
   - Firebase Console → Authentication → Settings
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

## ✅ Assignment Requirements

### Required Features (100% Complete)
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ User Authentication (Email/Password + Google OAuth)
- ✅ Dynamic Booking System with Duration & Location
- ✅ Automatic Total Cost Calculation
- ✅ Booking Status Management (Pending/Confirmed/Completed/Cancelled)
- ✅ My Booking Page with Status Tracking
- ✅ Service Overview (3 Services)
- ✅ Individual Service Detail Pages
- ✅ Homepage with Banner, About, Services, Testimonials
- ✅ Private Route Protection
- ✅ Environment Variables Configuration

### Challenge Features
- ✅ **Metadata Implementation** (SEO optimization)
- ✅ **Email Invoice System** (Automated email on booking)
- ✅ **Stripe Payment Integration** (Secure payment processing)
- ⏳ **Admin Dashboard** (Optional - Not implemented)

### Additional Features Implemented
- ✅ Enhanced UI/UX with animations
- ✅ FAQ section with accordion
- ✅ "How It Works" step-by-step guide
- ✅ Customer testimonials with ratings
- ✅ Trust badges and social proof
- ✅ Smooth scroll navigation
- ✅ Wave section dividers
- ✅ Animated statistics
- ✅ Mobile-optimized navigation
- ✅ Email notifications
- ✅ Real-time cost calculation
- ✅ Location-based service delivery

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] Register new user with valid data
- [ ] Register with invalid password (should fail)
- [ ] Register with existing email (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (should fail)
- [ ] Google OAuth login
- [ ] Logout functionality

#### Booking Flow
- [ ] Browse services on homepage
- [ ] View service details
- [ ] Book service (requires login)
- [ ] Select hourly duration
- [ ] Select daily duration
- [ ] Choose all location fields
- [ ] Verify cost calculation
- [ ] Submit booking
- [ ] Receive email invoice
- [ ] View in My Bookings

#### My Bookings
- [ ] View all bookings
- [ ] Filter by status
- [ ] Cancel pending booking
- [ ] View booking details
- [ ] Check status updates

#### Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)
- [ ] Check navigation menu
- [ ] Verify all buttons clickable
- [ ] Check form inputs

#### Payment (Stripe)
- [ ] Initiate payment
- [ ] Complete payment with test card
- [ ] Verify payment confirmation
- [ ] Check booking status update
- [ ] Receive confirmation email

## 🐛 Known Issues & Future Enhancements

### Known Issues
- None at the moment

### Future Enhancements
- [ ] Admin dashboard for managing bookings
- [ ] Caretaker profile pages
- [ ] Rating and review system
- [ ] Real-time chat with support
- [ ] Push notifications
- [ ] Advanced search filters
- [ ] Booking calendar view
- [ ] Service availability scheduling
- [ ] Multiple payment methods
- [ ] Referral program

<!-- ## 🤝 Contributing

This is an academic project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created as an academic assignment and is open source under the MIT License. -->

## 👨‍💻 Author

**[Farial Robama]**
- GitHub: [farial-robama](https://github.com/farial-robama)
- Email: farialrobama15@gmail.com
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/farial-robama)

## 🙏 Acknowledgments

- Next.js documentation
- Firebase documentation
- MongoDB documentation
- Stripe documentation
- Tailwind CSS
- React Icons
- The open-source community

<!-- ## 📞 Support

For support, email support@care.xyz or join our Slack channel. -->

---

**Made with ❤️ by Farial Robama**

<!-- *Last Updated: [Current Date]* -->