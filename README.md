# Holiday API

A simple RESTful API built with Node.js and Express.js that fetches holiday information for a specific country and year from the Calendarific API. The API also caches responses to improve performance.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Postman Testing](#postman-testing)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or Yarn
- A Calendarific API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/holiday-api.git
   cd holiday-api
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3000
   DATABASE=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   DATABASE_PASSWORD=your_database_password
   CALENDARIFIC_API_KEY=your_calendarific_api_key
   CALENDARIFIC_API_URL=https://calendarific.com/api/v2
   CACHE_TTL=3600
   ```

## API Endpoints

### GET /api/v1/countries

Fetch the list of supported countries from the Calendarific API.

- **URL**: `/api/v1/countries`
- **Method**: `GET`
- **Response**:

  ```json
  {
      "success": true,
      "status": 200,
      "data": [
          {
              "code": "US",
              "name": "United States"
          },
          ...
      ]
  }
  ```

### GET /api/v1/holidays

Fetch holidays for the specified country and year.

- **URL**: `/api/v1/holidays`
- **Method**: `GET`
- **Query Parameters**:
  - `country` (required): The country code (e.g., `US`)
  - `year` (required): The year (e.g., `2024`)
- **Response**:

  ```json
  {
      "success": true,
      "status": 200,
      "data": [
          {
              "name": "New Year",
              "date": {
                  "iso": "2024-01-01"
              }
          },
          ...
      ]
  }
  ```

## Configuration

### Environment Variables

- `PORT`: Port number on which the server runs.
- `DATABASE`: MongoDB connection string.
- `DATABASE_PASSWORD`: Password for MongoDB.
- `CALENDARIFIC_API_KEY`: API key for Calendarific.
- `CALENDARIFIC_API_URL`: Base URL for Calendarific API.
- `CACHE_TTL`: Time-to-live for the cache in seconds.

## Running the Server

Start the server using the following command:

```bash
npm start
```
