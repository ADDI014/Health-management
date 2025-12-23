

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        const u = localStorage.getItem("user");
        if(u) setUser(JSON.parse(u));
    },[]);

    const login = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
    }
    
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user,login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}



































// # 🔹 1. Importing React tools

// ```js
// import { createContext, useEffect, useState } from "react";
// ```

// ### Keyword breakdown

// * `import { ... } from "react"`

//   * Named imports from the React library

// * `createContext`

//   * Creates a **React Context**
//   * Used to share data **globally** without prop drilling

// * `useState`

//   * React Hook for component state

// * `useEffect`

//   * React Hook for **side effects**
//   * Runs code when component mounts, updates, or unmounts

// ### Why this matters

// Auth state must be:

// * Global
// * Persistent
// * Reactive

// Context + Hooks is the correct toolset.

// ---

// # 🔹 2. Creating the Auth Context

// ```js
// export const AuthContext = createContext();
// ```

// ### What this does

// * Creates a **global container** for authentication data
// * Initially has **no value**
// * Will later provide:

//   * `user`
//   * `login`
//   * `logout`

// ### Why Context is needed

// Without Context:

// * You’d pass `user` and `login` through props everywhere
// * This becomes **prop drilling hell**

// Context solves:

// > “I need auth data everywhere”

// ---

// # 🔹 3. Creating the AuthProvider component

// ```js
// export const AuthProvider = ({ children }) => {
// ```

// ### Keyword breakdown

// * `AuthProvider`

//   * A **wrapper component**
//   * Provides auth data to everything inside it

// * `({ children })`

//   * `children` = everything wrapped inside `<AuthProvider>`

// Example:

// ```jsx
// <AuthProvider>
//   <App />
// </AuthProvider>
// ```

// ### Why this pattern exists

// React Context only works when:

// * Components are wrapped by the Provider

// ---

// # 🔹 4. Creating authentication state

// ```js
//   const [user, setUser] = useState(null);
// ```

// ### What this means

// * `user`

//   * Holds the currently logged-in user object
//   * `null` means **not logged in**

// * `setUser`

//   * Updates the user state

// ### Why store user separately from token

// * Token = authentication proof
// * User = application data (name, email, role, etc.)

// Frontend logic needs **user**, not the token.

// ---

// # 🔹 5. Restoring user on page refresh

// ```js
//   useEffect(() => {
//     const u = localStorage.getItem("user");
//     if (u) setUser(JSON.parse(u));
//   }, []);
// ```

// ### Deep breakdown

// #### `useEffect(() => { ... }, [])`

// * Runs **once** when the component mounts
// * `[]` = dependency array = “run only on first render”

// #### `localStorage.getItem("user")`

// * Reads persisted user data
// * Survives page reloads

// #### `JSON.parse(u)`

// * Converts stored string → JavaScript object

// ### Why this is critical

// Without this:

// * Refresh page → user becomes `null`
// * App thinks user is logged out

// This effect:

// > “Rehydrates auth state from storage”

// ---

// # 🔹 6. The `login` function

// ```js
//   const login = (user, token) => {
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//     setUser(user);
//   };
// ```

// ### Keyword-by-keyword

// * `login(user, token)`

//   * Called after successful backend authentication

// * `localStorage.setItem("user", ...)`

//   * Saves user data persistently

// * `JSON.stringify(user)`

//   * Required because localStorage only stores strings

// * `localStorage.setItem("token", token)`

//   * Stores JWT for API authentication

// * `setUser(user)`

//   * Updates React state
//   * Triggers re-render

// ### Why BOTH storage and state are used

// | Purpose     | Tool         |
// | ----------- | ------------ |
// | Persistence | localStorage |
// | Reactivity  | React state  |

// ---

// # 🔹 7. The `logout` function

// ```js
//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };
// ```

// ### What happens here

// * `localStorage.clear()`

//   * Removes:

//     * user
//     * token
//     * any other stored auth data

// * `setUser(null)`

//   * App instantly switches to logged-out state

// ### Security reason

// If token remains:

// * API requests would still be authenticated
// * This fully invalidates the session on frontend

// ---

// # 🔹 8. Providing context values

// ```jsx
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// ```

// ### What this does

// * Makes `user`, `login`, and `logout` accessible to:

//   * Any component using `useContext(AuthContext)`

// Example:

// ```js
// const { user, logout } = useContext(AuthContext);
// ```

// ### Why `value` is an object

// Allows multiple shared values in one context.

// ---

// # 🔗 HOW THIS CONNECTS TO YOUR AXIOS CODE

// Now the important part.

// ---

// ## 🔄 Flow Perspective (End-to-End)

// ### 1. User logs in

// ```js
// login(user, token);
// ```

// This:

// * Saves token in `localStorage`
// * Saves user in `localStorage`
// * Updates React state

// ---

// ### 2. Axios interceptor runs

// From your **previous file**:

// ```js
// const token = localStorage.getItem("token");
// if (token) config.headers.Authorization = `Bearer ${token}`;
// ```

// ### Connection

// * AuthContext **stores the token**
// * Axios **reads the token**
// * Axios sends it to backend automatically

// 👉 They communicate via **localStorage**

// ---

// ## 🧠 Perspective 1: React Architecture

// | AuthContext           | Axios                 |
// | --------------------- | --------------------- |
// | Manages UI auth state | Manages HTTP requests |
// | Provides login/logout | Attaches auth headers |
// | Controls rendering    | Controls API security |

// ---

// ## 🔐 Perspective 2: Security & Auth

// | Step             | Responsibility |
// | ---------------- | -------------- |
// | Login success    | AuthContext    |
// | Token storage    | AuthContext    |
// | Token usage      | Axios          |
// | Protected routes | Backend        |

// This separation is **industry standard**.

// ---

// ## 🏗️ Perspective 3: Clean Architecture

// You have **separation of concerns**:

// * **AuthContext**

//   * Who is logged in?
//   * How to login/logout?

// * **Axios instance**

//   * How do requests work?
//   * How is auth attached?

// Neither knows about the other directly → **loose coupling**

// ---

// # 🧠 Mental Model (Important)

// Think of it like this:

// * **AuthContext** = Identity Manager
// * **Axios** = Courier
// * **Token** = Passport
// * **Backend** = Border Control

// AuthContext gives the passport
// Axios shows it at every border

// ---

// # ✅ Final Summary

// * This file manages **authentication state**
// * It persists user info across reloads
// * It exposes login/logout globally
// * It feeds the Axios interceptor indirectly
// * Together, both files create a **complete auth system**

---
