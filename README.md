# Trip Deals

Welcome to the Trip Deals project! This web application is built using **React.js**, **PHP**, and **MySQL**, and is designed to provide users with access to trip deals, travel news, and the ability to book trips. There are two types of users in this application: **admin** and **customer**.

## Features

### Customer Features

- **View Trip Deals:** Customers can browse/filter and view a list of available trip deals.
- **Book Trips:** Customers can select a trip deal and book it.
- **View Bookings:** Customers can see a list of their booked trips.
- **Export Bookings as JSON:** Customers can export their bookings in JSON format.
- **Read Travel News:** Customers can access the latest travel news.
- **Contact Admin:** Customers can contact the admin using a contact form.

### Admin Features

- **Create/ Edit/ Remove News:** Admin users have the ability to create, edit, and remove travel news articles.
- **Create/ Edit/ Remove Deals:** Admin users can manage trip deals, including creating, editing, and removing them.
- **Read Contact Messages:** Admin users can view and respond to messages submitted by customers through the contact form.

### RSS Feed Integration

- The application fetches travel news from an RSS feed by parsing an XML file. Additionally, news articles created by admin are displayed on the news and home pages.

### User Authentication

- PHP sessions are used for user authentication, allowing secure access to the application based on user roles.

## Screenshots

![Home page](/frontend/screenshots/home_page.png)
![Complete booking](/frontend/screenshots/complete_booking.png)
![Admin's bookings page](/frontend/screenshots/admin_bookings.png)
![New article page](/frontend/screenshots/new_article.png)
![Admin's contact page](/frontend/screenshots/admin_contact.png)

## Technologies Used

- React.js
- PHP
- MySQL
- RSS Feed (XML Parsing)

Happy traveling!
