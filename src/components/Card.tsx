import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";
interface ILoginData {
  email: string;
  password: string;
}

function Card() {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const isValidEmail = useMemo(() => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(loginData.email);
  }, [loginData.email]);

  const handleLogin = useCallback(async () => {
    setError(null);
    if (!isValidEmail) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      // API https://www.sample.app/login is not working. So I'm using my own API here https://api-untukmu.septianfauzi.com/api/login
      const response = await axios.post(
        "https://api-untukmu.septianfauzi.com/api/login",
        loginData
      );
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Failed to login. Please try again.");
      setSuccess(false);
    }
  }, [loginData, isValidEmail]);

  return (
    <>
      <div className="w-[400px] rounded-xl shadow-xl p-8 bg-white">
        {success ? (
          <div className="text-center">
            <p className="text-2xl">Login Successful!</p>
            <p className="text-sm">You have successfully logged in.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
              ipsum harum excepturi. Esse animi voluptatum amet labore excepturi
              ad, facilis tenetur quia repellat asperiores quae! Minima sapiente
              suscipit quaerat repellendus. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Nihil assumenda nostrum, temporibus
              voluptatum, ipsa voluptatibus natus consequuntur, numquam aliquam
              dolor et. Provident, libero at. Consequuntur, autem. Inventore in
              temporibus ut! Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Cum in sequi ad rem omnis nemo eveniet ullam quaerat, eius
              totam distinctio, error nisi qui? Id, natus! Nulla amet ex
              distinctio?
              <p className="text-2xl">Welcome Back!</p>
              <p className="text-sm">Please enter your login details</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                onChange={handleInputChange}
                className="p-2 rounded-md border-2  focus-visible:outline-yellow-400"
                type="text"
                required
              />
              <small className="text-red-500">{error}</small>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                onChange={handleInputChange}
                className="p-2 rounded-md border-2  focus-visible:outline-yellow-400"
                type="password"
                required
              />
            </div>
            <SubmitButton name="Login" onClick={handleLogin} />
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
