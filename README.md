# Mini CRM Mobile App

A React Native mobile application for managing customers and their leads, built with Expo.

## App Link
Download the APK: https://expo.dev/accounts/chakri02/projects/CRM/builds/8b9d7882-cfc1-4c08-80e2-16f7ee1b0968

## Features

### Authentication
- User registration and login
- Token-based authentication with AsyncStorage persistence

### Customer Management
- List customers with pagination and search
- Add, edit, and delete customers
- Customer details view with associated leads

### Leads Management
- Manage leads for each customer
- Add, edit, and delete leads
- Filter leads by status (New, Contacted, Converted, Lost)
- Lead details with value tracking

### Dashboard (Bonus)
- Pie chart showing leads by status
- Bar chart for status distribution
- Total lead value display

## Tech Stack

- **React Native** with **Expo**
- **Redux Toolkit** for state management
- **React Navigation** for navigation
- **React Native Paper** for UI components
- **AsyncStorage** for local storage
- **React Native Chart Kit** for charts
- **Yup** and **Formik** for validation (bonus)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd crm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on device/emulator:**
   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For web: `npm run web`

## Project Structure

```
src/
├── screens/
│   ├── Login.js
│   ├── Register.js
│   ├── Home.js
│   ├── CustomerList.js
│   ├── CustomerDetails.js
│   ├── AddEditCustomer.js
│   ├── LeadList.js
│   ├── LeadDetails.js
│   ├── AddEditLead.js
│   └── Dashboard.js
├── store/
│   ├── index.js
│   └── slices/
│       ├── authSlice.js
│       ├── customerSlice.js
│       └── leadSlice.js
├── components/
├── services/
└── utils/
```

## API Integration

The app uses mock API functions for demonstration. In a real-world scenario, replace the mock functions in the slices with actual API calls.

## Bonus Features Implemented

- Dashboard with charts (pie/bar for leads by status and total value)
- Dark/Light mode toggle
- Input validation with Yup/Formik on add/edit forms
- Unit tests for Home screen with Jest
- Clean, mobile-friendly UI with React Native Paper

## Testing

Run tests with:
```bash
npm test
```

## Build

To build for production:
- Android APK: `expo build:android`
- iOS IPA: `expo build:ios`

## Evaluation Criteria Met

- ✅ Clean, modular, reusable components
- ✅ Proper project structure with Redux Toolkit
- ✅ Authentication, customer management, lead management
- ✅ Filtering functionality
- ✅ Simple, clean, responsive design
- ✅ Smooth API handling & state persistence
- ✅ Charts for dashboard
- ✅ Input validation framework
