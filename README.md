# Groww-like Stock Dashboard

This project is a React-based stock market dashboard that mimics the functionality of the Groww app. It pulls real-time stock data using the **Finnhub API** and provides a stock watchlist, user authentication via **Firebase**.
--------------
## Project Overview

The application allows users to view live stock market data, such as stock prices, market activity, and company details. Users can also create a personalized watchlist to keep track of their favorite stocks.
----------------
### Key Features

- **Real-time stock data**: Displayed using Finnhub API.
- **User Authentication**: Handled via Firebase Authentication.
- **User-specific Watchlist**: Saved to Firebase Firestore.
- **Responsive Design**: Built with custom CSS to ensure the app works well on mobile devices.
------------------
## Getting Started

To get this project up and running locally, follow the instructions below.
--------------------
### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js): [npm Documentation](https://docs.npmjs.com/)
---------------------------
### Installation

1. **Clone the Repository**:
   git clone https://github.com/your-username/groww.git
   cd groww

2. Install Dependencies:
   npm install

3. Setup Firebase:

   Create a project on Firebase.

   Add Firebase Authentication and Firestore.

   Create a .env file in the root directory and add your Firebase credentials like this:
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

 4. Set up Finnhub API:

    Sign up for an API key at Finnhub.

    Add your Finnhub API key to the .env file:

    REACT_APP_FINNHUB_API_KEY=your_finnhub_api_key


 5. Run the Application:
    npm start   
    The app will open in your browser at http://localhost:3000.

----------------

API Integration
This application fetches real-time stock data from Finnhub API.

---------

API Key Restrictions
If you're encountering issues with displaying real-time stock data, it may be due to API key permissions or access level.

Permission Levels:
Ensure that your Finnhub API key has the necessary permissions to access real-time data. Some data points might require premium access.
For free-tier users, access to certain stock data may be limited. If you need real-time stock data, consider upgrading to a premium Finnhub subscription.

API Documentation
Finnhub API Docs: Finnhub API Documentation


   
 
