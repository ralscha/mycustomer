## Prerequisites
  - ExtJS subscription
  - Install Java: https://jdk.java.net/
  - Install Node.js: https://nodejs.org/en/
  - Login: `npm login --registry=https://npm.sencha.com --scope=@sencha`
  

## Development
1. Clone the repository
2. `cd mycustomer/client7`
3. `npm install`
4. `npm start`
5. In another shell `cd mycustomer`
6. `./mvnw spring-boot:run -Dspring.profiles.active="development"`
7. Open URL http://localhost:1962/ in a browser


## Production Build
1. `./mvnw clean package`
2. The file `target/mycustomer.jar` contains the whole application. Deploy it to a server.
3. Start the application with `java -jar <any_folder>/mycustomer.jar`
4. By default, the application listens on port 80
 