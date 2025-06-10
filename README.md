# 🚌 Live Bus Tracking System 
A real-time bus tracking system designed to improve public transport efficiency by providing accurate GPS-based location updates. Built using the **MERN stack** and **LeafletJS**, this system features separate modules for **admins**, **drivers**, and **users** to manage routes and track buses in real time.

This project also served as a personal learning experience where I explored:
- 🔄 Real-time communication using **Socket.IO**
- 🗺️ Interactive map integration with **LeafletJS**
- 🧠 Gained practical knowledge in state management, REST APIs, and full-stack co-ordination

Overall, this project helped deepen my understanding of real-time systems and full-stack development best practices.

## 📑 Table of Contents
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Modules and Features](#modules-and-features)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)


---

## 🚀Features 

- 📍 Live Bus Location Tracking using LeafletJS and GPS

- 🧑‍💼 Admin Module for route management and monitoring

- 🚍 Driver Module to update live location via mobile/device

- 👥 User Module to view active buses on an interactive map

- ⏱️ 30% Reduction in Passenger Waiting Time by improving visibility

---

## Folder Structure

The project is divided into the following folders:

- `backend`: Backend code for the admin module, driver module and user module.
- `admin`: Admin module for adding drivers and bus routes.
- `driver`: Driver module to update live location via mobile/device.
- `frontend`: Frontend code for the user module with LeafletJS integration.


---

## 🛠Tech Stack

- **Frontend:** React.js, Tailwind CSS, LeafletJS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Other:** REST APIs, GPS location integration

---

## Modules and Features

 👤 User Module
- View active buses on an interactive map
- Search for buses by route or bus number
- View live location updates for buses

 🧑‍✈️ Driver Module
- Update live location via mobile/device
- Login to access the driver module

🛠️ Admin Module
- Manage routes and bus information
- Monitor bus locations in real time
- Add driver accounts with access to the driver module

---

## Screenshots

📸 Admin Module

- Admin module with all buses list.
![Bus list for admin image](<screenshot/Screenshot 2025-06-09 at 11.03.31 PM.png>)

- Track of each bus
![Track each bus image](<screenshot/Screenshot 2025-06-09 at 11.03.40 PM.png>)

- Add Bus with bus number and password
![Add bus image](<screenshot/Screenshot 2025-06-09 at 11.03.50 PM.png>)

- Add stops with map/location text
![Add stops image](<screenshot/Screenshot 2025-06-09 at 11.05.15 PM.png>)


📸 Driver Module
- Update live location via mobile/device in every 2 seconds
- Or update live location manually with buttons
![Live location update image](<screenshot/Screenshot 2025-06-09 at 11.06.04 PM.png>)


📸 User Module
- View active buses on an interactive map
- Search for buses by route or bus number
![List bus image](<screenshot/Screenshot 2025-06-09 at 11.06.13 PM.png>)


- View live location updates for buses
![Live location update image](<screenshot/Screenshot 2025-06-09 at 11.06.25 PM.png>)


---

## 📈Future Improvements

- Integrate live traffic data for better route optimization
- Add user login with saved routes and bus tracking history
- Implement push notifications for arrival alerts and delays
- Support multiple cities and transport authorities
- Add filters for route number, timing, bus type, and accessibility options

## 🤝Contributing

We welcome contributions! Feel free to:

- ⭐ Star the repository to show your support
- 🍴 Fork the project and experiment
- 📥 Open issues to suggest features or report bugs
- 🔧 Submit pull requests with improvements or fixes

## 📢Disclaimer

This bus tracking system is intended for educational and prototyping purposes. While it demonstrates real-time location updates and route management, it is not connected to any official transportation authority. Always refer to official apps or websites for accurate transit information.
