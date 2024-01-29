# Electric Gadgets Management Dashboard(Assignment 5)

Welcome to the Electric Gadgets Management Dashboard frontend repository! This project is designed to provide a comprehensive solution for managing electric gadgets inventory, tracking sales, and analyzing sales history. This README.md file will guide you through setting up the frontend application and provide an overview of its features and functionalities.

<!-- 
## Full Documentation URL 
Click here to read [Full API Documentation](https://documenter.getpostman.com/view/20475660/2s9YkuXx9P) 
-->

## Live URL 
Click here to visit [Electric Gadgets Management](https://glistening-hotteok-f0e6c3.netlify.app)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

```bash
git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-shuvo-h.git
cd l2b2-full-stack-a5-client-side-shuvo-h
npm install
```
## App Configuration(.env)
Add your environment variable values like database url, saltround for bycript, production env etc to the .env file.


Environment Variables:
- [NODE_ENV](): development (development || production)
- [PORT](): 5000


## Run the Server

```bash
npm run build
npm run start
```
## Features
- Users can register and log in securely using JWT (JSON Web Tokens).
- Authentication ensures that only authorized users can access the dashboard.

## Electric Gadgets Management
- CRUD Operations: Add, delete, update, and view electric gadgets in the inventory.
- Filtering System: Robust filtering options to narrow down electric gadgets based on various criteria such as price range, release date, brand, model number, category, operating system, connectivity, power source, features, and more.

## Sales Management
- Sell Products: Users can search for products to sell, specify the quantity, buyer's name, and sale date.
- Automatic Removal: Products are automatically removed from the inventory when the quantity reaches zero after a sale.

## Sales History
- View sales history categorized by weekly, daily, monthly, and yearly periods.

## User Interface Features
- Real-time UI Updates: Graceful UI updates in real-time for product changes, sales, etc.
- Responsive Design: Optimized for mobile responsiveness to ensure usability on various devices.

- State Management
- Redux: Utilized for efficient state management to maintain a consistent application state.
- RTK Query: Used for efficient CRUD operations and re-fetching functionality to ensure data accuracy and consistency.

## Additional Features
- Bulk Delete: Enable users to efficiently manage inventory with a bulk delete feature for electric gadgets.
- Duplicate & Edit: Implement a feature to duplicate existing products and modify them to create new variants.