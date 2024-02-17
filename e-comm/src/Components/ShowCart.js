import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Layout,
  Menu,
  Row,
  Card,
  Tooltip,
  Image,
  Tag,
  Button,
  Spin,
  Modal, Typography, Input
} from "antd";
import Header from "../Layout/Header/Headers";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/userContext";

const { Content } = Layout;
const { subMenu } = Menu;

const contentStyle = {
  // width: '80%',
  height: "260px",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

const ShowCart = () => {
  const ref = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ address, setAddress ] = useState("");
  const [ pinCode, setPinCode ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("");

  const navigate = useNavigate();
  const { user } = useUser();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteCart = async (cartId) => {
    await axios
      .delete(`http://localhost:5000/cart/${cartId}`, {
        headers: {
          method: "delete",
          authorization: `bearer ${
            JSON.parse(localStorage.getItem("user")).auth
          }`,
        },
      })
      .then((resp) => {
        navigate("/showProduct");
      });
  };

  const getCart = async () => {
    setLoading(true);
    let result = await fetch("http://localhost:5000/cart", {
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))?.auth
        }`,
      },
    });
    result = await result.json();
    setLoading(false);
    const filterData = result?.filter((data) => {
      return data?.userId === user?.user?._id;
    });
    setData(filterData);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Header />
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <Content
          style={{
            // margin: '0 16px',
            width: "100wh",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              // minHeight: 360,
            }}
          >
            {loading ? (
              <div
                style={{
                  width:"100%",
                  display: "flex",
                  padding: "40px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Spin tip="Loading" size="large">
                  <div className="content" style={{ marginRight: "60px" }} />
                </Spin>
              </div>
            ) : (
              <div
                className="site-card-wrapper"
                style={{
                  displayL: "flex",
                  flexDirection: "column",
                }}
              >
                {data?.length > 0 ? (
                  data?.map((product, index) => (
                    <Card
                      key={product?._id}
                      hoverable
                      // title={"Card Details"}
                      bordered={false}
                      style={{
                        //   width: "344px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "12px",
                        marginTop: "20px",
                        backgroundImage: "url(/gradient-circle.png)",
                        backgroundRepeat: "no-repeat"
                      }}
                    >
                      {/* <h1>
                      Card Details
                      <Tooltip title={"Info"}>
                        <InfoCircleOutlined
                          style={{ float: "right", marginTop: "6px" }}
                        />
                      </Tooltip>
                    </h1> */}
                      <div
                        // key={product._id}
                        style={{
                          display: "flex",
                          width: "100%",
                          // height: "340px",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <img
                          width={"200px"}
                          height={"200px"}
                          alt="image0"
                          src={product?.store}
                          style={{
                            marginRight: "60px",
                            borderRadius: "20px"
                          }}
                        />
                        <div>
                          <Link to={`/productDetails/${product?.cartId}`}>
                            <h1 style={{ fontSize: "24px", fontWeight: 600 }}>
                              {product.name}
                            </h1>
                            <h2>{`Rs. ${product.price}`}</h2>
                            <div>
                              <Tag color="processing">{product.company}</Tag>
                              <Tag color="processing">{product.category}</Tag>
                            </div>
                            <p
                              style={{
                                display: "-webkit-Box",
                                overflow: "hidden",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                marginTop: "8px",
                              }}
                            >
                              {product.detail}
                            </p>
                          </Link>
                          <Button
                          type="primary"
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            width: "144px",
                            marginTop: 0,
                            background: "#E1E1E5",
                            color: "#000000",
                            border: "1px solid #F6F8FA",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                          onClick={showModal}
                        >
                          Buy
                        </Button>
                          <Button
                            type="primary"
                            style={{
                              height: "40px",
                              borderRadius: "6px",
                              width: "184px",
                              // marginTop: "20px",
                              marginLeft: "20px",
                              fontSize: "18px",
                              fontWeight: 600,
                            }}
                            onClick={() => deleteCart(product._id)}
                          >
                            Remove from Cart
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1
                      style={{
                        display: "flex",
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    >
                      No Product is Added to cart
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
          <Modal
            open={open}
            title="Shipping Address"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
              >
                Submit
              </Button>,
              <Button
                key="link"
                href="https://google.com"
                type="primary"
                loading={loading}
                onClick={handleOk}
              >
                Search on Google
              </Button>,
            ]}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Address:
              </Typography>
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter address"
                onChange={(e) => setAddress(e.target.value)}
                // value={name}
                style={{
                  borderRadius: "6px",
                  width: "284px",
                  height: "40px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                PinCode:
              </Typography>
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter pincode"
                onChange={(e) => setPinCode(e.target.value)}
                // value={price}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "284px",
                  height: "40px",
                  // marginTop: 0,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Phone Number:
              </Typography>
              <Input
                type={"text"}
                className="inputBox"
                placeholder="enter PhoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                // value={detail}
                style={{
                  display: "flex",
                  borderRadius: "6px",
                  width: "284px",
                  height: "40px",
                  // marginTop: 0,
                }}
              />
            </div>
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Cash On Delivery
            </Typography>
          </Modal>
        </Content>
      </Layout>
    </>
  );
};

export default ShowCart;
