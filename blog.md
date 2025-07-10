# Building Levomart: My Journey Creating a Scalable E-commerce Platform Using Microservices & Kubernetes

## ⚡ TL;DR

- ✅ Built **Levomart** — a scalable, polyglot microservices e-commerce backend
- 🛠️ Tech stack: Java Spring Boot, Node.js/Express, Kafka, Docker, Kubernetes, PostgreSQL, MongoDB
- 🔐 Features: JWT Auth, Product, Cart, Order, Payment services with REST + Kafka events
- 🧱 Shared JSON-schema messaging, Swagger/OpenAPI docs, monorepo + Git pre-push safety hook
- 🚀 CI/CD via GitHub Actions & Skaffold; deployed locally and on AWS EC2

---

## Introduction

Welcome to my technical blog series! 👋

Over the past few months, I’ve been building **Levomart**, a full-stack e-commerce platform designed with **microservices architecture**, **event-driven communication**, and **cloud-native deployment** using **Docker**, **Kubernetes**, and **Kafka**.

The goal?  
To **gain real-world engineering experience** by designing and deploying a scalable, production-grade system — the kind that mirrors what backend engineers at top product-based and big tech companies work on every day.

This blog isn't just about showing a finished project. It's about documenting the **why, what, and how** — the entire **journey** of building a system from scratch:

- The architecture decisions I made
- The challenges I faced and learned from
- The tools I used and why
- How I tested, deployed, and monitored services
- What I would do differently next time

> 🚀 Whether you're an aspiring backend developer, a student preparing for SDE interviews, or someone curious about scalable systems — this blog aims to be informative, technical, and genuinely helpful.

- 🔗 [GitHub](https://github.com/your-username)
- 💼 [LinkedIn](https://linkedin.com/in/your-username)
- 🌐 [Portfolio](https://your-portfolio.com)

Let’s dive in! 🔧📦☁️

---

## Problem Statement / Goal

As a developer preparing for software engineering roles at top tech companies, I wanted to go beyond just practicing DSA and building small apps. I needed to work on something that would simulate the kind of challenges backend engineers face in real-world systems.

That’s how **Levomart** was born — a personal project to design, build, and deploy a full-stack, production-ready **e-commerce platform** using modern technologies and architectural patterns.

After completing a backend systems course on Udemy (_\[insert course title/link here\]_), I realized the best way to truly understand these concepts was to build something from the ground up and apply them in a real project.

### Key Goals Behind This Project:

- ✅ Build a **microservices-based architecture** from scratch
- ✅ Implement **secure user authentication** with role-based access
- ✅ Set up **Kafka-based event-driven communication** between services
- ✅ Use **Docker** for containerization and **Kubernetes** for orchestration
- ✅ Deploy everything on **AWS EC2**, simulating cloud production
- ✅ Learn and implement **CI/CD pipelines**, **automated testing**, and **code coverage tools**
- ✅ Document the entire journey to help others learn from it

This project was more than just about writing code — it was about designing a **realistic system** that’s scalable, testable, and production-ready. It gave me the opportunity to explore different tools, solve practical engineering problems, and better understand the infrastructure behind real applications.

---

## Architecture Overview

Before diving into individual services and technical details, here's a high-level overview of how the system is structured.

**Levomart** follows a **microservices architecture**, with each service handling a specific business domain such as authentication, product management, cart operations, orders, and payments. The services communicate using both REST APIs and **asynchronous event-driven messaging** via **Kafka**.

It’s designed to be **modular**, **scalable**, and **cloud-ready**, with all components containerized using **Docker** and orchestrated using **Kubernetes** (K3s for local and EC2 for production-like deployment).

### 🧠 High-Level Tech Stack:

| Layer                | Technology                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Backend Services     | Java Spring Boot (Auth), Node.js/Express (Product, Cart, Payment) |
| Communication        | REST APIs, Kafka (for async events)                               |
| Databases            | PostgreSQL, Redis, MongoDB                                        |
| Containerization     | Docker                                                            |
| Orchestration        | Kubernetes (K3s locally, EC2 on AWS)                              |
| Dev Tools            | Skaffold, Postman, GitHub Actions, Jacoco                         |
| CI/CD                | GitHub Actions                                                    |
| Monitoring (Planned) | Prometheus, Grafana                                               |

---

### 🗺️ System Architecture Diagram

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115579011/13ea6eed-0859-450d-806f-02a18d58f284.png align="center")

A typical request flow:

1. A user accesses the app via the frontend (or REST client like Postman).
2. Requests are routed via the Nginx Ingress Controller to the correct service.
3. Services interact via REST or publish events to Kafka.
4. Each service has its own database (PostgreSQL or MongoDB) following the **database-per-service** pattern.
5. Kafka is used for decoupled communication — e.g., product creation, order placed, stock updates.
6. CI/CD pipelines handle testing, image builds, and deployments.

---

Kubberneetes Cluster Diagram

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115676065/0c9abad6-8c37-4945-84c9-8ecfc70a0ec8.png align="center")

CI CD architecture

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115769796/559a1835-def7-4aa0-8323-e564cf7df2ca.png align="center")

kafka Structures

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752117311141/895286e1-814a-4422-8dd4-8ebb1224d4d2.png align="center")

swagger docs images

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121878211/affc98f4-97cb-4b4e-9ea1-ce1d4b2cfd13.png align="center")

ui images

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121147059/ea2e57d8-5b20-48b3-b393-fe06d9e30e15.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121172379/39969249-538d-49c2-ad33-6a8e7b9f91a8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121215175/59674fe9-8507-4907-af48-18eb47e7adb8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121236597/4e0ad6f9-b9c7-4e77-abca-f88f7da4b431.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121253503/50eeaef8-b761-4a3b-9fa3-bec7c675bf36.png align="center")

This setup closely mimics what you might see in a real-world backend system at scale, and gave me hands-on experience with system architecture, infrastructure management, and production-level patterns.

---

## Key Technical Decisions

In this section, I’ll break down the major components of Levomart and the rationale behind the tools and architecture choices. Each service is designed to be independent, scalable, and production-ready — closely mimicking the architecture of modern backend systems.

