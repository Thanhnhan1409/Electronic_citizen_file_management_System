# Citizen Management System

### Introduction
The Citizen Management System is a comprehensive web application developed to manage and process personal information of Vietnamese citizens. With the goal of providing a secure, convenient, and transparent platform, this product allows citizens to access personal information and interact with government agencies easily. The system is named "Citizen Management System" and is built with two main components: the front-end using the Nuxt.js framework and the back-end using the Spring framework

### Project Context

This product development process originates from the subject Programming Project 3. Currently, communicating and processing information with government agencies is sometimes difficult and cumbersome. Therefore, I have chosen this topic to provide a convenient solution, enhance convenience and create transparency in the management of personal information.

### Project Timeline

The development of the product started in Feb 2023 and was completed after 4 months of work. This process includes the stages of research, design, development, and testing.

### Role in the Development Process

During product development, I took on the role of a Front-End Developer. The product is the result of a team of 2 people, in which we take care of UI/UX design and front-end development, testing. In addition, I also participate in discussing issues that arise during the implementation process with you. In this role, I learned a lot about the web, developed creative thinking and asked about the process to perfect a product.

### Product Features

1. Login Functionality
- The system allows users to log in using their identification number as the account name and the provided password.
- The system allows authorized government personnel to log in using their assigned accounts.
2. Logout Functionality
- The system allows users to log out of the system.
3. Change Password Functionality
- The system allows users to change their password after logging into the system.
4. View Information Functionality
- The system allows Vietnamese citizens to view personal information, including citizen information, criminal records, and basic information of household members.
- The system allows Vietnamese citizens to view basic information of state leaders and authorized local and national agencies.
5. Submit Requests Functionality
- The system allows Vietnamese citizens to submit requests through the system for certification, document verification, and more.
- The system allows Vietnamese citizens to create complaint forms through the system.
- The system allows Vietnamese citizens to submit requests for changes and updates in case of incorrect personal information.
6. Appointment Scheduling Functionality
- The system allows users to select a time slot to schedule appointments with authorized officials to resolve various issues.
- The system allows Vietnamese citizens to modify the time information after scheduling an appointment.
- The system allows Vietnamese citizens to cancel their scheduled appointments.
- The system allows Vietnamese citizens to view their scheduled appointments.
7. Notification Functionality
- The system allows citizens to receive notifications from government agencies regarding economic, social, political issues, and changes in legislation.
- The system notifies citizens about the processing of their requests and the time to receive registered documents or pending processes.
8. Feedback Functionality
- The system allows users to provide feedback and suggestions regarding the system and government officials for appropriate adjustments.
- The system allows Vietnamese citizens to enter their feedback and suggestions through the system.
- The system allows sending feedback and suggestions to the relevant authorities.
### Build/Run/Deploy Instructions

- Build and Run Front-end
- Install Node.js (https://nodejs.org) and npm (https://www.npmjs.com).
- Clone the repository to your local machine: git clone https://github.com/Thanhnhan1409/PBL3_Electronic_citizen_file_management_System.git
- Navigate to the front-end directory of the project: cd frontend.
- Install the dependencies: npm install.
- Run the application in development mode: npm run dev.
- Access the application through http://localhost:3000.

Build and Run Back-end
- Install the Java Development Kit (JDK) on your computer.
- Clone the repository from GitHub by copying the repository's URL and running the command git clone <URL> in the Command Prompt or Terminal.
- Open the project in an Integrated Development Environment (IDE) such as IntelliJ IDEA or Eclipse.
- Create a database named PBL in sql server
- Reset host, username, password in src/main/resources/application.properties
- Ensure that all project dependencies are installed. If the project uses Maven, run the command mvn install to download and install the dependencies.
- Use the IDE to build the project. In IntelliJ IDEA, you can select Run > Build or press the Ctrl + F9 key combination to build the project.
- After a successful build, you can run the application by selecting Run > Run or pressing the Shift + F10 key combination in IntelliJ IDEA.


### Technical Highlights

- Front-end: The application is built using the Nuxt.js framework and utilizes HTML, CSS, and JavaScript to create an interactive user interface.
- Back-end: The application utilizes the Spring framework to build APIs and manage data from the database. Use pinia in-app state management and use middleware to check if the user is logged in or not, if not, block access to pages that need to be logged in.
- JSON Web Tokens (JWT) are used for user authentication and session management.

### Contribution and Technological Capabilities
I welcome any form of contribution and improvement to the product. If you have any feedback or encounter issues while using the product, please create an issue in the project's repository. I am ready to provide support and enhance the product to deliver the best user experience.
