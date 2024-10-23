import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../App";

const LogOutUser = () => {
  const navigate = useNavigate();
  const {setUserDetails }  = useContext(UserDetailsContext);

  console.log("at logout position");

  const handleLogout = async () => {
    // Notify the backend to invalidate the session if needed
    try {
      const response = await fetch("http://localhost:3000/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Optionally pass the sessionId for backend session invalidation
        body: JSON.stringify({ sessionId: localStorage.getItem("sessionId") }),
      });
     
      if(response.status === 200){
            // Clear the session and user data from localStorage
        localStorage.removeItem("sessionId");
        localStorage.removeItem("user");
        setUserDetails(null);
        console.log("user at lobout",setUserDetails);
        // Redirect to the login page or home page
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }

  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        type="submit"
        id="logOutButton"
        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        onClick={() => handleLogout()}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m-7 8h.01"
          ></path>
        </svg>
        Logout
      </button>
</div>

  );
};

export default LogOutUser;