Online Demo: https://demo.rasc.ch/mycustomer/


## Development
 
1. Clone the repository
2. ```cd mycustomer/clientopen```
3. ```npm run dev```
4. In another shell ```cd mycustomer```
5. ```./mvnw spring-boot:run -Dspring.profiles.active="development"```
6. Open url http://localhost:8080 in a browser


## Production Build
1. ```./mvnw clean package```
2. The file ```target/mycustomer.jar``` contains the whole application. Deploy it to a server.
3. Start the application with ```java -jar <any_folder>/mycustomer.jar```
4. By default, the application listens on port 80
 