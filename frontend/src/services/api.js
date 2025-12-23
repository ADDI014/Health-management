
import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api"
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default api;















// ## 1️⃣ Importing Axios

// ```js
// import axios from "axios";
// ```

// ### What this does

// * `import` → ES6 module syntax to bring code from another file/library
// * `axios` → a popular **HTTP client library** for making API requests
// * `"axios"` → the npm package name

// ### Why we do this

// * Browsers can’t directly make complex HTTP requests easily
// * Axios simplifies:

//   * GET / POST / PUT / DELETE requests
//   * Headers
//   * Authentication
//   * Interceptors
//   * Error handling

// Without Axios, you’d need verbose `fetch()` logic everywhere.

// ---

// ## 2️⃣ Creating an Axios instance

// ```js
// const api = axios.create({
//   baseURL: "http://localhost:5000/api"
// });
// ```

// ### Keyword breakdown

// * `const`

//   * Declares a constant variable
//   * The reference to `api` cannot be reassigned

// * `axios.create()`

//   * Creates a **custom Axios instance**
//   * This instance has its own configuration

// * `{ baseURL: "http://localhost:5000/api" }`

//   * An object containing default configuration options

// ### What `baseURL` means

// * Every request made using `api` will automatically start with:

//   ```
//   http://localhost:5000/api
//   ```

// ### Example

// ```js
// api.get("/users");
// ```

// Axios actually calls:

// ```
// http://localhost:5000/api/users
// ```

// ### Why we do this

// ✅ Avoid repeating the backend URL everywhere
// ✅ Centralize API configuration
// ✅ Easy to change environments (dev, prod)

// ---

// ## 3️⃣ Adding a request interceptor

// ```js
// api.interceptors.request.use((config) => {
// ```

// ### Keyword breakdown

// * `api.interceptors`

//   * Axios feature that lets you **intercept requests or responses**

// * `.request.use()`

//   * Runs **before every outgoing HTTP request**

// * `(config)`

//   * The Axios **request configuration object**
//   * Contains:

//     * `url`
//     * `method`
//     * `headers`
//     * `data`
//     * etc.

// ### Why interceptors are powerful

// They let you:

// * Automatically attach authentication tokens
// * Log requests
// * Modify headers
// * Cancel requests

// Without interceptors, you’d manually add headers to **every request**.

// ---

// ## 4️⃣ Getting the token from localStorage

// ```js
//   const token = localStorage.getItem("token");
// ```

// ### Keyword breakdown

// * `localStorage`

//   * Browser storage that persists data even after refresh
//   * Stores key–value pairs as strings

// * `.getItem("token")`

//   * Retrieves the value stored under the key `"token"`

// ### What the token is

// * Usually a **JWT (JSON Web Token)**
// * Issued by the backend after login
// * Used to prove the user is authenticated

// ### Why we do this

// * Authentication should persist across page refreshes
// * localStorage survives reloads and tab closures

// ---

// ## 5️⃣ Conditionally attaching the Authorization header

// ```js
//   if (token) config.headers.Authorization = `Bearer ${token}`;
// ```

// ### Keyword breakdown

// * `if (token)`

//   * Checks if a token exists
//   * Prevents sending invalid or empty headers

// * `config.headers`

//   * Object holding all HTTP headers for this request

// * `Authorization`

//   * Standard HTTP header for authentication

// * `` `Bearer ${token}` ``

//   * Template literal (ES6)
//   * Inserts the token dynamically
//   * `Bearer` is a standard authentication scheme

// ### What the final header looks like

// ```
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// ```

// ### Why we do this

// ✅ Backend middleware expects this header
// ✅ Secures protected routes
// ✅ Automatic auth for **every request**

// ---

// ## 6️⃣ Returning the modified config

// ```js
//   return config;
// });
// ```

// ### Why this is required

// * Axios **must receive the config back**
// * If you don’t return it:

//   * The request will never be sent
//   * Axios throws an error

// ### Mental model

// > “Modify request → return it → Axios sends it”

// ---

// ## 7️⃣ Exporting the configured Axios instance

// ```js
// export default api;
// ```

// ### Keyword breakdown

// * `export default`

//   * Makes this the **default export** of the file

// * `api`

//   * Your customized Axios instance

// ### How it’s used elsewhere

// ```js
// import api from "./api";

// api.get("/profile");
// api.post("/login", data);
// ```

// ### Why this is best practice

// ✅ One source of truth for API logic
// ✅ Cleaner imports
// ✅ Easy maintenance

// ---

// ## 🧠 Big Picture: Why this pattern exists

// This file acts as:

// > **A centralized, authenticated API gateway**

// ### What problems it solves

// | Problem              | Solution           |
// | -------------------- | ------------------ |
// | Repeated base URLs   | `baseURL`          |
// | Manual token passing | Interceptor        |
// | Auth consistency     | Automatic headers  |
// | Scalability          | Single config file |

// ---

// ## 🏁 Final Summary

// * You created a **custom Axios instance**
// * You set a **base backend URL**
// * You used an **interceptor** to:

//   * Read the auth token
//   * Attach it automatically
// * You exported it for reuse everywhere

// This is **professional-grade frontend architecture** used in real-world React/Vue/Next apps.

// ---
