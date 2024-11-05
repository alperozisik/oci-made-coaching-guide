# Oracle OCI M.A.D.E Coaching Guide

This project is a React-based single-page application designed to provide an interactive guide for Oracle partners. Users can select their **persona**, then browse related **topics**, and access useful links that are customized to their selections. The page is styled to resemble Oracle's Redwood theme.

## Project Overview

The application provides:
1. **Persona Selection**: Users start by selecting their role or persona.
2. **Topic Selection**: Based on the selected persona, relevant topics are displayed.
3. **Link List**: After choosing a topic, users can view a list of recommended links, categorized into certification and other resources.

This project has two builds:
- **Web**: Standard single-page application for web hosting.
- **Single**: All assets are inlined into a single HTML file, making it ideal for offline sharing via email.

## Features

- **React Components**: Modular and reusable components for a seamless user experience.
- **Dynamic Data**: Content is dynamically loaded from a JSON file (`guide.json`), allowing easy updates.
- **Breadcrumb Navigation**: Allows users to navigate back to previous steps easily.
- **Oracle Redwood Theme**: Styled to match Oracle's official theme for consistent branding.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/alperozisik/oci-made-coaching-guide.git
   cd oci-made-coaching-guide
   ```
2. **Install Dependencies:**:
    ```bash
   npm install
   ```
3. **Start the Development Server**:3
    ```bash
   npm start
   ```
   This command runs the app in development mode. Open http://localhost:3000 to view it in your browser.

### Build Commands
The project supports two different build modes using Webpack:
- **Web**: For web hosting (external assets).
    ```bash
    npm run build:Web
    ```
- **Single**: For offline sharing (all assets embedded).
    ```bash
    npm run build:Single
    ```
    This will create a dist folder with the Single build, where all assets are inlined into the HTML.

## Contributing

Contributions are welcome! Please follow these steps:

1.	**Fork the repository**
2.	**Create a new branch** for your feature or bug fix:
       ```bash
       git checkout -b feature/your-feature
       ```
3. **Commit your changes** and open a pull request. 

## License
This project is licensed under the MIT License.