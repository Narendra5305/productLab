React Map Routing App
=====================

This is a simple React app that shows a map using Leaflet. It helps users find a route between two locations. It also includes login and signup features.

---

Features:
---------

1. Show user’s current location on the map.
2. Search for two places (start and destination).
3. Click on the map to set destination.
4. Show route between the places with distance and time.
5. Login and signup system.
6. Protected route (map page opens only after login).

---

How to Run:
-----------

1. Open your terminal.
2. Install all packages:
   npm install

3. Start the project:
   npm run dev

4. Make sure your backend is running at:
   http://localhost:8181

   Required API routes:
   - POST /users/register → for signup
   - POST /users/signin → for login

---

Folder Info:
------------

- components/
  - searchBar.jsx → Input boxes for places
  - privateRoute.jsx → Checks if user is logged in

- pages/
  - mapPage.jsx → Shows map and handles routes
  - signinPage.jsx → Login page
  - signupPage.jsx → Register page

- context/
  - contextApi.jsx → Manages login, token, and user info

- App.jsx → Handles routes
- main.jsx → App starting point

---

How the Map Works:
------------------

- Shows your current location (Point A).
- You can search or click on the map to set Point B.
- It draws a blue route line from A to B.
- It shows distance in KM and time in minutes.

APIs Used:
----------
- Map: OpenStreetMap (via Leaflet)
- Geocoding (search places): Nominatim API
- Routing: Leaflet Routing Machine

---

Important Notes:
----------------

- If the app asks for location access, click "Allow".
- If you face CORS error with the API, try using a CORS proxy during development.

---

