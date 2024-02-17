import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Layout,
  Menu,
  Row,
  Card,
  Tooltip,
  Image,
  Button,
  Tag,
  Spin,
} from "antd";
import Header from "../Layout/Header/Headers";
import Sidebar from "../Layout/Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
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

const ShowProduct = () => {
  const ref = useRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${
          JSON.parse(localStorage.getItem("user"))?.auth
        }`,
      },
    });
    result = await result.json();
    setData(result);
    setLoading(false);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    console.log(key);
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${
            JSON.parse(localStorage.getItem("user"))?.auth
          }`,
        },
      });
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(data);

  return (
    <>
      <Header search={searchHandle} />
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
                  width: "100%",
                  display: "flex",
                  padding: "40px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin tip="Loading" size="large">
                  <div className="content" style={{ marginRight: "60px" }} />
                </Spin>
              </div>
            ) : (
              <div className="site-card-wrapper">
                {data?.length > 0 ? <Row gutter={16} style={{ gap: "60px", marginLeft: "20px" }}>
                  {/* <Col span={6}> */}
                  {data?.map((product, index) => (
                    <Link to={`/productDetails/${product?._id}`}>
                      <Card
                        key={product?._id}
                        hoverable
                        // title={"Card Details"}
                        bordered={false}
                        style={{
                          width: "344px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "12px",
                          backgroundImage: "url(/gradient-circle.png)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover"
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
                            flexDirection: "column",
                          }}
                        >
                          <img
                            width={"200px"}
                            height={"200px"}
                            alt="image0"
                            src={product?.store}
                            style={{
                            borderRadius: "20px",
                            }}
                          />
                          <div>
                            <h1 style={{ fontSize: "24px", fontWeight: 600 }}>
                              {product.name}
                            </h1>
                            <Tooltip
                              title={product?.detail}
                              overlayStyle={{
                                // display: "-webkit-Box",
                                // overflow: "hidden",
                                // WebkitLineClamp: "3",
                                // WebkitBoxOrient: "vertical",
                                height: "144px",
                                width: "224px",
                                overflow: "hidden",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  display: "-webkit-Box",
                                  overflow: "hidden",
                                  WebkitLineClamp: "1",
                                  WebkitBoxOrient: "vertical",
                                  marginTop: "8px",
                                }}
                              >
                                {product?.detail}
                              </p>
                            </Tooltip>
                            <div>
                              <StarOutlined
                                style={{
                                  color: "yellow",
                                }}
                              />
                              <StarOutlined
                                style={{
                                  color: "yellow",
                                  marginLeft: "4px",
                                }}
                              />
                              <StarOutlined
                                style={{
                                  color: "yellow",
                                  marginLeft: "4px",
                                }}
                              />
                              <StarOutlined
                                style={{
                                  color: "yellow",
                                  marginLeft: "4px",
                                }}
                              />
                            </div>
                            <h2>{`Rs. ${product.price}`}</h2>
                            <div>
                              <Tag color="processing">{product.company}</Tag>
                              <Tag color="processing">{product.category}</Tag>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                  {/* </Col> */}
                </Row> : 
                <div style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <h1
                  style={{
                    marginTop: "40px",
                    fontSize: "28px",
                    fontWeight: 700
                  }}
                  >No Product Found</h1>
                </div>}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default ShowProduct;
