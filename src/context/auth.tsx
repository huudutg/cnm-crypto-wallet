import React, { createContext, useContext, useEffect, useState } from "react";

import { AXIOS, doAxiosRequestIntercept } from "src/services/api/config";
import { logout } from "src/services/api/identity";
import { User } from "src/services/api/users";

const AuthContext: any = createContext({});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>({
    id: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  doAxiosRequestIntercept();

  useEffect(() => {
    const id = localStorage.getItem("id") || "";
    const avatar = localStorage.getItem("avatar") || "";
    setUser({ id, avatar });
    console.log("%c user.id", "color: blue;", user.id);
  }, []);

  const login = async ({ code }: { code: string; redirect_uri: string }) => {
    try {
      const res: any = await AXIOS.post("/v1/rpc/auth/login", {
        code: code,
        redirect_uri: "/requests",
      });
      // console.log("res", res);, res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("avatar", res.data.avatar);
      localStorage.setItem("id", res.data.name);
      const user = res.data;
      setUser({ id: user.name, avatar: user.avatar });
      return user;
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

export const useAuth: any = () => useContext(AuthContext);
