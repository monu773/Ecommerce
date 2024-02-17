import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header/Headers";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Layout, Input, Button, Spin, Image } from "antd";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useUser } from "../Context/userContext";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [imageProgress, setImageProgress] = useState("");
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [store, setStore] = useState("");
  const { TextArea } = Input;

  const { user } = useUser();

  const userId = user?.user?._id;
  const token = user?.auth;

  // let navigate = useNavigate();

  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [user, navigate]);

  const inputFile = useRef(null);

  const openFiles = () => {
    if (inputFile) {
      //@ts-ignore
      inputFile.current.value = null;
      //@ts-ignore
      inputFile.current.click();
    }
  };

  const removeImage = () => {
    setStore("");
    setFile(null);
  };

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

  const handleAddProduct = async () => {
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        name,
        store,
        price,
        detail,
        category,
        userId,
        company,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
    });
    result = await result.json();
    console.log(result);
    // if (result) {
    //   localStorage.setItem("user", JSON.stringify(result));
    //   navigate("/");
    // } else {
    //   alert("Please enter correct details");
    // }
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    setDetail("");
    setStore("");
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
        <div className="register">
          <div className="form">
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Add Product
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
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        // alignItems: "right",
                        background: "#59CF59",
                        color: "#FFFFFF",
                        marginTop: "20px",
                        borderRadius: "6px",
                      }}
                      onClick={openFiles}
                    >
                      {"Upload Image"}
                    </Button>
                    <h1 marginTop={"8px"} fontSize={"12px"}>
                      Images Supported:{" "}
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>
                        .jpeg, .png
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
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                  marginTop: 0,
                }}
              />
              <TextArea
                type={"text"}
                className="inputBox"
                placeholder="enter detail"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                  marginTop: 0,
                }}
              />
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                  marginTop: 0,
                }}
              />
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter company"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "100%",
                  height: "40px",
                  marginTop: 0,
                }}
              />
              <Button
                className="appButton"
                onClick={() => handleAddProduct()}
                type="primary"
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  width: "100%",
                  marginTop: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddProduct;
