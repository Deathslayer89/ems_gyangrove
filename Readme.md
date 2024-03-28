# Event Management System

This project is an implementation of an event management system that manages and queries event data based on a user's geographical location and a specified date.

## Prerequisites

- Node.js
- Supabase account

## Installation

1. Clone the repository
2. Install dependencies:

```cli
npm install
```

3. Create a `.env` file in the root directory with the following contents:
   Replace `your_supabase_project_url` and `your_supabase_project_api_key` with your Supabase project's URL and API key.

4. Create the `events` table in your Supabase project by running the following SQL statement in the Supabase SQL Editor:

```sql
create table if not exists
  events (
    id bigint primary key generated always as identity,
    event_name text not null,
    city_name text not null,
    event_date timestamp with time zone not null,
    event_time time not null,
    latitude float not null,
    longitude float not null,
    constraint no_duplicate_rows unique (
      event_name,
      city_name,
      event_date,
      event_time,
      latitude,
      longitude
    )
  );
```

## usage

1. start the server:

```cli
 npm run start
```

2. use curl or postman like software to send requests.

# Tech Stack and Design Decisions

## Tech Stack

For this project, I chose the following tech stack:

- **Node.js**: A JavaScript runtime environment that allows us to run JavaScript code on the server-side.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for building web applications and APIs.
- **Supabase**: A cloud-based platform that provides a hosted PostgreSQL database and authentication services, among other features.
- **PostgreSQL**: A powerful, open-source relational database management system used by Supabase for data storage.

## Design Decisions

### Database Choice

I opted to use PostgreSQL as the database solution for this project, hosted on Supabase. PostgreSQL is a robust and feature-rich relational database which is essential for our use case of storing and querying event locations.

Supabase simplifies the process of setting up and managing a PostgreSQL database, offering a user-friendly interface and seamless integration with our Node.js application.

### Directory Structure

To maintain a clean and modular codebase, project is structured into different directories and files, each responsible for a specific task:

- `models/`: Contains the database models and handles interactions with the database.
- `services/`: Encapsulates the business logic and orchestrates the flow between different components.
- `api/controllers/`: Handles incoming HTTP requests and responses.
- `api/routes/`: Defines the API routes and maps them to the corresponding controllers.
- `api/utils/`: Contains utility functions and helpers used throughout the application.

This approach promotes code reusability, testability, and maintainability.

# API Endpoints

## POST /events

Creates events from a CSV file.

### Request

This endpoint does not require any request body.

### Response

- **200 OK**:

```json
{
  "message": "Events created successfully"
}
```

- **409 Bad request Error**:

```json
{
  "error": "Error message"
}
```

- ** 500 Internal Server Error **:

```json
{
  "error": "Error message"
}
```

## GET /events/find

Retrives events based on the user's location and a specifie date.

### Request

This end point requires the below query parameters

#### query parameters:

latitude: The user's latitude (required) \
longitude: The user's longitude (required) \
date: The search date in the format YYYY-MM-DD (required)

### Response

- **200 OK**:

```json
{
  [
    "page_no": {
    "events": [
      {
        "event_name": "Event Name",
        "city_name": "City Name",
        "date": "2024-03-15",
        "time": "12:00:00",
        "weather": "Rainy 25C",
        "distance_km": 8910.23984646717
      }
    ],
    "page": 1,
    "pageSize": 10,
    "totalEvents": 44,
    "totalPages": 1
  },
  ....
]
}

```

response is an array of objects and each object data is a page and each page has following data.

- `events`: An array of event objects, with each object containing the same properties as before (`event_name`, `city_name`, `date`, `time`, `weather`, `distance_km`).
- `page`: The current page number.
- `pageSize`: The number of events per page.
- `totalEvents`: The total number of events matching the criteria.
- `totalPages`: The total number of pages based on the `pageSize`.

- ** 400 Bad Request Error **:

```json
{
  "error": "Error message"
}
```

- ** 500 Internal Server Error **:

```json
{
  "error": "Error message"
}
```
