import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../socket/index.js";
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    console.log('%c socket', 'color: blue;', socket)
    // socket.open();
    const name = localStorage.getItem("name") || "";
    const privateKey = localStorage.getItem("privateKey") || "";
    const publicKey = localStorage.getItem("publicKey") || "";
    setUser({ name, privateKey, publicKey });

  }, []);

  const login = async (wallet) => {
    try {

      localStorage.setItem("name", wallet.name);
      localStorage.setItem("privateKey", wallet.privateKey);
      localStorage.setItem("publicKey", wallet.publicKey);
      setUser(wallet);

      return 1
    } catch (error) {
      console.log("error2221", error);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const ProtectRoute = ({ children }:any) => {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();
//   if (loading) {
//     return (
//       <div className="loading">
//         <CircularProgress style={{ width: "10%" }} color="secondary" />
//       </div>
//     );
//   }
//   if (!isAuthenticated) return <Redirect to="/login" />;
//   //if (isAuthenticated) return <Redirect to={router.asPath} />;
//   return children;
// };

export const useAuth = () => useContext(AuthContext);

const logout = async () => {
  try {
    // await AXIOS.post(
    //   (window as any).env.IDENTITY_API_URL + "/v1/rpc/auth/logout"
    // );
    localStorage.removeItem("name");
    localStorage.removeItem("privateKey");
    localStorage.removeItem("publicKey");
    return 1
  } catch (e) {
    console.log("%c e", "color: blue;", e);
    return e
  }
};
