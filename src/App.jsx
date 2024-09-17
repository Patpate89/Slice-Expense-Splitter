import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import ErrorPage from "./pages/Error.jsx";
import Profile from "./pages/Profile.jsx";
import Groups from "./pages/Groups.jsx";
import Friends from "./pages/Friends.jsx";
import Home from "./pages/Home.jsx";
import { createContext, useState } from "react";
export const AppContext = createContext([]);

function App() {
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("formData")) || []
  );
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friendsData")) || []
  );

  function addNewGroup(newGroup) {
    setGroups([...groups, newGroup]);
  }

  // function editGroup(groupIdToEdit) {}

  // function deleteGroup(groupIdToDelete) {
  //   setGroups((prevGroups) =>
  //     prevGroups.filter((group) => group !== groupIdToDelete)
  //   );
  // }

  function addFriendToList(newFriend) {
    console.log(newFriend);
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  }

  // function deleteFriendFromList(friendToDeleteId) {
  //   setFriends((prevFriends) =>
  //     prevFriends.filter((friend) => friend.id !== friendToDeleteId)
  //   );
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "group/:groupId",
          element: <Groups />,
        },
        {
          path: "friend/:friendId",
          element: <Friends />,
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{ groups, addNewGroup, friends, addFriendToList }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
