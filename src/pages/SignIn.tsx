import { useState } from "react";
import "../firebase";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

interface formData {
  email: string;
  password: string;
}

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<formData>>({});

  //update input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //validate inputs
  const validate = () => {
    const newErrors: Partial<formData> = {};

    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent form reloads page when submiting
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Set session persistence
      try {
        await setPersistence(auth, browserSessionPersistence);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;
        alert("Welcome back, " + user.displayName + "!");
        setFormData({ email: "", password: "" });
        setErrors({});
        navigate("/");
      } catch {
        alert("Incorrect email or password.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-wrap">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
        {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
