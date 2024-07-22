# Task Management Frontend (Angular)

This frontend application built with Angular serves as a robust task management system designed to streamline task organization and tracking. It features CRUD (Create, Read, Update, Delete) operations for tasks, advanced filtering and sorting capabilities, dynamic user interface components using Angular Material, and seamless integration with backend APIs for efficient data management. The application offers intuitive task duplication, notes management, and status toggling functionalities to enhance user productivity and workflow management.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Development](#development)
- [Build and Deployment](#build-and-deployment)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Project Link](#project-link)

## Features
- **Task Management**: View, add, edit, delete, and duplicate tasks.
- **Sorting and Filtering**: Sort tasks by various criteria and filter tasks based on search queries.
- **Responsive Design**: Ensures the application works well on different devices and screen sizes.
- **Angular Material**: Utilizes Angular Material for UI components and theming.

## Technologies Used
- **Angular**: Version 12
- **Angular Material**: UI component library
- **RxJS**: Reactive Extensions for JavaScript
- **TypeScript**: Typed superset of JavaScript

## Prerequisites
Before starting, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Angular CLI: Install globally using `npm install -g @angular/cli`

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/username/repository.git
   cd repository/
2. **Install project dependencies:**
   ```bash
   npm install
3. **Run the Application:**
   ```bash
   ng serve (npm run dev)
4. **Access the application in your browser:**
   http://localhost:4200

## Folder Structure

- **src/app/**: Contains the main application components, services, and modules.
- **src/assets/**: Static assets such as images, fonts, etc.
- **src/environments/**: Environment configuration files (e.g., environment.prod.ts, environment.ts).

## Development

### Component Structure

The project organizes components, services, and modules under the `src/app/` directory:

- **Components**: Found in `src/app/components/`, each manages specific UI and functionality aspects.
- **Services**: Located in `src/app/services/`, they handle data retrieval, manipulation, and backend API communication.
- **Modules**: Modules like `AppModule` and feature modules group related components and services.

### Services and API Integration

- **TaskService**: Manages CRUD operations for tasks using Angular's HttpClient module to interact with the backend API.

### Routing

- **Angular Router**: Configured in `src/app/app-routing.module.ts` for seamless navigation between components and views.

### State Management

- **Data Binding**: Utilizes Angular's two-way data binding and reactive forms (`@angular/forms`) for efficient data handling and validation.

## Build and Deployment

### Building the Application

To compile the application for production:

1. **Build Command**: Execute the following Angular CLI command to create a production build:
   ```bash
   ng build --prod
  The build artifacts will be stored in the `dist/` directory.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- [Rohit Kumar](https://github.com/krohit2552)


## Project Link

The application is deployed and accessible at: [TaskWebApp](https://taskwebapp.netlify.app)
