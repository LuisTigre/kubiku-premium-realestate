# Kubiku API Deployment Guide (Production Hardening)

This guide documents the final, production-ready deployment strategy for the Kubiku Spring Boot API on Render and Vercel.

## 1. Docker Strategy
We use a multi-stage Docker build to keep the production image minimal and secure.
- **Base Image**: `eclipse-temurin:21-jre-alpine` (Minimal footprint).
- **Security**: Runs as a non-root `spring` user.
- **Caching**: `pom.xml` is copied and dependencies are downloaded before copying source code to speed up builds.

### Local Build and Run
To test the Docker build locally:
```bash
docker build -t kubiku-api -f apps/api/Dockerfile .
docker run -p 8088:8088 --env-file .env kubiku-api
```

## 2. JVM & Memory Optimization (Render)
The application is tuned for Render's 512MB free tier to prevent "Almost Live" hangs during cold-starts.

### Key Environment Variables (Render Dashboard)
| Variable | Value | Description |
| :--- | :--- | :--- |
| `JAVA_TOOL_OPTIONS` | `-XX:+UseContainerSupport -Xms128m -Xmx256m -XX:MaxMetaspaceSize=128m -XX:+UseSerialGC` | **Lean Boot Profile**: Prevents OOM by capping heap and metaspace. |
| `PORT` | `8088` | Explicitly maps Render's router to our internal port. |
| `SPRING_MAIN_LAZY_INITIALIZATION` | `true` | Minimizes cold-start latency. |
| `ALLOWED_ORIGINS` | `https://kubiku-premium-realestate-web.vercel.app` | Whitelists the production frontend. |

## 3. Frontend Configuration (Vercel)
To link the frontend to the live API, set the following in Vercel **Settings > Environment Variables**:

| Variable | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://kubiku-api.onrender.com` |

## 4. Live Endpoints
- **Health Check**: `https://kubiku-api.onrender.com/actuator/health` (Publicly accessible).
- **Swagger UI**: `https://kubiku-api.onrender.com/swagger-ui.html` (Publicly accessible).

## 5. Maintenance Checklist
- **Ghost Clean-up**: Delete `KEYCLOAK_ISSUER_URI` and `KEYCLOAK_JWK_SET_URI` from Render dashboard.
- **Cold Starts**: Render free tier sleeps after 15 mins of inactivity. First request will trigger a ~30s wake-up cycle.
- **Out of Memory**: If logs show `Exit Code 137`, it means the 512MB limit was hit. Check if `JAVA_TOOL_OPTIONS` was overridden.
