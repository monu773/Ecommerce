import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import Header from "../Layout/Header/Headers";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { useUser } from "../Context/userContext";
import { Layout, Input, Button } from "antd";
import Validation from "../Register/Validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({})

  const { saveUser } = useUser();

  const navigate = useNavigate();

  const handleLogin = async () => {
    
    setError(Validation(password));
    setError(Validation(email));
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    saveUser(result);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <>
      <Header />
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <div className="login">
          <div className="form">
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              LOGIN
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "200px",
                justifyContent: "space-between",
              }}
            >
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                }}
              />
                    {errors.email && <p style={{color: "red", fontsize: "13px"}}>{errors.email}</p>}

              <Input.Password
                // type={"password"}
                className="inputBox"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                  marginTop: 0,
                }}
              />
                    {errors.password && <p style={{color: "red", fontsize: "13px"}}>{errors.password}</p>}

              <Button
                type="primary"
                className="appButton"
                onClick={() => handleLogin()}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  width: "100%",
                  marginTop: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
