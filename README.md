# Widgets Demo 2

A modern Angular dashboard application featuring customizable widgets, drag-and-drop layout, and Material Design styling. This project demonstrates advanced Angular patterns, state management, and integration with Tailwind CSS for rapid UI development.

## Features
- Add, remove, and rearrange dashboard widgets
- Drag-and-drop widget management
- Widget customization (size, color, etc.)
- Light/Dark theme toggle
- Persistent widget layout (localStorage)
- Built with Angular 19, Angular Material, and Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm (v9 or later)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd widgets-demo-2
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Library Installation
Install the required libraries if you are integrating these features into another Angular project:
```sh
npm install @angular/material @angular/cdk @angular/animations
npm install tailwindcss postcss autoprefixer
npm install animate-css-grid
```

Follow the official documentation to set up Tailwind CSS and Angular Material in your project if not already configured.

### Running the App
Start the development server:
```sh
npm start
```
Visit [http://localhost:4200](http://localhost:4200) in your browser.

## Project Structure
- `src/app/components/` - Widget components and dialogs
- `src/app/pages/dashboard/` - Dashboard and widget panel
- `src/app/services/` - State management and theme service
- `src/styles.css` - Global styles (includes Tailwind and custom theme)

## Technologies Used
- Angular 19
- Angular Material
- Tailwind CSS
- Animate CSS Grid

## Copying to Another Project
To reuse all dashboard widget features in another Angular project, copy the following files and folders:
- `src/app/components/` (all widget-related components)
- `src/app/pages/dashboard/` (dashboard and widget panel)
- `src/app/services/dashboard.service.ts` and `src/app/services/theme.service.ts`
- `src/app/models/dashboard.model.ts`
- `src/styles.css` and `src/theme.css`
- Update your `angular.json` and Tailwind/PostCSS configs as needed

## Customization
You can add new widgets by extending the `Widget` model and updating the `DashboardService`.

## License
This project is licensed under the MIT License.
