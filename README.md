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
   git clone https://github.com/yourusername/oci-made-coaching-guide.git
   cd oci-made-coaching-guide