# Microservice Polling Application

> A production-ready, cloud-native polling application demonstrating modern DevOps practices, microservices architecture, and full-stack development skills.

[![Frontend Repo](https://img.shields.io/badge/repo-frontend-blue)](https://github.com/neilchauhan2/microservice-app-client)
[![Backend Repo](https://img.shields.io/badge/repo-backend-orange)](https://github.com/neilchauhan2/microservice-app-server)

---

## 🎯 Project Overview

This project showcases a full-stack polling application built with a **microservices architecture** and deployed to **Azure Kubernetes Service (AKS)**. It demonstrates proficiency in modern software development, containerization, orchestration, and CI/CD practices.

**What makes this project special:**
- ✅ Production-grade microservices architecture
- ✅ Automated CI/CD pipelines with GitHub Actions
- ✅ Kubernetes orchestration on Azure AKS
- ✅ GitOps workflow with ArgoCD
- ✅ Container registry management with Docker Hub

---

## 🏗️ Architecture

### System Architecture

The application follows a microservices pattern with clear separation of concerns:

<img width="623" height="133" alt="frontend-ci-cd" src="https://github.com/user-attachments/assets/20f9e3a9-16e6-42f9-b914-5fa2f71d68a2" />

*Frontend CI/CD Flow*

<img width="1097" height="548" alt="backend-ci-cd" src="https://github.com/user-attachments/assets/a7d47d25-780e-4273-93b0-ee0c6e3660fe" />

*Backend CI/CD Flow*

### Components

**Frontend Service**
- React-based SPA
- Deployed to Vercel for edge optimization
- Communicates with backend via API gateway

**Backend Services**
1. **Polling Service** (Port 8000)
   - Manages polls and nominations
   - Handles voting logic
   - Real-time vote counting

2. **User Service** (Port 8001)
   - User authentication & authorization
   - JWT-based session management
   - Secure password hashing with bcrypt

**Infrastructure Components**
- **Nginx API Gateway**: Routes requests to appropriate microservices
- **MongoDB**: Persistent data storage with StatefulSet
- **Docker Hub**: Container image registry
- **Azure AKS**: Kubernetes cluster for orchestration
- **ArgoCD**: GitOps continuous delivery tool

### Network Architecture

```
                   Internet → Nginx API Gateway (80)
                                    ↓
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
            Polling Service (8000)          User Service (8001)
                    ↓                               ↓
                    └───────────────┬───────────────┘
                                    ↓
                              MongoDB (27017)
```

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bulma CSS** - Responsive styling
- **Chart.js** - Data visualization
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Jest/Supertest** - Testing framework

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **Kubernetes** - Production orchestration
- **Azure AKS** - Managed Kubernetes service
- **ArgoCD** - GitOps CD tool
- **GitHub Actions** - CI/CD automation
- **Nginx** - Reverse proxy & load balancer
- **Docker Hub** - Container registry

---

## ✨ Key Features

### User Features
- ✅ User registration and authentication
- ✅ Create custom polls
- ✅ Add multiple nominations to polls
- ✅ Real-time voting with instant updates
- ✅ Visual vote results with charts
- ✅ Responsive design for all devices

### Technical Features
- ✅ Stateless microservices for horizontal scaling
- ✅ JWT-based authentication
- ✅ RESTful API design
- ✅ Database connection pooling
- ✅ Health checks and readiness probes
- ✅ Graceful shutdown handling
- ✅ CORS-enabled API

---

## 🚀 DevOps Implementation

### Containerization Strategy

Each microservice is containerized with optimized Docker images:

**Multi-stage builds** for reduced image size:
```dockerfile
FROM node:22-slim
WORKDIR /src
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

**Image optimization results:**
- Production-only dependencies
- Minimal base images (node:22-slim)
- Layer caching for faster builds

### Kubernetes Deployment

<img width="2880" height="2412" alt="argo-cd-apps" src="https://github.com/user-attachments/assets/5d74c130-9d40-40c1-9993-98db5aa5f946" />

*ArgoCD Application Management Interface*

<img width="3642" height="3468" alt="argocd-deployment-flow" src="https://github.com/user-attachments/assets/5e2f3c7f-e53e-43e1-8ac9-3775c47f2cae" />

*Detailed view of Kubernetes deployments, services, and pods with ArgoCD*

**Deployment Strategy:**
- Rolling updates with zero downtime
- Resource limits and requests defined
- Liveness and readiness probes configured
- ConfigMaps for environment-specific config
- Secrets for sensitive data
- Persistent volumes for database

**Sample Kubernetes Configuration:**
```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "250m"
    memory: "256Mi"

readinessProbe:
  httpGet:
    path: /api/polling/hello
    port: 8000
  initialDelaySeconds: 15
  periodSeconds: 10
```

### GitOps with ArgoCD

- Declarative infrastructure management
- Automatic sync from Git repository
- Visual deployment tracking
- Rollback capabilities
- Health status monitoring

<img width="3642" height="3468" alt="argocd-deployment-flow" src="https://github.com/user-attachments/assets/06c92fad-1dcf-45d1-b782-be959450cb82" />

*Application showing "Healthy" and "Synced" status in production*

---

## 💻 Local Development

### Prerequisites
- Node.js 22+
- Docker & Docker Compose
- Git

### Quick Start

1. **Clone the repositories:**
```bash
# Backend
git clone https://github.com/yourusername/microservice-app-server.git
cd microservice-app-server

# Frontend (separate terminal)
git clone https://github.com/yourusername/microservice-app-client.git
cd microservice-app-client
```

2. **Set up environment variables:**
```bash
# In backend directory
cp .env.example .env
# Edit .env with your configuration
```

3. **Start services with Docker Compose:**
```bash
docker-compose up -d
```

4. **Access the application:**
- Frontend: http://localhost:3000
- Polling Service: http://localhost:8000
- User Service: http://localhost:8001
- MongoDB: localhost:27017

### Development Commands

```bash
# View logs
docker-compose logs -f

# Restart a service
docker-compose restart polling-service

# Stop all services
docker-compose down

# Remove all data
docker-compose down -v
```

### Testing

```bash
# Run backend tests
npm test

# Run frontend tests
cd microservice-app-client
npm test

# Run with coverage
npm test -- --coverage
```

---

## 🌐 Production Deployment

### Azure AKS Setup

<img width="2880" height="3646" alt="aks cluster" src="https://github.com/user-attachments/assets/6885a465-73e3-48e2-a1d2-4ee366401119" />

*Azure Kubernetes Service cluster configuration details*

**Cluster Specifications:**
- Kubernetes Version: 1.32.7
- Region: East Asia
- Node Pool: 1 node (scalable)
- Network: Azure CNI Overlay
- Load Balancer: Standard SKU

### Deployment Process

1. **Build Docker images** (automated via GitHub Actions)
2. **Push to Docker Hub** with version tags
3. **Update Kubernetes manifests** with new image tags
4. **ArgoCD detects changes** and syncs cluster state
5. **Rolling update** deploys new version

### Kubernetes Services

<img width="1057" height="232" alt="kubectl-get-svc" src="https://github.com/user-attachments/assets/1f1b9a34-95fd-440c-8c8c-07aa512a8bfc" />

*List of Kubernetes services*

<img width="940" height="218" alt="kubectl-get-pods" src="https://github.com/user-attachments/assets/f633d8f3-ccdf-4a35-89a8-1cd651002567" />

All pods in Running state with restart counts and ages*

**Service Endpoints:**
- Nginx LoadBalancer: External access point
- Polling Service: Internal ClusterIP
- User Service: Internal ClusterIP
- MongoDB: Internal ClusterIP with StatefulSet

### Database Strategy

**MongoDB StatefulSet:**
- Persistent Volume Claims for data retention
- Automatic pod rescheduling on node failure
- Init scripts for schema setup
- Secrets management for credentials

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

**1. Polling Service Pipeline**

<img width="1081" height="258" alt="Screenshot 2025-10-27 at 1 48 09 PM" src="https://github.com/user-attachments/assets/770c60b0-d6d5-49a8-9c89-16d878ea151f" />

```yaml
Trigger → Test → Build Docker Image → Push to Registry → Update K8s Manifests
```

**2. User Service Pipeline**

<img width="1083" height="271" alt="Screenshot 2025-10-27 at 1 48 43 PM" src="https://github.com/user-attachments/assets/473d420b-9605-453a-b707-2d045ca0bcf2" />

```yaml
Trigger → Test → Build Docker Image → Push to Registry → Wait for Polling* → Update K8s Manifests
```
*Implements concurrency control to prevent manifest conflicts

**3. Frontend Pipeline**

<img width="1096" height="254" alt="Screenshot 2025-10-27 at 2 30 14 PM" src="https://github.com/user-attachments/assets/23349277-aace-46d2-9876-e28b3d3ac666" />

```yaml
Trigger → Test → Build → Deploy to Vercel
```

### Key Pipeline Features

✅ **Automated Testing**: All tests must pass before deployment
✅ **Docker Layer Caching**: Faster builds with GitHub Actions cache
✅ **Semantic Versioning**: Images tagged with build numbers
✅ **Concurrency Control**: Prevents race conditions in manifest updates
✅ **Automatic Rollback**: Failed deployments trigger alerts
✅ **Environment Separation**: Different configs for dev/staging/prod

### Workflow Synchronization

To handle concurrent updates, the User Service workflow includes:
- Detection of running Polling Service CI
- Wait mechanism (up to 10 minutes)
- Sequential manifest updates
- Conflict prevention

---

## 📊 Monitoring & Observability

### Application Health Checks

**Health Endpoints:**
- `/api/polling/hello` - Polling service health
- `/api/user/hello` - User service health

![Application Working](app-polling-hello.png)
*Image 5: Polling service /hello endpoint returning "Hello World!"*

![User Service Working](app-user-hello.png)
*Image 6: User service /hello endpoint confirming service availability*

### Kubernetes Monitoring

**Pod Health Metrics:**
- Ready status for all pods
- Restart counts
- Resource utilization
- Age and uptime

**Service Monitoring:**
- LoadBalancer external IP allocation
- ClusterIP assignments
- Port mappings
- Service discovery

### Logging Strategy

```bash
# View service logs
kubectl logs -f deployment/polling-service
kubectl logs -f deployment/user-service

# View ArgoCD sync logs
kubectl logs -f -n argocd deployment/argocd-application-controller
```

---

## 📚 Lessons Learned

### Technical Insights

1. **Microservices Complexity**
   - Managing inter-service communication requires careful planning
   - Service discovery and health checks are critical
   - Distributed logging becomes essential at scale

2. **CI/CD Challenges**
   - Concurrent pipeline runs need synchronization
   - Manifest updates require careful version control
   - Testing in production-like environments is crucial

3. **Kubernetes Operations**
   - Proper resource limits prevent cluster instability
   - Readiness probes are different from liveness probes
   - StatefulSets are necessary for databases

4. **GitOps Benefits**
   - Declarative infrastructure is easier to manage
   - Git history provides audit trail
   - Rollbacks are straightforward

### Best Practices Adopted

✅ Infrastructure as Code for reproducibility
✅ Automated testing in CI pipeline
✅ Container image versioning
✅ Health checks for all services
✅ Secrets management
✅ Documentation as code

---

## 📞 Contact

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🔗 Related Repositories

- **Frontend Repository**: [microservice-app-client](https://github.com/neilchauhan2/microservice-app-client)
- **Backend Repository**: [microservice-app-server](https://github.com/neilchauhan2/microservice-app-server)

---

## ⭐ Acknowledgments

Built with modern DevOps practices and cloud-native technologies to demonstrate real-world production deployment skills.

**Technologies**: React • Node.js • Express • MongoDB • Docker • Kubernetes • Azure AKS • ArgoCD • GitHub Actions • Nginx

---

*Last Updated: October 2025*
