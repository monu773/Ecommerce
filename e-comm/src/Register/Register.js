import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Header from "../Layout/Header/Headers";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { Layout, Input, Button, Spin, Image } from "antd";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useUser } from "../Context/userContext";
import Validation from "./Validation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageProgress, setImageProgress] = useState("");
  const { saveUser } = useUser();
  const [errors, setError] = useState({})

  const inputFile = useRef(null);

  const openFiles = () => {
    if (inputFile) {
      //@ts-ignore
      inputFile.current.value = null;
      //@ts-ignore
      inputFile.current.click();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const removeImage = () => {
    setStore("");
    setFile(null);
  };

  const desc = useRef();
  const [file, setFile] = useState(null);
  const [store, setStore] = useState("");

  const uploadFile = (content) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + content.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, content);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImageProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setStore(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    file && uploadFile(file);
  }, [file]);

  const handleRegister = async () => {
    setError(validation(name));
    setError(validation(password));
    setError(validation(email));


   try {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, store, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      saveUser(result);
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
   } catch (error) {
    Validation(error);
   }
  };

  console.log(store);
  return (
    <>
      <Header />
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <div className="register" style={{
          backgroundImage: "/assets/back.jpg"
        }}>
          <div className="form">
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              REGISTER
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                minHeight: "300px",
                justifyContent: "space-between",
              }}
            >
              <div>
                {file ? (
                  <div
                    display={"flex"}
                    alignItems={"center"}
                    marginTop={"20px"}
                  >
                    {/* {isZipFile(fileDocument) ? (
                      <AiOutlineFileZip size={"40px"} />
                    ) : (
                      <AiOutlineFileMarkdown size={"40px"} />
                    )} */}

                    {imageProgress === 100 && (
                      <div>
                        <Image
                          src={store}
                          style={{
                            borderRadius: "100px",
                            width: "70px",
                            height: "70px",
                          }}
                        />
                        <Button
                          size="small"
                          style={{
                            position: "absolute",
                            color: "red",
                            borderRadius: "100px",
                            background: "#FFFFFF",
                            marginTop: "42px",
                            marginLeft: "-20px",
                          }}
                          icon={<DeleteOutlined />}
                          onClick={removeImage}
                        ></Button>
                      </div>
                    )}
                    {imageProgress !== 100 && (
                      <Spin tip="Loading" size="small">
                        <div
                          className="content"
                          style={{ marginRight: "60px" }}
                        />
                      </Spin>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Image src="/assets/user_profile.png" preview={false} width={64} height={64}/>
                    <Button
                    size="small"
                      icon={<UploadOutlined />}
                      style={{
                        // alignItems: "right",
                        position: "absolute",
                        background: "#59CF59",
                        color: "#FFFFFF",
                        marginTop: "45px",
                        borderRadius: "100px",
                        // width: "64px",
                        // height: "64px"
                      }}
                      onClick={openFiles}
                      disabled={file}
                    >
                    </Button>
                    <h1 marginTop={"8px"} fontSize={"12px"}>
                      Images Supported:{" "}
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>
                        .zip, .md, .mdx
                      </span>
                    </h1>
                  </div>
                )}

                <input
                  ref={inputFile}
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept="image/*"
                  progress={imageProgress}
                  onChange={(e) => setFile(e?.target?.files[0])}
                />
              </div>
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                style={{
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                }}
              />
                    {errors.name && <p style={{color: "red", fontsize: "13px"}}>{errors.name}</p>}

              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                  marginTop: 0,
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
                onClick={() => handleRegister()}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  width: "100%",
                  marginTop: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
