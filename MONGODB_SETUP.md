# MongoDB Docker Setup Guide

## Overview

This application now uses a containerized MongoDB instance instead of MongoDB Atlas. All data is stored locally in a Docker volume.

## Configuration

### MongoDB Container Details

- **Image**: mongo:5.0
- **Port**: 27017
- **Container Name**: microservice-mongodb
- **Database Name**: microservice_db
- **Admin Username**: admin
- **Admin Password**: password123

### Connection String

```
mongodb://admin:password123@mongodb:27017/microservice_db?authSource=admin
```

## Commands

### Start All Services

```bash
docker-compose up -d
```

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove All Data

```bash
docker-compose down -v
```

### View Logs

```bash
# MongoDB logs
docker logs microservice-mongodb

# User service logs
docker logs microservice-app-server-user-service-1

# Polling service logs
docker logs microservice-app-server-polling-service-1

# All logs in real-time
docker-compose logs -f
```

### Access MongoDB Shell

```bash
docker exec -it microservice-mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### Restart a Specific Service

```bash
docker-compose restart user-service
docker-compose restart polling-service
docker-compose restart mongodb
```

## Accessing the Application

- **User Service**: http://localhost:8001
- **Polling Service**: http://localhost:8000
- **Nginx Gateway**: http://localhost:80
- **MongoDB**: localhost:27017

## Data Persistence

MongoDB data is stored in a Docker volume named `mongodb_data`. This means:

- Data persists across container restarts
- Data is only removed when you run `docker-compose down -v`
- You can backup the volume if needed

## Security Notes

**⚠️ Important for Production:**

- Change the default MongoDB username and password
- Use environment variables for sensitive data
- Update the JWT_SECRET to a strong, random value
- Consider using Docker secrets for credentials

## Troubleshooting

### Services not connecting to MongoDB

1. Ensure MongoDB container is running: `docker ps | grep mongodb`
2. Check MongoDB logs: `docker logs microservice-mongodb`
3. Verify network connectivity: `docker network inspect microservice-app-server_microservice-network`

### Reset MongoDB data

```bash
docker-compose down -v
docker-compose up -d
```

### View MongoDB collections

```bash
docker exec -it microservice-mongodb mongosh -u admin -p password123 --authenticationDatabase admin
use microservice_db
show collections
```
