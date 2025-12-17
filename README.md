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
