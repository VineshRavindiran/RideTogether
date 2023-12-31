import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import UserContext from "./context/user";
import Profile from "./pages/profile";
import ProfileSetup from "./pages/ProfileSetup";
import Registration from "./pages/Registration";
import Settings from "./pages/Settings";
import AddPost from "./pages/AddPost";
import PostPage from "./pages/PostPage";
import Homepage from "./pages/Homepage";
import TripsRegistered from "./pages/TripsRegistered";

function App() {
  const fetchData = useFetch();
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken"));
  const initUserId = JSON.parse(localStorage.getItem("userId"));

  // states

  const [accessToken, setAccessToken] = useState(initAccessToken);
  const [userId, setUserId] = useState(initUserId);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);

  //endpoints
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/auth/getUser/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // If your backend requires the token for authentication:
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to get user info:", await response.text());
        return;
      }

      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);
    } catch (error) {
      console.error("An error occurred while fetching user info:", error);
    }
  };

  //when user logs in, userId is updated and app gets user info
  useEffect(() => {
    getUserInfo();
  }, [userId]);
  return (
    <div className="margin-padding-0">
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          userInfo,
          setUserInfo,
          userId,
          setUserId,
          getUserInfo,
        }}
      >
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route
            path="/registration"
            element={<Registration setUserInfo={setUserInfo} />}
          ></Route>
          <Route
            path="/profile-setup"
            element={
              <ProfileSetup
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                getUserInfo={getUserInfo}
              />
            }
          ></Route>
          <Route path="/addpost" element={<AddPost />}></Route>
          <Route path="/myposts" element={<PostPage />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          {/* <Route path="/profile" element={<Profile />}></Route> */}
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="registeredtrips" element={<TripsRegistered />}></Route>
          <Route
            path="/settings"
            element={<Settings open={open} setOpen={setOpen} />}
          ></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
export default App;
