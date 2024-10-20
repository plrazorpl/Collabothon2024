FROM ringcentral/maven:3.8.2-jdk17

WORKDIR /widget
COPY /target/widgetBe-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","widgetBe-0.0.1-SNAPSHOT.jar"]