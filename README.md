# URL Shortener Backend

A robust URL shortening service backend built with Spring Boot, featuring advanced analytics, Kafka-based event streaming, and GraphQL API support.

## 🚀 Features

- **URL Shortening**: Generate short, unique codes for long URLs using Base62 encoding
- **URL Redirection**: Fast redirect from short URLs to original destinations
- **User Authentication**: Secure authentication via Clerk integration with JWT tokens
- **Analytics Tracking**: Comprehensive click analytics including:
  - Total and unique click counts
  - Geographic data (country, region, city)
  - Browser and OS detection
  - Device type identification
  - Referrer tracking
  - Time-based analytics
- **Event Streaming**: Asynchronous analytics processing with Apache Kafka
- **GraphQL API**: Flexible analytics querying via GraphQL endpoint
- **Caching**: Performance optimization with Caffeine cache

## 🛠️ Tech Stack

- **Framework**: Spring Boot 3.3.2
- **Language**: Java 17+
- **Database**: MySQL with JPA/Hibernate
- **Authentication**: Clerk + JWT
- **Message Broker**: Apache Kafka
- **API**: REST + GraphQL
- **Caching**: Caffeine
- **Build Tool**: Gradle
- **Containerization**: Docker

## 📁 Project Structure

```
Backend/
├── app/
│   └── src/
│       └── main/
│           ├── java/org/example/
│           │   ├── Config/         # Configuration classes
│           │   ├── Controller/     # REST & GraphQL controllers
│           │   ├── Dto/            # Data Transfer Objects
│           │   ├── Entity/         # JPA entities
│           │   ├── Filter/         # Security filters
│           │   ├── Model/          # Domain models
│           │   ├── Repository/     # Data repositories
│           │   ├── Service/        # Business logic
│           │   ├── Utils/          # Utility classes
│           │   └── App.java        # Main application
│           └── resources/
│               ├── application.properties
│               └── graphql/
│                   └── schema.graphqls
├── gradle/
├── dockerfile
└── build.gradle
```

## 🔧 Configuration

### Environment Variables

The application requires the following environment variables:

| Variable | Description |
|----------|-------------|
| `DB_URL` | MySQL database connection URL |
| `DB_USER` | Database username |
| `DB_PASSWORD` | Database password |
| `APP_BASE_URL` | Base URL for generated short links |
| `KAFKA_BOOTSTRAP_SERVERS` | Kafka broker addresses |
| `KAFKA_USERNAME` | Kafka SASL username |
| `KAFKA_PASSWORD` | Kafka SASL password |
| `CLIENT_ID` | Clerk client ID |
| `CLERK_API_KEY` | Clerk API key |
| `CLERK_FRONTEND_API_KEY` | Clerk frontend API key |

### Create a `.env` file

```env
DB_URL=jdbc:mysql://localhost:3306/urlshortener
DB_USER=your_db_user
DB_PASSWORD=your_db_password
APP_BASE_URL=http://localhost:9091
KAFKA_BOOTSTRAP_SERVERS=your_kafka_server:9092
KAFKA_USERNAME=your_kafka_username
KAFKA_PASSWORD=your_kafka_password
CLIENT_ID=your_clerk_client_id
CLERK_API_KEY=your_clerk_api_key
CLERK_FRONTEND_API_KEY=your_clerk_frontend_api_key
```

## 🚀 Getting Started

### Prerequisites

- Java 17 or higher
- Gradle 8.7+
- MySQL database
- Apache Kafka instance
- Clerk account (for authentication)

### Running Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Set up environment variables**
   Create a `.env` file with the required variables (see Configuration section)

3. **Build the project**
   ```bash
   ./gradlew build
   ```

4. **Run the application**
   ```bash
   ./gradlew bootRun
   ```

The server will start on port `9091`.

### Running with Docker

1. **Build the Docker image**
   ```bash
   docker build -t url-shortener-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 9091:9091 --env-file .env url-shortener-backend
   ```

## 📡 API Endpoints

### REST Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/url` | Create a shortened URL | ✅ |
| `GET` | `/url` | Get all URLs for authenticated user | ✅ |
| `GET` | `/{shortCode}` | Redirect to original URL | ❌ |
| `GET` | `/health` | Health check endpoint | ❌ |

### GraphQL Endpoint

- **Endpoint**: `/analytics`
- **Query Example**:
  ```graphql
  query {
    analytics(shortCode: "abc123") {
      clickCount
      uniqueClickCount
      countryCounts { stat count }
      browserCounts { stat count }
      osCounts { stat count }
      deviceCounts { stat count }
      dateCounts { stat count }
      timeCounts { stat count }
    }
  }
  ```

## 📊 Analytics Data

The analytics system captures the following data for each URL click:

- **Geographic**: Country, Region, City (via IP geolocation)
- **Technical**: Browser, Operating System, Device type
- **Temporal**: Date and time of access
- **Referral**: Referring URL/source
- **Identity**: IP address (for unique click counting)

## 🔒 Security

- JWT-based authentication via Clerk
- Protected endpoints require valid authentication tokens
- SASL/SSL encryption for Kafka communication
