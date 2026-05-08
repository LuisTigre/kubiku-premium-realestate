# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app
# Copy pom.xml first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B
# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests -B

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
# Copy the built JAR
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar
# Expose the application port
EXPOSE 8080
# Use exec form for ENTRYPOINT to ensure proper signal handling
ENTRYPOINT ["java", "-jar", "app.jar"]
