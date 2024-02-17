import React, { useEffect, useState } from "react";
import "./Headers.css";
import { Layout, Menu, Dropdown, Space, Input, Image } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  CloseOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { useUser } from "../../Context/userContext";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { subMenu } = Menu;

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Profile
          </a>
        ),
        icon: <UserOutlined />,
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Setting
          </a>
        ),
        icon: <SettingOutlined />,
        // disabled: true,
      },
      {
        key: "3",
        label: (
          <Link
            to="/login"
            onClick={() => localStorage.clear()}
          >
            Logout
          </Link>
        ),
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const Headers = ({search}) => {
  const [hideFilter, setHideFilter] = useState(false);
  const [showFilter, SetShowFilter] = useState(true);

  const { user } = useUser();

  const auth = localStorage.getItem('user');

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        height: "48px",
        lineHeight: "48px",
      }}
    >
      <div
        className="ant-pro-global-header ant-pro-global-header-layout-mix"
        style={{ display: "flex", height: "100%", alignItems: "center" }}
      >
        <div
          className="ant-pro-global-header-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <a
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              gap: "10px",
              marginLeft: "15px",
            }}
            href="/"
          >
            <img
              style={{ height: "28px" }}
              alt="Logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <h1 style={{ fontSize: "18px", color: "#fff", marginTop: "9px" }}>
              GetGadgets
            </h1>
          </a>
          {auth ? (
            <div
              style={{
                display: "flex",
                color: "#fff",
                // position: 'absolute',
                float: "left",
                marginLeft: "auto",
                marginRight: "35px",
                gap: "25px",
              }}
            >
              <div className="hh" style={{ display: "flex", gap: "10px" }}>
                {showFilter && (
                  <div
                    onClick={() => {
                      setHideFilter(true);
                    }}
                  >
                    <SearchOutlined />
                  </div>
                )}
                {hideFilter && (
                  // <div  className='sssds' style={hideFilter ? { display: 'block', visibility: 'visible', opacity: 1} : { visibility: 'hidden', opacity: 0}}>
                  <div>
                    <Input
                      addonAfter={
                        <CloseOutlined
                          onClick={() => {
                            setHideFilter(false);
                          }}
                        />
                      }
                      onChange={search}
                      style={{ height: "22px", marginTop: "8px" }}
                    ></Input>
                  </div>
                )}
              </div>
              <div>
                <Link to={"/showCart"}>
                <ShoppingCartOutlined />
                </Link>
              </div>
              <div>
                <BellOutlined />
              </div>
              <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Image
                      width={24}
                      height={24}
                      src={user?.user?.store ? user?.user?.store : "/assets/user_profile.png"}
                      style={{ borderRadius: "30px", marginTop: "-2px" }}
                    />
                    Profile
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <div
            style={{
              display: "flex",
              color: "#fff",
              // position: 'absolute',
              float: "left",
              marginLeft: "auto",
              marginRight: "35px",
              gap: "25px",
            }}
            >
              <div><Link to={"/login"}>Login</Link></div>
              <div><Link to={"/register"}>SignUp</Link></div>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
}

export default Headers;
