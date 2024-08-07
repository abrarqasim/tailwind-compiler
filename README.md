Tailwind CSS Compiler for Gutenberg Blocks

This repository contains a Node.js server that provides an endpoint for compiling Tailwind CSS based on Gutenberg block classes. The server accepts a POST request with Gutenberg block classes, extracts the relevant Tailwind CSS classes, generates a temporary HTML file, runs Tailwind CSS compilation, and returns the compiled CSS with a developer comment prefixed.


Features

- Accepts POST requests with Gutenberg block classes.
- Extracts relevant Tailwind CSS classes.
- Generates a temporary HTML file for Tailwind CSS compilation.
- Runs Tailwind CSS compilation.
- Returns the compiled CSS with a custom developer comment.
- Rate limiting to prevent abuse.

Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (>= 12.x)
- npm (>= 6.x)

Installation

1. Clone the repository:

- git clone https://github.com/yourusername/tailwind-gutenberg-compiler.git
- cd tailwind-gutenberg-compiler


2. Install dependencies:
- npm install
Ensure you have npx installed (comes with npm >= 5.2.0).


3. Usage
Start the server:
- node server.js

The server will start running on http://localhost:3000 by default. You can change the port by setting the PORT environment variable.


4. Endpoint
- POST /compile

Description
Compiles Tailwind CSS based on the provided Gutenberg block classes.

Request
Method: POST
URL: /compile
Headers:
Content-Type: application/json
Body:
json
{
  "classes": "your-gutenberg-block-classes"
}

5. Response
- Status 200: Compiled CSS with a developer comment.
- Status 400: Bad Request if no classes are provided.
- Status 500: Internal Server Error if something goes wrong during the compilation process.


6. Rate Limiting

To prevent abuse, the server includes rate limiting using express-rate-limit. The current configuration limits each IP to 10 requests per 15 minutes. If the limit is exceeded, the server responds with a message:
{
  "message": "Ay yo!😰 Too many requests from this IP, please try again after a minute 😐"
}


7. File Structure
.
├── server.js                   # Main server file
├── gutenbergClassFilter.js     # Module for filtering Gutenberg classes
├── public/                     # Directory for temporary files and compiled CSS
│   └── tailwind.css            # Compiled Tailwind CSS file
├── tailwind.config.js          # Tailwind CSS configuration file
└── README.md                   # This README file


8. License

This project is licensed under the MIT License. See the LICENSE file for more details.

Developed with stress by Qasim 