---

### 🔐 Authentication Service (Spring Boot + PostgreSQL)

- Built with **Java Spring Boot** and **Spring Security**
- Implements **JWT-based authentication** with access token and role-based control
- Passwords hashed using **BCrypt**
- Supports roles: `USER`, `SELLER`, `ADMIN`
- Connected to **PostgreSQL** for persistent user storage
- Tested using **JUnit**, **Mockito**, and **H2** for integration tests
- Generates **Jacoco** code coverage reports
- Included in **GitHub Actions CI/CD** pipeline with Skaffold build steps

---

### 🛒 Cart Service (Spring Boot + Redis)

- Built with **Spring Boot**
- Uses **Redis** as the primary data store to support fast, in-memory cart operations
- Kafka used to sync cart updates when products or orders change
- Includes secured endpoints and integrates with Auth via JWT tokens
- Supports per-user cart isolation and quantity updates
- Redis schema is optimized for cart item mapping and expiration policies

---

### 🧾 Product Service (Node.js + Express + MongoDB)

- Developed using **Node.js**, **Express**, and **TypeScript**
- Stores product data in **MongoDB**, ideal for flexible product schema (categories, variations, etc.)
- Routes separated for sellers (create/edit products) and admins (moderate/delete)
- Emits `product:created` and `product:updated` events to Kafka
- Fully Dockerized and deployed via **Kubernetes + Skaffold**
- Postman used for API testing during development

---

### 📦 Order Service (Node.js + Express + PostgreSQL)

- Built using **Node.js** and **Express**
- Uses **PostgreSQL** for reliable relational order data (user, product, price, timestamp)
- Subscribes to Kafka events like `cart:checkedout` to place orders
- Emits `order:created` events for downstream services like Payment
- Managed using **Prisma ORM** for type-safe queries and migrations

---

### 💳 Payment Service (Spring Boot + PostgreSQL)

- Created using **Spring Boot**
- Uses **PostgreSQL** to store payment transactions and status logs
- Listens to `order:created` events from Kafka
- Simulates payment confirmation (real integration with Stripe or Razorpay is planned)
- Future-proofed for multi-gateway support (webhooks, retries, etc.)

---

### 📩 Kafka-Based Event System

- **Apache Kafka** powers asynchronous communication across services
- Topics follow a clean namespace convention (e.g., `product:created`, `order:created`)
- Enables decoupling between services while maintaining eventual consistency
- Consumers handle retries, idempotency, and clean shutdown with `SIGINT/SIGTERM`
- Kafka helps scale horizontally without tight service coupling

---

### ☸️ Kubernetes + Skaffold + Docker

- All services are **Dockerized** with production-ready `Dockerfile`s
- Local K8s cluster setup using **K3s**
- **NGINX Ingress Controller** handles routing (`levomart.local`)
- Skaffold simplifies iterative development with auto-rebuilds & re-deploys
- Deployed to **AWS EC2**, using EBS volume snapshots to persist configuration
- Kubernetes manifests include Deployments, Services, Secrets, ConfigMaps, and Ingress

---

### ⚙️ CI/CD with GitHub Actions

- Each service has its own **CI/CD pipeline** with GitHub Actions:
  - Linting, unit tests, integration tests
  - Generate code coverage reports (e.g., Jacoco for Spring services)
  - Build Docker image and push to DockerHub
  - Deploy using Skaffold (optional step)
- Workflow ensures stable, tested deployments with every push
- Runs automatically on PRs, merges, and main branch updates

---

This project allowed me to work across a full-stack backend system — handling everything from secure auth and data modeling to service communication, container orchestration, and CI/CD automation.

---

## Challenges & Learnings

Levomart wasn’t just about writing microservices — it was about building, wiring, testing, and deploying a complete system end-to-end. Along the way, I encountered many real-world engineering challenges that taught me valuable lessons in architecture, tooling, infrastructure, and development workflows.

Here are some of the major challenges and what I learned from each:

---

### 🔁 Kafka Configuration & Event Structure Consistency

- Setting up **Apache Kafka** for reliable event-based communication was a big learning curve.
- Ensuring **consistent message formats** across polyglot microservices (Java + Node.js) was critical to avoid runtime issues.
- Solution:
  - Defined **strict JSON schemas** for all events (e.g., `product:created`, `order:created`)
  - Used **shared schema definitions** across services for type-safe Kafka event handling

---

### 🌐 Polyglot Microservices & Data Consistency

- Managing **data contracts** and response/request consistency between Spring Boot and Node.js services was tricky.
- Solved this by:
  - Using **DTOs (Data Transfer Objects)** in both backends
  - Creating **clearly defined interfaces and schemas** for internal APIs
  - Validating inputs using frameworks like `class-validator` in Node.js and Bean Validation in Spring Boot

---

### ⚙️ CI/CD Workflow (GitHub Actions)

- Setting up **GitHub Actions** for CI/CD across multiple microservices was time-consuming and tedious.
- Each service needed separate steps for:
  - Running tests
  - Generating code coverage
  - Docker build and push
  - Conditional deployment via Skaffold
- I learned how to:
  - Modularize workflows using reusable jobs
  - Use **matrix builds** to reduce redundancy
  - Trigger deployments conditionally on specific branches

---

### ☸️ Kubernetes YAMLs: Ingress, ConfigMaps & Deployments

- Writing Kubernetes manifests for Deployments, Services, ConfigMaps, Secrets, and Ingress was a challenge at first.
- Minor mistakes (like wrong path rewrite or missing `env` key) could silently break routing or crash pods.
- Learned to:
  - Validate YAML using `kubectl explain` and VS Code plugins
  - Use Skaffold profiles to manage multiple environments (local/dev)
  - Create reusable Helm-style configurations (planned next)

---

### 🔐 Managing Environment Variables

- Passing environment variables securely and correctly between **Docker**, **Kubernetes**, and **CI pipelines** was more complex than expected.
- Mistakes like missing DB URLs or incorrect Kafka host strings led to silent failures.
- Resolved by:
  - Using K8s `Secrets` and `ConfigMaps` to manage environment data
  - Documenting `.env` file structure and syncing dev/prod configurations
  - Testing startup environments using Skaffold and local Docker Compose setups

