import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser != null) {
        navigate("/profile");
      } else {
        navigate("/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return <div></div>;
}
export default Account;
