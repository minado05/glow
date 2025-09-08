import { useState } from "react";

interface formData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submittedData, setSubmittedData] = useState<formData | null>(null);
  const [errors, setErrors] = useState<Partial<formData>>({});

  //update input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //validate inputs
  const validate = () => {
    const newErrors: Partial<formData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (formData.password != formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent form reloads page when submiting
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-wrap">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <br />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}
        <br />
        <label>Set Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <br />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SignUp;
