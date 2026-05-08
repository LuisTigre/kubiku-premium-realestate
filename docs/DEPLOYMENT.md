# Kubiku API Deployment Guide (Render Optimization)

This guide documents the optimized deployment strategy for the Kubiku Spring Boot API on Render.

## 1. Docker Strategy
We use a multi-stage Docker build to keep the production image minimal and secure.
- **Base Image**: `eclipse-temurin:21-jre-alpine` (Minimal footprint).
- **Security**: Runs as a non-root `spring` user.
- **Caching**: `pom.xml` is copied and dependencies are downloaded before copying source code to speed up builds.

### Local Build and Run
To test the Docker build locally:
```bash
docker build -t kubiku-api -f apps/api/Dockerfile .
docker run -p 8088:8080 --env-file .env kubiku-api
```

## 2. JVM & Memory Optimization
The application is configured to run efficiently on Render's free or low-tier instances.

### Key Environment Variables (Render Dashboard)
| Variable | Value | Description |
| :--- | :--- | :--- |
| `JAVA_TOOL_OPTIONS` | `-XX:+UseContainerSupport -Xms128m -Xmx384m -XX:+UseSerialGC` | Optimizes memory for containers and enables Serial GC for low-RAM stability. |
| `SPRING_MAIN_LAZY_INITIALIZATION` | `true` | Enables lazy loading of beans to speed up startup. |

## 3. Monitoring and Troubleshooting
- **Logs**: Access via the Render dashboard. Look for `Started KubikuApiApplication in X seconds` to verify successful startup.
- **Cold Starts**: On free tiers, Render may spin down the app. Lazy initialization helps keep these wake-up times low.
- **Out of Memory (OOM)**: If you see `Exit Code 137`, increase the `Xmx` flag in `JAVA_TOOL_OPTIONS` or upgrade the Render plan.

## 4. Scaling
For production scaling:
- **Replica Count**: Increase instances via Render dashboard.
- **Database**: Ensure the PostgreSQL pooler (Supabase) is used to handle multiple connections.
- **GC Tuning**: For higher RAM tiers, consider switching back to G1GC (default) by removing `-XX:+UseSerialGC`.
