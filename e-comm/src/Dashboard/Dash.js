import React, { useRef } from "react";
import {
  Col,
  Layout,
  Menu,
  Row,
  Card,
  Tooltip,
  Carousel,
  Image,
  Button,
  Tag,
} from "antd";
import {
  InfoCircleOutlined,
  RightOutlined,
  LeftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Header from "../Layout/Header/Headers";
import Sidebar from "../Layout/Sidebar/Sidebar";

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

export default function Dash() {
  const ref = useRef();

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
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={6}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      width: "384px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                      backgroundImage: "url(/gradient-circle.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
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
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "row",
                        gap: "18px",
                      }}
                    >
                      <img
                        width={"full"}
                        height={"175px"}
                        alt="image0"
                        src="/assets/image_1.png"
                        style={{
                          borderRadius: "20px",
                        }}
                      />
                      <div>
                        <h1>Apple Watch 4</h1>
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
                        <h2>RS. 20,000</h2>
                        <div>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Apple
                          </Tag>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Smart Watch
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      width: "384px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                      backgroundImage: "url(/gradient-circle.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "row",
                        gap: "18px",
                      }}
                    >
                      <img
                        width={"full"}
                        height={"175px"}
                        alt="image0"
                        src="/assets/image_3.png"
                        style={{
                          borderRadius: "20px",
                        }}
                      />
                      <div>
                        <h1>Apple Airpods Pro</h1>
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
                        <h2>Rs. 15,000</h2>
                        <div>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Apple
                          </Tag>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Earphone
                          </Tag>
                        </div>
                        {/* <Button>Buy</Button> */}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      width: "384px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                      backgroundImage: "url(/gradient-circle.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "row",
                        gap: "18px",
                      }}
                    >
                      <img
                        width={"full"}
                        height={"175px"}
                        alt="image0"
                        src="/assets/image_2.png"
                        style={{
                          borderRadius: "20px",
                        }}
                      />
                      <div>
                        <h1>Robot-tozalagich</h1>
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
                        <h2>Rs. 80,000</h2>
                        <div>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Apple
                          </Tag>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Tech
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    hoverable
                    bordered={false}
                    style={{
                      width: "384px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                      backgroundImage: "url(/gradient-circle.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "row",
                        gap: "18px",
                      }}
                    >
                      <img
                        width={"full"}
                        height={"175px"}
                        alt="image0"
                        src="/assets/image_0.png"
                        style={{
                          borderRadius: "20px",
                        }}
                      />
                      <div>
                        <h1>Apple Macbook Pro</h1>
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
                        <h2>Rs. 1,48000</h2>
                        <div>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Apple
                          </Tag>
                          <Tag
                            color="processing"
                            style={{
                              borderRadius: "20px",
                            }}
                          >
                            Laptop
                          </Tag>
                        </div>
                        {/* <Button>Buy</Button> */}
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <div
            // className="site-layout-background"
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 24,
              minHeight: 260,
              justifyContent: "center",
              alignItems: "center",
              // width: "100%"
            }}
          >
            <Button
              style={{
                borderRadius: "100px",
                height: "54px",
                width: "54px",
                marginRight: "20px",
                color: "#FFFFFF",
                fontFamily: 600,
                fontSize: "20px",
                alignItems: "center",
                background:
                  "linear-gradient(270deg, rgba(77, 94, 246, 0.2) 0%, rgba(246, 77, 77, 0.2) 100%)",
              }}
              onClick={() => {
                ref.current.prev();
              }}
            >
              <LeftOutlined />
            </Button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "85%",
                height: "100%",
                borderRadius: "20px",
              }}
            >
              <Carousel
                ref={ref}
                autoplay={false}
                className="carousel"
                style={{ borderRadius: "20px" }}
              >
                <div>
                  {/* <h3 style={contentStyle}>1</h3> */}
                  <Image
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "20px" }}
                    src="/banner04.jpeg"
                  />
                </div>
                <div>
                <Image
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "20px" }}
                    src="/banner03.jpeg"
                  />
                </div>
                <div>
                <Image
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "20px" }}
                    src="/banner02.jpeg"
                  />
                </div>
                <div>
                <Image
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "20px" }}
                    src="/banner01.jpeg"
                  />
                </div>
              </Carousel>
            </div>
            <Button
              style={{
                borderRadius: "100px",
                height: "54px",
                width: "54px",
                color: "#FFFFFF",
                fontFamily: 600,
                fontSize: "20px",
                alignItems: "center",
                marginLeft: "20px",
                background: "linear-gradient(270deg, #4D5EF6 0%, #F64D4D 100%)",
              }}
              onClick={() => {
                ref.current.next();
              }}
            >
              <RightOutlined />
            </Button>
          </div>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 260,
            }}
          ></div>
        </Content>
      </Layout>
    </>
  );
}
