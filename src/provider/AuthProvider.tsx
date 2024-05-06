import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
// import { usePlaylist } from "./PlaylistProvider";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: string;
  username: string;
}

interface AuthContextType {
  accessToken: string | null;
  setUserAccessToken: (token: string | null) => void;
  currentUser: User | null;
  getCurrentUser: () => Promise<User | null>;
  register: (email: string, password: string) => Promise<{ message: string } | null> | null;
  login: (username: string, password: string) => Promise<{ message: string } | null> | null;
  logout: () => void;
  updatePassword: (username: string, email: string, new_password: string) => Promise<{ message: string } | null> | null;
  forgotPassword: (email: string) => Promise<{ message: string } | null> | null;
  resetPassword: (token: string, new_password: string) => Promise<{ message: string } | null> | null;
}

const authContextState = {
  accessToken: null,
  setUserAccessToken: () => {},
  currentUser: null,
  getCurrentUser: async () => null,
  register: () => null,
  login: () => null,
  logout: () => {},
  updatePassword: () => null,
  forgotPassword: () => null,
  resetPassword: () => null,
};

const AuthProviderContext = createContext<AuthContextType>(authContextState);

const AuthProvider = ({ children }: AuthProviderProps) => {

  const API_URL = process.env.BACKEND_API;

  // const {updateNowPlaying, updatePendingPlaylist} = usePlaylist()


  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token") == null
      ? ""
      : localStorage.getItem("access_token")
  );

  const [currentUser, setUserProfile] = useState<User | null>(null);

  const setUserAccessToken = (token: string | null) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  };

  const getCurrentUser = useCallback(async () => {
    const API_URL = process.env.BACKEND_API;

    const fetchUserProfileData = async () => {
      const GET_USER_PROFILE = `${API_URL}users/me`;
      try {
        const response = await fetch(GET_USER_PROFILE, {
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
        });
        const statusCode = response.status;
        const data = await response.json();
        if (statusCode == 200) {
          setUserProfile(data);
          return data;
        }
        if (statusCode == 401 && data.detail == "Unauthorized") {
          setUserAccessToken(null);
          setUserProfile(null);
          return null;
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (accessToken) {
      return await fetchUserProfileData();
    } else {
      setUserProfile(null);
      return null;
    }
  }, [accessToken]);

  const register = async (email: string, password: string) => {
    const requestBody = {
      username: email,
      email: email,
      password: password
    }

    const res = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const statusCode = await res.status
    const data = await res.json();


    if (statusCode == 201) {
      return { message: "success"}
    }

    if (data?.detail === "REGISTER_USER_ALREADY_EXISTS") {
      return { message: data?.detail };
    }

    return { message: "fail" };
  };

  const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    //   const res = fetch(`http://localhost:8000/api/v1/auth/login`, {
    //     method: "POST",
    //     body: formData,
    //   });
    //   res.then(data => data.json())
    // //   .then(data => console.log(data))
    //   .then(data => {
    //     console.log(data)
    //     if (data.access_token) {
    //         // console.log(data.access_token)
    //         setUserAccessToken(data.access_token)
    //         navigate("/")
    //     }

    //     if (data?.detail === 'LOGIN_BAD_CREDENTIALS') {
    //         setIsLoginFailed(true)
    //     }

    //   })

    

    const res = await fetch(`${API_URL}auth/login`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.access_token) {
      // console.log(data.access_token)
      setUserAccessToken(data.access_token);
      return { message: "success"}
      // navigate("/");
    }

    if (data?.detail === "LOGIN_BAD_CREDENTIALS" || data?.detail === "LOGIN_USER_NOT_VERIFIED") {
      return { message: data?.detail };
    }

    return { message: "fail" };
  };

  const logout = async () => {

    const userLogout = async () => {
      const LOGOUT = `${API_URL}auth/logout`;
      try {
        const response = await fetch(LOGOUT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
        });
        const statusCode = response.status;
        setUserAccessToken(null);
        setUserProfile(null);
        if (statusCode == 401) {
          console.log(statusCode);
        }
      } catch (e) {
        console.error(e);
      }
    };
    

    // if (accessToken) {
    //   return await userLogout();
    // } else {
    //   setUserProfile(null);
    //   return null;
    // }

    await userLogout()

    // updateNowPlaying(null)
    // updatePendingPlaylist([])

    // localStorage.removeItem("nowPlaying");
    // localStorage.removeItem("pendingPlaylist");
  };

  const updatePassword = async (username: string, email: string, new_password: string) => {

    const updateUserPassword = async () => {
      const UPDATE_USER_PASSWORD_API = `${API_URL}users/me`;
      try {
        const response = await fetch(UPDATE_USER_PASSWORD_API, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
          body: JSON.stringify({ username: username, email: email, password: new_password})
        });
        const statusCode = response.status;
        
        if (statusCode == 400) {
          const data = await response.json()
          if (data.detail?.code == "UPDATE_USER_INVALID_PASSWORD") {
            return {message: data.detail?.reason}
          }
        }

        if (statusCode == 200) {
        return {message: "success"}
        } else {return {message: "failed"}}
      } catch (e) {
        console.error(e);
        return {message: "failed"};
      }
    };

    if (accessToken) {
      return await updateUserPassword();
    } else {
      return {message: "failed"};
    }
  };


  const forgotPassword = async (email: string) => {

    const forgotUserPassword = async () => {
      const RESET_USER_PASSWORD_API = `${API_URL}auth/forgot-password`;
      try {
        const response = await fetch(RESET_USER_PASSWORD_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email})
        });
        const statusCode = response.status;
        

        if (statusCode == 202) {
        return {message: "success"}
        } else {return {message: "failed"}}
      } catch (e) {
        console.error(e);
        return {message: "failed"};
      }
    };

      return await forgotUserPassword();
  };

  const resetPassword = async (token: string, new_password: string) => {

    const resetUserPassword = async () => {
      const RESET_USER_PASSWORD_API = `${API_URL}auth/reset-password`;
      try {
        const response = await fetch(RESET_USER_PASSWORD_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, password: new_password})
        });
        const statusCode = response.status;
        
        if (statusCode == 400) {
          const data = await response.json()
          if (data.detail?.code == "RESET_PASSWORD_INVALID_PASSWORD") {
            return {message: data.detail?.reason}
          }
        }

        if (statusCode == 200) {
        return {message: "success"}
        } else {return {message: "failed"}}
      } catch (e) {
        console.error(e);
        return {message: "failed"};
      }
    };

      return await resetUserPassword();
  };

  // useEffect(() => {

  //   const fetchUserProfileData = async () => {
  //     const GET_USER_PROFILE = `${API_URL}users/me`;
  //     try {
  //       const response = await fetch(GET_USER_PROFILE, {
  //         keepalive: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `bearer ${accessToken}`,
  //         },
  //       });
  //       const statusCode = response.status;
  //       const data = await response.json();
  //       if (statusCode == 200) {
  //         setUserProfile(data);
  //       }
  //       if (statusCode == 401 && data.detail == "Unauthorized") {
  //         setUserAccessToken(null);
  //         setUserProfile(null);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   if (accessToken) {
  //     fetchUserProfileData();
  //   } else {
  //     setUserProfile(null);
  //   }
  // }, []);

  return (
    <AuthProviderContext.Provider
      value={{
        accessToken,
        setUserAccessToken,
        currentUser,
        getCurrentUser,
        register,
        login,
        logout,
        updatePassword,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};

export default AuthProvider;
