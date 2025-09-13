import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Profile() {
  const navigate = useNavigate();
  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        alert("Signed out successful!");
        navigate("/account");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <NavBar />
      <div className="logout-wrap">
        <h5>User already signed in. Please check out other pages!</h5>
        <button onClick={Logout}>Sign out</button>
      </div>
    </div>
  );
}

export default Profile;