---

### 🧪 Writing Tests: Unit, Integration, and Mocks

- Writing **unit and integration tests** across services with different stacks (Spring Boot and Node.js) was a major challenge.
- Specifically, mocking services like Redis, Kafka, and DBs added complexity.
- Key learnings:
  - Use **H2** and **Testcontainers** for Spring Boot integration tests
  - Mock external modules using **Jest**, **supertest**, and **nock** in Node.js
  - Set up `dev`, `test`, and `prod` environments using `.env` + K8s profiles

---

### 🧠 Final Takeaways

- System design goes beyond writing API endpoints — it’s about building a **reliable, testable, observable, and maintainable architecture**
- Tools like Kafka, K8s, and CI/CD pipelines have steep learning curves — but they add tremendous power and flexibility
- The biggest wins often came from solving infrastructure and consistency issues, not just writing new features

---

These challenges helped me grow as a developer — not just in coding, but in system thinking, debugging, environment management, and automation. They made this project feel more like working on a real production-grade system than just a side project.

---

## Results & Impact

After weeks of designing, building, testing, and refining, Levomart evolved into a fully functional, modular, and cloud-deployable e-commerce backend system.

Here’s what I was able to accomplish:

---

### ✅ What’s Working Today

- 🔐 **Secure JWT-based authentication** with role management (`USER`, `SELLER`, `ADMIN`)
- 🛒 **Fully functional microservices**: Auth, Product, Cart, Order, and Payment — each independently deployable
- ☁️ **All services are Dockerized** and deployed on a local Kubernetes cluster using **K3s**
- 🌐 **NGINX Ingress routing** configured for domain-level access via `levomart.local`
- 🗃️ **Polyglot backend stack**:
  - Java Spring Boot + PostgreSQL (Auth, Cart, Payment)
  - Node.js/Express + MongoDB/PostgreSQL (Product, Order)
- 📩 **Kafka event-driven architecture** implemented with consistent JSON schemas across services
- 🧪 **Unit & integration testing** with test environments configured for each service
- 🚀 **CI/CD pipelines using GitHub Actions** for test automation, code coverage, and optional deployment
- 🔁 **Skaffold for local development workflows**, with support for hot reload and multi-service sync

---

### 🧠 What I Gained

- Hands-on experience with **backend system design**, infrastructure, and DevOps tools
- Learned to handle **real engineering challenges**: message brokering, deployment issues, data consistency, and service communication
- Built the confidence to talk about:
  - CI/CD pipelines
  - Kafka-based systems
  - Docker & Kubernetes deployment
  - Testing strategies in Spring Boot and Node.js
- Created a project I can showcase in my **portfolio**, **resume**, **LinkedIn**, and **interviews**

---

### 💼 Value for Recruiters & Tech Teams

This project isn’t just a demo — it’s a reflection of how I approach system design, tackle technical problems, and learn end-to-end development workflows.

It demonstrates that I can:

- Work across a diverse tech stack
- Build scalable and production-aligned systems
- Debug infrastructure-level issues
- Set up CI/CD and testing pipelines
- Write clean, maintainable, and testable code

---

Levomart became much more than just a side project — it became a personal case study in learning how **real systems work**, and building one from the ground up.

---

## Next Steps

While Levomart is already a solid foundation for a scalable, modular e-commerce backend, my goal is to evolve it into a complete, real-world, production-grade platform. The next phase includes improvements across infrastructure, features, performance, and usability.

---

### 🧠 Architectural & Protocol Enhancements

- 🔄 Build a **GraphQL-based BFF (Backend for Frontend)** for unified API consumption
- 🧬 Use **gRPC** protocol for internal service-to-service communication to reduce latency and enforce strict contracts
- ☁️ Migrate Kubernetes setup to **AWS EKS** for better scalability and managed infrastructure
- 📦 Adopt **Helm** for templated deployments and **cert-manager** for TLS/SSL automation
- 🔐 Manage secrets with **AWS Secrets Manager** or Sealed Secrets in K8s
- 📜 Use **shared** `.json` schemas and explore **Avro (binary format)** for Kafka event validation and performance

---

### 💼 Business & Feature Expansion

- 👤 **User Module Enhancements**: Profile settings, saved addresses, preferences
- 🧾 **Seller Features**: Inventory tracking, bulk product uploads, alerts
- ⭐ **Review & Rating System** for products and sellers
- 🛎️ **Notification Service**: Email, SMS, and in-app messaging
- 🚚 **Delivery & Logistics Module**: Order status, ETA, shipment integration
- 📊 **Analytics Dashboards**: Sales graphs, order volume trends, conversion rates for sellers/admins

---

### 🧠 Intelligent & User-Focused Additions

- 🤖 Add a **Chatbot Service** (rule-based or GPT-powered) to assist customers with FAQs, orders, and support
- 💬 Integrate chatbot via REST/gRPC with intent recognition and fallback support

---

### 📱 Frontend & Mobile Plans

- 🌐 Build a responsive frontend using **Next.js**
  - Separate dashboards for Admin, Seller, and User
  - Server-side rendering for SEO and faster load times
- 📱 Build a **React Native** or **Flutter mobile app** connected via BFF layer
  - Deep linking, push notifications, offline cart, biometric auth (planned)

---

### 📊 Performance & Observability

- 📈 Add observability stack: **Prometheus**, **Grafana**, and **Loki** for logs
- Track:
  - Kafka consumer lag
  - Database query performance
  - Memory/CPU metrics and alerts
- 🔁 **Improve Caching**:
  - Optimize Redis usage for cart, sessions, product listing
  - Use cache invalidation strategies for high-traffic endpoints

---

### 🧪 Testing & CI/CD Improvements

- Expand unit and integration testing using **Testcontainers**, mock servers, and schema contracts
- Use **Kafka schema validation** with Avro or JSON Schema
- Refactor GitHub Actions to:
  - Use reusable workflows
  - Auto-version Docker images
  - Deploy to EKS with Helm per service
  - Preview deployments for PRs

---

