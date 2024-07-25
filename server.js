const express = require('express');
const cors = require('cors');
const polyline = require('@mapbox/polyline');
const app = express();
const port = 3001;

app.use(cors());

// Default location
const defaultLocation = { "latitude": 17.385044, "longitude": 78.486671 };

// Encoded polyline representing the route to the destination
const encodedPolyline = "oobiBul`~MQuBcBfAaC|@uAZeAZuD~@gDZeBNeDz@}@uCq@cBWmBM{BNcCJuAuBe@gHeAeF{@kFqAgC}AsB_CiCqCcCiCaBmB";
const routeData = polyline.decode(encodedPolyline).map(point => ({
    latitude: point[0],
    longitude: point[1]
}));

app.get('/api/vehicle', (req, res) => {
    res.json({ defaultLocation, routeData });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

