
## Prerequisites

- npm
- [Backend setup](https://github.com/vynious/custory-backend)

## Getting Started

1. Ensure that the backend server and redis are set up and running.
2.  Copy the `template.env` file to `.env`, which will be used to configure the application.
     ```
     cp template.env .env
     ```
3. Run the following commands
   ```
   npm install 
   npm run dev
   ```

## Tech stack

Some libraries we are already using in this project:

- Vite: framework
- Tailwind CSS: styling
- polotno: external custom editor platform
- Formik: forms
- react-select: some select boxes esp. with autocomplete
- axios: HTTP client
- Zustand: data fetching