These next steps will help me simulate not just a working product, but a **true engineering environment** — where infrastructure, performance, reliability, and user experience are equally important. It’s not just about building features — it's about building them the right way.

---

## Final Thoughts

Building **Levomart** has been one of the most challenging, fulfilling, and educational projects I’ve worked on so far. It allowed me to simulate a real-world software engineering environment — from designing scalable systems and handling service communication to writing tests, setting up CI/CD pipelines, and deploying on the cloud.

What started as a learning experiment became a full-fledged backend platform that reflects my interest in backend architecture, distributed systems, DevOps, and production-level practices.

This project taught me that:

- Writing code is just one part of the equation
- Designing resilient, maintainable systems is what truly makes a backend engineer stand out
- Solving real engineering challenges is the best way to learn and grow

---

### 🙌 Thanks for Reading

If you found this blog helpful or insightful, feel free to share it or reach out. I’d love to:

- Hear your thoughts
- Collaborate on similar projects
- Or chat about backend, system design, and anything in between!

---

### 📬 Let’s Connect

- 🧑‍💻 **GitHub**: [https://github.com/your-username](https://github.com/your-username)
- 💼 **LinkedIn**: [https://linkedin.com/in/your-username](https://linkedin.com/in/your-username)
- 🌐 **Portfolio**: [https://your-portfolio.com](https://your-portfolio.com)

---

**Thanks again for joining me on this journey — more updates coming soon! 🚀**

# Building Levomart: My Journey Creating a Scalable E-commerce Platform Using Microservices & Kubernetes

## ⚡ TL;DR

- ✅ Built **Levomart** — a scalable, polyglot microservices e-commerce backend
- 🛠️ Tech stack: Java Spring Boot, Node.js/Express, Kafka, Docker, Kubernetes, PostgreSQL, MongoDB
- 🔐 Features: JWT Auth, Product, Cart, Order, Payment services with REST + Kafka events
- 🧱 Shared JSON-schema messaging, Swagger/OpenAPI docs, monorepo + Git pre-push safety hook
- 🚀 CI/CD via GitHub Actions & Skaffold; deployed locally and on AWS EC2

---

## Introduction

Welcome to my technical blog series! 👋

Over the past few months, I’ve been building **Levomart**, a full-stack e-commerce platform designed with **microservices architecture**, **event-driven communication**, and **cloud-native deployment** using **Docker**, **Kubernetes**, and **Kafka**.

The goal?  
To **gain real-world engineering experience** by designing and deploying a scalable, production-grade system — the kind that mirrors what backend engineers at top product-based and big tech companies work on every day.

This blog isn't just about showing a finished project. It's about documenting the **why, what, and how** — the entire **journey** of building a system from scratch:

- The architecture decisions I made
- The challenges I faced and learned from
- The tools I used and why
- How I tested, deployed, and monitored services
- What I would do differently next time

> 🚀 Whether you're an aspiring backend developer, a student preparing for SDE interviews, or someone curious about scalable systems — this blog aims to be informative, technical, and genuinely helpful.

- 🔗 [GitHub](https://github.com/your-username)
- 💼 [LinkedIn](https://linkedin.com/in/your-username)
- 🌐 [Portfolio](https://your-portfolio.com)

Let’s dive in! 🔧📦☁️

---

## Problem Statement / Goal

As a developer preparing for software engineering roles at top tech companies, I wanted to go beyond just practicing DSA and building small apps. I needed to work on something that would simulate the kind of challenges backend engineers face in real-world systems.

That’s how **Levomart** was born — a personal project to design, build, and deploy a full-stack, production-ready **e-commerce platform** using modern technologies and architectural patterns.

After completing a backend systems course on Udemy (_\[insert course title/link here\]_), I realized the best way to truly understand these concepts was to build something from the ground up and apply them in a real project.

### Key Goals Behind This Project:

- ✅ Build a **microservices-based architecture** from scratch
- ✅ Implement **secure user authentication** with role-based access
- ✅ Set up **Kafka-based event-driven communication** between services
- ✅ Use **Docker** for containerization and **Kubernetes** for orchestration
- ✅ Deploy everything on **AWS EC2**, simulating cloud production
- ✅ Learn and implement **CI/CD pipelines**, **automated testing**, and **code coverage tools**
- ✅ Document the entire journey to help others learn from it

This project was more than just about writing code — it was about designing a **realistic system** that’s scalable, testable, and production-ready. It gave me the opportunity to explore different tools, solve practical engineering problems, and better understand the infrastructure behind real applications.

---

## Architecture Overview

Before diving into individual services and technical details, here's a high-level overview of how the system is structured.

**Levomart** follows a **polygot** **microservices architecture**, with each service handling a specific business domain such as authentication, product management, cart operations, orders, and payments. The services communicate using both REST APIs and **asynchronous event-driven messaging** via **Kafka**.

It’s designed to be **modular**, **scalable**, and **cloud-ready**, with all components containerized using **Docker** and orchestrated using **Kubernetes** (K3s for local and EC2 for production-like deployment).

### 🧠 High-Level Tech Stack:

| Layer                | Technology                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Backend Services     | Java Spring Boot (Auth), Node.js/Express (Product, Cart, Payment) |
| Communication        | REST APIs, Kafka (for async events)                               |
| Databases            | PostgreSQL, Redis, MongoDB                                        |
| Containerization     | Docker                                                            |
| Orchestration        | Kubernetes (K3s locally, EC2 on AWS)                              |
| Dev Tools            | Skaffold, Postman, GitHub Actions, Jacoco                         |
| CI/CD                | GitHub Actions                                                    |
| Monitoring (Planned) | Prometheus, Grafana                                               |

You can view the full **Mono Repo** structure and services in the [GitHub repository](https://github.com/your-username/levomart).

---

### System Architecture Diagram

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115579011/13ea6eed-0859-450d-806f-02a18d58f284.png align="center")

A typical request flow:

1. A user accesses the app via the frontend (or REST client like Postman).
2. Requests are routed via the Nginx Ingress Controller to the correct service.
3. Services interact via REST or publish events to Kafka.
4. Each service has its own database (PostgreSQL or MongoDB) following the **database-per-service** pattern.
5. Kafka is used for decoupled communication — e.g., product creation, order placed, stock updates.
6. CI/CD pipelines handle testing, image builds, and deployments.

---

### ☸️ Kubernetes Cluster Layout

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115676065/0c9abad6-8c37-4945-84c9-8ecfc70a0ec8.png align="center")

## 🧠 Monorepo & Development Strategy

All services exist in a shared **monorepo**, simplifying:

- Shared JSON schemas for Kafka events
- Unified CI/CD workflows
- Local development with Skaffold & Docker Compose

I also use a **Git pre-push hook** to run tests and builds automatically — ensuring only green code is pushed.

---

## 📩 Kafka Event-Driven Design

Services emit and consume events such as:

- `product:created`, `product:updated`
- `order:created`, `order:updated`, `order:payment-status`

Each event is validated against shared JSON schemas. This ensures **contract consistency** across languages and services.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752117311141/895286e1-814a-4422-8dd4-8ebb1224d4d2.png align="center")

---

## ⚙️ CI/CD Architecture

Using GitHub Actions and Skaffold, each service pipeline includes:

1. Linting & Unit/Integration tests
2. Code coverage (Jacoco for Spring, Jest for Node.js)
3. Docker build & push
4. Optional deployment via Skaffold

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115769796/559a1835-def7-4aa0-8323-e564cf7df2ca.png align="center")

---

## 📜 Swagger / OpenAPI Documentation

All REST endpoints are documented via **Swagger JSDoc** or annotations. This allows:

- Automatic API docs generation
- Interactive Explorer for front-end devs or clients

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752128224725/078d5f0d-74aa-4897-b055-dd27217594b4.png align="center")

---

## 🧑‍💻 UI Preview

I built a simple **Next.js** frontend to interact with Levomart services:

![UI #1](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121147059/ea2e57d8-5b20-48b3-b393-fe06d9e30e15.png align="left")

![UI #2](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121172379/39969249-538d-49c2-ad33-6a8e7b9f91a8.png align="left")

![UI #3](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121215175/59674fe9-8507-4907-af48-18eb47e7adb8.png align="left")

![UI #4](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121236597/4e0ad6f9-b9c7-4e77-abca-f88f7da4b431.png align="left")

![UI #5](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121253503/50eeaef8-b761-4a3b-9fa3-bec7c675bf36.png align="left")

---

## Key Technical Decisions

In this section, I’ll break down the major components of Levomart and the rationale behind the tools and architecture choices. Each service is designed to be independent, scalable, and production-ready — closely mimicking the architecture of modern backend systems.

---

### 🔐 Authentication Service (Spring Boot + PostgreSQL)

- Built with **Java Spring Boot** and **Spring Security**
- Implements **JWT-based authentication** with access token and role-based control
- Passwords hashed using **BCrypt**
- Supports roles: `USER`, `SELLER`, `ADMIN`
- Connected to **PostgreSQL** for persistent user storage
- Tested using **JUnit**, **Mockito**, and **H2** for integration tests
- Generates **Jacoco** code coverage reports
- Included in **GitHub Actions CI/CD** pipeline with Skaffold build steps

---

### 🛒 Cart Service (Spring Boot + Redis)

- Built with **Spring Boot**
- Uses **Redis** as the primary data store to support fast, in-memory cart operations
- Kafka used to sync cart updates when products or orders change
- Includes secured endpoints and integrates with Auth via JWT tokens
- Supports per-user cart isolation and quantity updates
- Redis schema is optimized for cart item mapping and expiration policies

---

### 🧾 Product Service (Node.js + Express + MongoDB)

- Developed using **Node.js**, **Express**, and **TypeScript**
- Stores product data in **MongoDB**, ideal for flexible product schema (categories, variations, etc.)
- Routes separated for sellers (create/edit products) and admins (moderate/delete)
- Emits `product:created` and `product:updated` events to Kafka
- Fully Dockerized and deployed via **Kubernetes + Skaffold**
- Postman used for API testing during development

---

### 📦 Order Service (Node.js + Express + PostgreSQL)

- Built using **Node.js** and **Express**
- Uses **PostgreSQL** for reliable relational order data (user, product, price, timestamp)
- Subscribes to Kafka events like `cart:checkedout` to place orders
- Emits `order:created` events for downstream services like Payment
- Managed using **Prisma ORM** for type-safe queries and migrations

---

### 💳 Payment Service (Spring Boot + PostgreSQL)

- Created using **Spring Boot**
- Uses **PostgreSQL** to store payment transactions and status logs
- Listens to `order:created` events from Kafka
- Simulates payment confirmation (real integration with Stripe or Razorpay is planned)
- Future-proofed for multi-gateway support (webhooks, retries, etc.)

---

### 📩 Kafka-Based Event System

- **Apache Kafka** powers asynchronous communication across services
- Topics follow a clean namespace convention (e.g., `product:created`, `order:created`)
- Enables decoupling between services while maintaining eventual consistency
- Consumers handle retries, idempotency, and clean shutdown with `SIGINT/SIGTERM`
- Kafka helps scale horizontally without tight service coupling

---

### ☸️ Kubernetes + Skaffold + Docker

- All services are **Dockerized** with production-ready `Dockerfile`s
- Local K8s cluster setup using **K3s**
- **NGINX Ingress Controller** handles routing (`levomart.local`)
- Skaffold simplifies iterative development with auto-rebuilds & re-deploys
- Deployed to **AWS EC2**, using EBS volume snapshots to persist configuration
- Kubernetes manifests include Deployments, Services, Secrets, ConfigMaps, and Ingress

---

### ⚙️ CI/CD with GitHub Actions

- Each service has its own **CI/CD pipeline** with GitHub Actions:
  - Linting, unit tests, integration tests
  - Generate code coverage reports (e.g., Jacoco for Spring services)
  - Build Docker image and push to DockerHub
  - Deploy using Skaffold (optional step)
- Workflow ensures stable, tested deployments with every push
- Runs automatically on PRs, merges, and main branch updates

---

This project allowed me to work across a full-stack backend system — handling everything from secure auth and data modeling to service communication, container orchestration, and CI/CD automation.

---

## Challenges & Learnings

Levomart wasn’t just about writing microservices — it was about building, wiring, testing, and deploying a complete system end-to-end. Along the way, I encountered many real-world engineering challenges that taught me valuable lessons in architecture, tooling, infrastructure, and development workflows.

Here are some of the major challenges and what I learned from each:

---

### 🔁 Kafka Configuration & Event Structure Consistency

- Setting up **Apache Kafka** for reliable event-based communication was a big learning curve.
- Ensuring **consistent message formats** across polyglot microservices (Java + Node.js) was critical to avoid runtime issues.
- Solution:
  - Defined **strict JSON schemas** for all events (e.g., `product:created`, `order:created`)
  - Used **shared schema definitions** across services for type-safe Kafka event handling

---

### 🌐 Polyglot Microservices & Data Consistency

- Managing **data contracts** and response/request consistency between Spring Boot and Node.js services was tricky.
- Solved this by:
  - Using **DTOs (Data Transfer Objects)** in both backends
  - Creating **clearly defined interfaces and schemas** for internal APIs
  - Validating inputs using frameworks like `class-validator` in Node.js and Bean Validation in Spring Boot

---

### ⚙️ CI/CD Workflow (GitHub Actions)

- Setting up **GitHub Actions** for CI/CD across multiple microservices was time-consuming and tedious.
- Each service needed separate steps for:
  - Running tests
  - Generating code coverage
  - Docker build and push
  - Conditional deployment via Skaffold
- I learned how to:
  - Modularize workflows using reusable jobs
  - Use **matrix builds** to reduce redundancy
  - Trigger deployments conditionally on specific branches

---

### ☸️ Kubernetes YAMLs: Ingress, ConfigMaps & Deployments

- Writing Kubernetes manifests for Deployments, Services, ConfigMaps, Secrets, and Ingress was a challenge at first.
- Minor mistakes (like wrong path rewrite or missing `env` key) could silently break routing or crash pods.
- Learned to:
  - Validate YAML using `kubectl explain` and VS Code plugins
  - Use Skaffold profiles to manage multiple environments (local/dev)
  - Create reusable Helm-style configurations (planned next)

---

### 🔐 Managing Environment Variables

- Passing environment variables securely and correctly between **Docker**, **Kubernetes**, and **CI pipelines** was more complex than expected.
- Mistakes like missing DB URLs or incorrect Kafka host strings led to silent failures.
- Resolved by:
  - Using K8s `Secrets` and `ConfigMaps` to manage environment data
  - Documenting `.env` file structure and syncing dev/prod configurations
  - Testing startup environments using Skaffold and local Docker Compose setups

---

### 🧪 Writing Tests: Unit, Integration, and Mocks

- Writing **unit and integration tests** across services with different stacks (Spring Boot and Node.js) was a major challenge.
- Specifically, mocking services like Redis, Kafka, and DBs added complexity.
- Key learnings:
  - Use **H2** and **Testcontainers** for Spring Boot integration tests
  - Mock external modules using **Jest**, **supertest**, and **nock** in Node.js
  - Set up `dev`, `test`, and `prod` environments using `.env` + K8s profiles

---

### 🧠 Final Takeaways

- System design goes beyond writing API endpoints — it’s about building a **reliable, testable, observable, and maintainable architecture**
- Tools like Kafka, K8s, and CI/CD pipelines have steep learning curves — but they add tremendous power and flexibility
- The biggest wins often came from solving infrastructure and consistency issues, not just writing new features

---

These challenges helped me grow as a developer — not just in coding, but in system thinking, debugging, environment management, and automation. They made this project feel more like working on a real production-grade system than just a side project.

---

## Results & Impact

After weeks of designing, building, testing, and refining, Levomart evolved into a fully functional, modular, and cloud-deployable e-commerce backend system.

Here’s what I was able to accomplish:

---

### ✅ What’s Working Today

- 🔐 **Secure JWT-based authentication** with role management (`USER`, `SELLER`, `ADMIN`)
- 🛒 **Fully functional microservices**: Auth, Product, Cart, Order, and Payment — each independently deployable
- ☁️ **All services are Dockerized** and deployed on a local Kubernetes cluster using **K3s**
- 🌐 **NGINX Ingress routing** configured for domain-level access via `levomart.local`
- 🗃️ **Polyglot backend stack**:
  - Java Spring Boot + PostgreSQL (Auth, Cart, Payment)
  - Node.js/Express + MongoDB/PostgreSQL (Product, Order)
- 📩 **Kafka event-driven architecture** implemented with consistent JSON schemas across services
- 🧪 **Unit & integration testing** with test environments configured for each service
- 🚀 **CI/CD pipelines using GitHub Actions** for test automation, code coverage, and optional deployment
- 🔁 **Skaffold for local development workflows**, with support for hot reload and multi-service sync

---

### 🧠 What I Gained

- Hands-on experience with **backend system design**, infrastructure, and DevOps tools
- Learned to handle **real engineering challenges**: message brokering, deployment issues, data consistency, and service communication
- Built the confidence to talk about:
  - CI/CD pipelines
  - Kafka-based systems
  - Docker & Kubernetes deployment
  - Testing strategies in Spring Boot and Node.js
- Created a project I can showcase in my **portfolio**, **resume**, **LinkedIn**, and **interviews**

---

### 💼 Value for Recruiters & Tech Teams

This project isn’t just a demo — it’s a reflection of how I approach system design, tackle technical problems, and learn end-to-end development workflows.

It demonstrates that I can:

- Work across a diverse tech stack
- Build scalable and production-aligned systems
- Debug infrastructure-level issues
- Set up CI/CD and testing pipelines
- Write clean, maintainable, and testable code

---

Levomart became much more than just a side project — it became a personal case study in learning how **real systems work**, and building one from the ground up.

---

## Next Steps

While Levomart is already a solid foundation for a scalable, modular e-commerce backend, my goal is to evolve it into a complete, real-world, production-grade platform. The next phase includes improvements across infrastructure, features, performance, and usability.

---

### 🧠 Architectural & Protocol Enhancements

- 🔄 Build a **GraphQL-based BFF (Backend for Frontend)** for unified API consumption
- 🧬 Use **gRPC** protocol for internal service-to-service communication to reduce latency and enforce strict contracts
- ☁️ Migrate Kubernetes setup to **AWS EKS** for better scalability and managed infrastructure
- 📦 Adopt **Helm** for templated deployments and **cert-manager** for TLS/SSL automation
- 🔐 Manage secrets with **AWS Secrets Manager** or Sealed Secrets in K8s
- 📜 Use **shared** `.json` schemas and explore **Avro (binary format)** for Kafka event validation and performance

---

### 💼 Business & Feature Expansion

- 👤 **User Module Enhancements**: Profile settings, saved addresses, preferences
- 🧾 **Seller Features**: Inventory tracking, bulk product uploads, alerts
- ⭐ **Review & Rating System** for products and sellers
- 🛎️ **Notification Service**: Email, SMS, and in-app messaging
- 🚚 **Delivery & Logistics Module**: Order status, ETA, shipment integration
- 📊 **Analytics Dashboards**: Sales graphs, order volume trends, conversion rates for sellers/admins

---

### 🧠 Intelligent & User-Focused Additions

- 🤖 Add a **Chatbot Service** (rule-based or GPT-powered) to assist customers with FAQs, orders, and support
- 💬 Integrate chatbot via REST/gRPC with intent recognition and fallback support

---

### 📱 Frontend & Mobile Plans

- 🌐 Build a responsive frontend using **Next.js**
  - Separate dashboards for Admin, Seller, and User
  - Server-side rendering for SEO and faster load times
- 📱 Build a **React Native** or **Flutter mobile app** connected via BFF layer
  - Deep linking, push notifications, offline cart, biometric auth (planned)

---

### 📊 Performance & Observability

- 📈 Add observability stack: **Prometheus**, **Grafana**, and **Loki** for logs
- Track:
  - Kafka consumer lag
  - Database query performance
  - Memory/CPU metrics and alerts
- 🔁 **Improve Caching**:
  - Optimize Redis usage for cart, sessions, product listing
  - Use cache invalidation strategies for high-traffic endpoints

---

### 🧪 Testing & CI/CD Improvements

- Expand unit and integration testing using **Testcontainers**, mock servers, and schema contracts
- Use **Kafka schema validation** with Avro or JSON Schema
- Refactor GitHub Actions to:
  - Use reusable workflows
  - Auto-version Docker images
  - Deploy to EKS with Helm per service
  - Preview deployments for PRs

---

These next steps will help me simulate not just a working product, but a **true engineering environment** — where infrastructure, performance, reliability, and user experience are equally important. It’s not just about building features — it's about building them the right way.

---

## Final Thoughts

Building **Levomart** has been one of the most challenging, fulfilling, and educational projects I’ve worked on so far. It allowed me to simulate a real-world software engineering environment — from designing scalable systems and handling service communication to writing tests, setting up CI/CD pipelines, and deploying on the cloud.

What started as a learning experiment became a full-fledged backend platform that reflects my interest in backend architecture, distributed systems, DevOps, and production-level practices.

This project taught me that:

- Writing code is just one part of the equation
- Designing resilient, maintainable systems is what truly makes a backend engineer stand out
- Solving real engineering challenges is the best way to learn and grow

---

### 🙌 Thanks for Reading

If you found this blog helpful or insightful, feel free to share it or reach out. I’d love to:

- Hear your thoughts
- Collaborate on similar projects
- Or chat about backend, system design, and anything in between!

---

### 📬 Let’s Connect

- 🧑‍💻 **GitHub**: [https://github.com/your-username](https://github.com/your-username)
- 💼 **LinkedIn**: [https://linkedin.com/in/your-username](https://linkedin.com/in/your-username)
- 🌐 **Portfolio**: [https://your-portfolio.com](https://your-portfolio.com)

---

**Thanks again for joining me on this journey — more updates coming soon! 🚀**

# Building Levomart: My Journey Creating a Scalable E-commerce Platform with Microservices & Kubernetes 🚀

## ⚡ TL;DR

- ✅ Built **Levomart** — a scalable, polyglot microservices e-commerce backend
- 🛠️ Tech stack: Java Spring Boot, Node.js/Express, Kafka, Docker, Kubernetes, PostgreSQL, MongoDB
- 🔐 Features: JWT Auth, Product, Cart, Order, Payment services with REST + Kafka events
- 🧱 Shared JSON-schema messaging, Swagger/OpenAPI docs, monorepo + Git pre-push safety hook
- 🚀 CI/CD via GitHub Actions & Skaffold; deployed locally and on AWS EC2

---

## 👋 Introduction

Welcome to my technical blog series! I built **Levomart**, an e-commerce backend designed with microservices architecture, Kafka-based event-driven communication, and Kubernetes orchestration. The goal: mirror real-world engineering systems, from design to deployment — and share every step.

> 🔗 [View GitHub Repository →](https://github.com/your-username/levomart)[https://github.com/Rajan235/KubeKart](https://github.com/Rajan235/KubeKart)

> 🚀 Whether you're an aspiring backend developer, a student preparing for SDE interviews, or someone curious about scalable systems — this blog aims to be informative, technical, and genuinely helpful.

- 🔗 [GitHub](https://github.com/Rajan235)
- 💼 [LinkedIn](https://www.linkedin.com/in/rajanbansal553/)
- 🌐 [Portfolio](https://rajan235.github.io/portfolio_1/)

Let’s dive in! 🔧📦☁️

---

## 🎯 Motivation & Goal

After a backend systems course, I wanted a deeper experience with:

- System design patterns
- Event-driven messaging
- CI/CD and infrastructure in production scenarios

**Levomart** became my sandbox for learning scalable, testable, and deployable backend architectures.

---

## 🏗️ Architecture Overview

Levomart follows a **polyglot microservices** pattern — services written in different languages but collaborating seamlessly via Kafka and REST.

| Service | Language & Framework         | Database   |
| ------- | ---------------------------- | ---------- |
| Auth    | Java Spring Boot             | PostgreSQL |
| Cart    | Java Spring Boot             | Redis      |
| Product | Node.js/Express + TypeScript | MongoDB    |
| Order   | Node.js/Express + Prisma     | PostgreSQL |
| Payment | Java Spring Boot             | PostgreSQL |

You can view the full monorepo structure and services in the [GitHub repository](https://github.com/your-username/levomart).

Each service is **containerized** with Docker, orchestrated by Kubernetes (K3s for local, EC2 for production), and documented via Swagger/OpenAPI.

### System Architecture Diagram

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115579011/13ea6eed-0859-450d-806f-02a18d58f284.png align="center")

A typical request flow:

1. A user accesses the app via the frontend (or REST client like Postman).
2. Requests are routed via the Nginx Ingress Controller to the correct service.
3. Services interact via REST or publish events to Kafka.
4. Each service has its own database (PostgreSQL or MongoDB) following the **database-per-service** pattern.
5. Kafka is used for decoupled communication — e.g., product creation, order placed, stock updates.
6. CI/CD pipelines handle testing, image builds, and deployments.

---

### ☸️ Kubernetes Cluster Layout

![Kubernetes Cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115676065/0c9abad6-8c37-4945-84c9-8ecfc70a0ec8.png align="left")

---

## 🧠 Monorepo & Development Strategy

All services exist in a shared **monorepo**, simplifying:

- Shared JSON schemas for Kafka events
- Unified CI/CD workflows
- Local development with Skaffold & Docker Compose

I also use a **Git pre-push hook** to run tests and builds automatically — ensuring only green code is pushed.

---

## 📩 Kafka Event-Driven Design

Services emit and consume events such as:

- `product:created`, `product:updated`
- `order:created`, `order:updated`, `order:payment-status`

Each event is validated against shared JSON schemas. This ensures **contract consistency** across languages and services.

![Kafka Messaging](https://cdn.hashnode.com/res/hashnode/image/upload/v1752117311141/895286e1-814a-4422-8dd4-8ebb1224d4d2.png align="left")

---

## ⚙️ CI/CD Architecture

Using GitHub Actions and Skaffold, each service pipeline includes:

1. Linting & Unit/Integration tests
2. Code coverage (Jacoco for Spring, Jest for Node.js)
3. Docker build & push
4. Optional deployment via Skaffold

![CI/CD Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1752115769796/559a1835-def7-4aa0-8323-e564cf7df2ca.png align="left")

---

## 📜 Swagger / OpenAPI Documentation

All REST endpoints are documented via **Swagger JSDoc** or annotations. This allows:

- Automatic API docs generation
- Interactive Explorer for front-end devs or clients

![Swagger Docs](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121878211/affc98f4-97cb-4ea4-9ea1-ce1d4b2cfd13.png align="left")

---

## 🧑‍💻 UI Preview

I built a simple **Next.js** frontend to interact with Levomart services:

![UI #1](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121147059/ea2e57d8-5b20-48b3-b393-fe06d9e30e15.png align="left")

![UI #2](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121172379/39969249-538d-49c2-ad33-6a8e7b9f91a8.png align="left")

![UI #3](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121215175/59674fe9-8507-4907-af48-18eb47e7adb8.png align="left")

![UI #4](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121236597/4e0ad6f9-b9c7-4e77-abca-f88f7da4b431.png align="left")

![UI #5](https://cdn.hashnode.com/res/hashnode/image/upload/v1752121253503/50eeaef8-b761-4a3b-9fa3-bec7c675bf36.png align="left")

---

## 🛠️ Service Summaries

### 🔐 Auth Service

- JWT tokens, role-based access with Spring Security
- Tested with JUnit + Mockito
- Integration-tested via H2 DB

### 🛒 Cart Service

- In-memory carts + Kafka sync
- Secured with JWT

### 🧾 Product Service

- TypeScript/Express APIs + MongoDB
- Emits `product` events

### 📦 Order Service

- Consumes cart events, publishes order events
- Uses Prisma ORM

### 💳 Payment Service

- Listens for `order:created`, handles payment simulation

---

## 🚧 Challenges & Learnings

1. **Kafka schema validation** across multi-language services
2. **Complex CI/CD pipelines** with reusable steps
3. **YAML drift** in Kubernetes manifests — caught via Skaffold profiles
4. **Env var propagation** across local, CI, and Kubernetes setups
5. **Testing Kafka, Redis, DB** via mocks and containers

---

## ✅ What Comes Together

- Secure microservices ecosystem
- Event-driven messaging with JSON schema validation
- Full CI/CD automation
- Local development via Skaffold + Docker Compose
- Monorepo with Git hooks for code quality

---

## 🛠️ Next Steps

- Upgrade to AWS EKS + Helm
- Add GraphQL BFF and gRPC inter-service APIs
- Introduce monitoring (Prometheus, Grafana)
- Expand features: profiles, reviews, notifications, chatbot
- Launch React Native/Flutter mobile app

---

## 📚 Mini-Series (Deep Dives)

This post is an overview. Don’t miss the upcoming series:

- 🔐 Spring Boot Auth Service Deep Dive
- 🎧 Kafka Event-Driven Architecture Explained
- 🛠️ Deploying Services with Kubernetes & Skaffold
- 🚀 CI/CD with GitHub Actions & Skaffold

---

## 💬 Final Thoughts

Levomart has been a journey — tackling real engineering problems and building systems that mirror production setups. I hope this inspires and helps others on similar paths.

---

## 🤝 Connect With Me

- 💻 **GitHub**: [https://github.com/Rajan235](https://github.com/Rajan235)
- 💼 **LinkedIn**: [https://www.linkedin.com/in/rajanbansal553/](https://www.linkedin.com/in/rajanbansal553/)
- 🌐 **Portfolio**: [https://rajan235.github.io/portfolio_1/](https://rajan235.github.io/portfolio_1/)
- 🔗 [View GitHub Repository →](https://github.com/your-username/levomart)[https://github.com/Rajan235/KubeKart](https://github.com/Rajan235/KubeKart)

**Thanks again for joining me on this journey — more updates coming soon! 🚀**
