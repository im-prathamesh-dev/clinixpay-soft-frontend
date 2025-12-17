# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




## Authentication

This project includes a complete authentication flow with **Store Registration** and **Login** pages built with React and Tailwind CSS.

### Registration Page (Store Registration)

**Component**: `src/components/RegisterForm.jsx`  
**Route**: `/register` (depends on your `react-router-dom` setup)

The **Store Registration** page allows a new store to create an account on ClinixPay.

- **Collected fields**
  - **First Name** *(required)*
  - **Middle Name** *(optional)*
  - **Last Name** *(required)*
  - **Email** *(required, must be a valid email)*
  - **Contact Number** *(required, 10-digit mobile)*
  - **Location** *(required)*
  - **Store Name** *(required)*
  - **GST Number** *(required, stored in uppercase)*
  - **Password** *(required, minimum 6 characters)*
  - **Confirm Password** *(required, must match Password)*
  - **Store License No** *(required)*
  - **ClinixPay License Key** *(required)*
  - **Terms & Conditions / Privacy Policy** checkbox *(must be checked to submit)*

- **Form behavior & validation**
  - Uses React `useState` to manage a nested `formData` object with `fullName` and other flat fields.
  - Password is validated to be **at least 6 characters**; otherwise, an alert is shown and the form is not submitted.
  - Password and Confirm Password must **match**; otherwise, an alert is shown and the form is not submitted.
  - The **Submit** button shows a loading state (`Registering...`) while the registration request is in progress.
  - On submit, the final form data is currently logged to the console (`console.log("Final Data:", formData)`) with a placeholder for the **actual API call**.

- **Password visibility**
  - Both **Password** and **Confirm Password** fields support **show/hide** behavior.
  - Uses `lucide-react` icons (`Eye`, `EyeOff`) to toggle between masked and plain text passwords.

- **Navigation**
  - A link is provided to the **Login** page:
    - Text: `Already have an account? Login`
    - Route: `/login` (configured via `react-router-dom`)

- **UI/UX**
  - Modern, responsive layout with three columns on larger screens:
    - Personal info
    - Contact & store details
    - Security & license
  - Tailwind CSS classes are used for consistent styling, dark mode support, and accessible focus states.

### Login Page

**Component**: `src/components/LoginForm.jsx` (or similar, depending on your file)  
**Route**: `/login`

The **Login** page is used by existing store accounts to access ClinixPay.

- **Typical fields**
  - **Email** *(required, must be a valid email)*
  - **Password** *(required)*

- **Expected behavior**
  - Validates that both email and password are provided.
  - On submit, sends the credentials to the backend **login API** (e.g. `POST /auth/login`) and handles:
    - Success: stores authentication token / session (e.g. in localStorage or cookies) and redirects the user to the main dashboard.
    - Failure: shows an appropriate error message (e.g. “Invalid email or password”).

- **Navigation**
  - Provides a link back to the **Registration** page for new users who don’t have an account yet (e.g. “Don’t have an account? Register” linking to `/register`).

> **Note:** The actual API endpoints and token storage strategy are not hard-coded in this component yet and should be wired to your backend as needed.