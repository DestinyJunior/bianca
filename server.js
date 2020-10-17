const https = require('http');
const app = require('./app');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');



const PORT = process.env.PORT || 5000;

const server = https.createServer(app);

server.listen(
  PORT,
  console.log(
    `${process.env.APP_NAME} Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});