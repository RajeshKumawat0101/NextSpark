const express = require('express');    // Import the Express framework for creating web applications
const cors = require('cors');    // Import the CORS middleware to enable cross-origin resource sharing

const workRoutes = require('./routes/workRoutes');     // Import routes related to work (job/intern/part-time) updates
const eventsRoutes = require('./routes/eventsRoutes'); // Import routes related to event (leaderboard) 
const adminRoutes = require('./routes/adminRoutes');  // Import routes related to admin
const {restrictToLoggedInOnly} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const app = express();  // Creating Express application instance to handle https requests
const port = process.env.PORT || 3000; // Defining the server port to the value of the PORT environment variable or use 3000 as fallback

app.use(express.json());  // Enabling parsing of JSON data sent in request body for API interactions
app.use(cors());         // Allowing cross-origin requests for more flexible API access
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

// Routing configuration of Express application
// These lines use app.use() method to define severalroute handlers based on specific paths
app.use('/works', workRoutes);
app.use('/events',eventsRoutes);
app.use('/admin',adminRoutes);

// To test the server
app.get('/', (req, res) => {
  res.send('Hey');
});

// To bind and listen to the connections on the specified host and port.
app.listen(port, () => {
  console.log(`Server is on fire at ${port} location`);
});
