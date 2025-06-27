// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Simple login simulation
//   const login = (email, password) => {
//     // yaha aap apni backend API call kar sakte hain login ke liye
//     // filhal hum dummy user set kar dete hain
//     setUser({ email }); 
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
