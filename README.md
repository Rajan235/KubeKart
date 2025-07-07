# LevoMart – Cloud-Native E-Commerce Platform
Built with Microservices • Kafka • Kubernetes • Stripe

LevoMart is a scalable e-commerce platform built using a real-world microservices architecture. It simulates production-grade backend systems with decoupled services, Kafka-based communication, and end-to-end infrastructure.

Built for learning system design, payments integration, DevOps, and scalable full-stack architecture.



## Features

- JWT-based authentication with roles
- Product management (CRUD)
- Redis-based cart service
- Order lifecycle with Kafka events
- Stripe payments and webhook handling
- Event-driven service communication
- Docker + Kubernetes + Skaffold orchestration
- GitHub Actions CI + Jacoco test coverage



## Tech Stack

**Backend:** Java Spring Boot, Node.js  
**Frontend:** Next.js (React)  
**Communication:** Apache Kafka  
**Payments:** Stripe  
**Data:** PostgreSQL, Redis, MongoDB  
**Infra:** Docker, Kubernetes, Skaffold  
**CI/CD:** GitHub Actions, Jacoco  

## Architecture Diagram
![LevoMart Architecture](link-to-your-diagram.png)

## Screenshots

#### UI
![Product Page](link.png)
![Cart Page](link.png)

#### Kubernetes Dashboard
![Pods](link.png)

#### Stripe Webhook Logs
![Stripe](link.png)

#### GitHub Actions CI
![CI](link.png)



## testing
- Unit tests with JUnit & Mockito
- Integration tests using `@SpringBootTest` and H2
- Kafka testing via TestContainers
- CI test coverage with Jacoco badge

## Api endpoints / Usage

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


# Installation/Getting Started (Local)

## Clone the repo
git clone https://github.com/yourusername/levomart-ecommerce

## Start services manually (auth, cart, etc.)
cd auth-service
./mvnw spring-boot:run

cd client
npm install && npm run dev

# Build and run all services with Skaffold
skaffold dev

## Microservices Breakdown
- `auth-service`: Auth, JWT, roles
- `product-service`: Product CRUD + Kafka
- `cart-service`: Redis cart management
- `order-service`: Kafka-based order flow
- `payment-service`: Stripe + Kafka webhook
- `client`: Next.js frontend

## 🔄 CI/CD
- GitHub Actions runs on every push
- Test execution + coverage reports via Jacoco
- Docker images auto-built and tested

## Roadmap

- [ ] Admin dashboard
- [ ] AWS deployment (EKS)
- [ ] Monitoring with Prometheus/Grafana
- [ ] GraphQL gateway



## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## 📬 Contact
Built by [Your Name](https://www.linkedin.com/in/yourprofile)

Connect if you're hiring, collaborating, or just love distributed systems 🚀

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

