import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { ShoppingBag as ShoppingBagIcon } from "../public/images/icons/shopping-bag";
import { User as UserIcon } from "../public/images/icons/user";
import { Users as UsersIcon } from "../public/images/icons/users";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { DollarCircleOutlined, SkinOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
const items = [
  // {
  //   href: "/customeradmin",
  //   icon: <UsersIcon fontSize="small" />,
  //   title: "Customers",
  // },
  {
    href: "/productadmin",
    icon: <SkinOutlined />,
    title: "Products",
  },

  {
    href: "/listorderadmin",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Orders",
  },
  {
    href: "/accountadmin",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
];
export const DashboardSidebar = (props) => {
  const router = useRouter();
  const { open, onClose } = props;
  // const lgUp = useMediaQuery((theme) => theme?.breakpoints.up("lg"), {
  //   defaultMatches: true,
  //   noSsr: false,
  // });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
          <Button
            variant="danger"
            style={{ marginLeft: "40px", marginTop: "20px" }}
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        ></Box>
      </Box>
    </>
  );

  // if (lgUp) {
  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      variant="permanent"
    >
      {content}
    </Drawer>
  );
  // }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};