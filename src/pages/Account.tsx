import NavBar from "../components/NavBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Account() {
  const navigate = useNavigate();
  const [isSignInVisible, setSignInVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser != null) {
        navigate("/profile");
      } else {
        setSignInVisible(true);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const toggleForm = () => {
    setSignInVisible(!isSignInVisible);
    setSignUpVisible(!isSignUpVisible);
  };

  return (
    <div>
      <NavBar />
      <div id="content-wrap">
        <div className="form-container">
          {isSignInVisible && <SignIn />}
          {isSignUpVisible && <SignUp />}
          {isSignInVisible && (
            <p>
              Not registered yet?{" "}
              <button className="form-button" onClick={toggleForm}>
                Sign Up
              </button>
            </p>
          )}
          {isSignUpVisible && (
            <p>
              Already a member?
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
