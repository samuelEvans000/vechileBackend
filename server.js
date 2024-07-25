const express = require('express');
const cors = require('cors');
const polyline = require('@mapbox/polyline');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const defaultLocation = { "latitude": 17.385044, "longitude": 78.486671 };

let routes = [];

// Load routes from the JSON file
const loadRoutes = () => {
  const data = fs.readFileSync('routes.json', 'utf8');
  routes = JSON.parse(data);
  console.log("Loaded routes: ", routes);
};

loadRoutes();

let encodedPolyline = routes[0].encodedPolyline;
let routeData = polyline.decode(encodedPolyline).map(point => ({
  latitude: point[0],
  longitude: point[1]
}));

app.get('/api/vehicle', (req, res) => {
  res.json({ defaultLocation, routeData });
});

app.post('/api/select-route', (req, res) => {
  const { routeName } = req.body;
  const selectedRoute = routes.find(route => route.name === routeName);
  if (selectedRoute) {
    encodedPolyline = selectedRoute.encodedPolyline;
    routeData = polyline.decode(encodedPolyline).map(point => ({
      latitude: point[0],
      longitude: point[1]
    }));
    console.log("Route updated to: ", selectedRoute);
    res.json({ message: "Route updated successfully" });
  } else {
    res.status(404).json({ message: "Route not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
