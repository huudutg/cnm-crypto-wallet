import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    privateKey: "",
    publicKey: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id") || "";
    const avatar = localStorage.getItem("avatar") || "";
    setUser({ id, avatar });
    console.log("%c user.id", "color: blue;", user.id);
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
  } catch (e) {
    console.log("%c e", "color: blue;", e);
  }
};
