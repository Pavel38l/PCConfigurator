FROM adoptopenjdk/openjdk11:alpine-jre
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-Xms512m", "-XX:+UseContainerSupport", "-jar", "-Dspring.profiles.active=prod", "/app.jar"]
