import { useState } from "react";
import NavBar from "../components/NavBar";

import "../firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const auth = getAuth();

interface formData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password.length < 6) {
      newErrors.password = "(Weak Password) Password should be at least 6 characters or longer";
    }
    if (formData.password != formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent form reloads page when submiting
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(userCredential.user, { displayName: formData.name });
        navigate("/signin");
        alert("Account created successfully!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setErrors({});
      } catch {
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="content-wrap">
        <div className="form-wrap">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter Password"
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
            <button type="submit">Create Account</button>
          </form>
        </div>
        <p>
          Already a member?
          <button className="form-button" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
