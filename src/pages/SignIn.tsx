import { useState } from "react";

interface formData {
  email: string;
  password: string;
}

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent form reloads page when submiting
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ email: "", password: "" });
      setErrors({});
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
        />
        {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <button type="submit">Sign In</button>
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

export default SignIn;
