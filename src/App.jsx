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
    JSON.parse(localStorage.getItem("groupsData")) || []
  );
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friendsData")) || []
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expensesData")) || []
  );

  const [memberData, setMemberData] = useState({ name: "", share: "", id: "" });

  // function addNewGroup(newGroup) {
  //   setGroups([...groups, newGroup]);
  // }

  // function editGroup(groupIdToEdit) {}

  // function deleteGroup(groupIdToDelete) {
  //   setGroups((prevGroups) =>
  //     prevGroups.filter((group) => group !== groupIdToDelete)
  //   );
  // }

  function addFriendToList(newFriend) {
    console.log("addNewFriend-app", newFriend);
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem("friendsData", JSON.stringify(updatedFriends));
  }

  function addGroupToList(newGroup) {
    console.log("addNewGroup-app", newGroup);
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  }

  function addExpenseToList(newExpense) {
    console.log("addNewExpense-app", newExpense);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  }

  function deleteGroup(groupId) {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter((group) => group.id !== groupId);
      localStorage.setItem("groupsData", JSON.stringify(updatedGroups)); // Update local storage
      return updatedGroups;
    });
  }

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
      value={{
        groups,
        setGroups,
        addGroupToList,
        deleteGroup,
        friends,
        addFriendToList,
        memberData,
        setMemberData,
        expenses,
        addExpenseToList,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
