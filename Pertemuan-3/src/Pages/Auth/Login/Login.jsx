import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUser } from "@/Data/Dummy";
import Card from "@/Pages/Auth/Components/Card";
import Form from "@/Pages/Auth/Components/Form";
import Label from "@/Pages/Auth/Components/Label";
import Input from "@/Pages/Auth/Components/Input";
import Button from "@/Pages/Auth/Components/Button";
import Heading from "@/Pages/Auth/Components/Heading";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      navigate("/admin/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <Card>
      <Heading as="h2">Login</Heading>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Masukkan email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Masukkan password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              className="mr-2"
              checked={form.remember}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>

          <a href="#" className="text-sm text-blue-500 hover:underline">
            Lupa password?
          </a>
        </div>

        <Button type="submit">Sign In</Button>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </Card>
  );
};

export default Login;
