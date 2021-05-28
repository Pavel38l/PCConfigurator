FROM adoptopenjdk/openjdk11:alpine-jre
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-Xmx400m", "-XX:+UseContainerSupport", "-jar", "-Dspring.profiles.active=prod", "/app.jar"]
