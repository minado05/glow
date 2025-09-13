import NavBar from "../components/NavBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup listener
  }, [user]);

  if (user) {
    navigate("/profile");
  }

  const [isSignInVisible, setSignInVisible] = useState(true);
  const [isSignUpVisible, setSignUpVisible] = useState(false);

  const toggleForm = () => {
    setSignInVisible(!isSignInVisible);
    setSignUpVisible(!isSignUpVisible);
  };

  return (
    <div>
      <NavBar />
      <div id="content-wrap">
        <div className="form-container">
          {isSignInVisible ? <SignIn /> : <SignUp />}
          {isSignInVisible ? (
            <p>
              Not registered yet?{" "}
              <button className="form-button" onClick={toggleForm}>
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already a member?{" "}
              <button className="form-button" onClick={toggleForm}>
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Account;
