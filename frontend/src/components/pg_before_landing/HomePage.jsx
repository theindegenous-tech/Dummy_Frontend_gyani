import * as React from "react";
// import "./index.css";
import { useState, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
// import DropdownMenu from './sort/DropdownMenu'
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  Link,
  Outlet,
  Route,
  useLocation,
  Routes,
  useNavigate,
} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Fab, IconButton, styled } from "@mui/material";
import Completed from "../Completed/Completed";
import { Mylibrary } from "../books_landing/Mylibrary";
import Discover2 from "../Discover/Discover2";
import Reading1 from "../futurepress/Reading1";
import { LikedBooks } from "../books_landing/LikedBooks";
import Profile from "../user-profile/Profile";
import Reading2 from "../futurepress/Reading2";
import Reading4 from "../futurepress/Reading4";
import Search from "../books_landing/Search";
import NotFound from "../NotFound";
import Bookmark from "../books_landing/Bookmark";
import Landing from "./Landing";

const drawerWidth = 339;

// This is a function to return the corresponding icon to the tab
function RenderIcon({ index }) {
  var iconArray = [
    <PersonOutlineIcon />,
    <SearchIcon />,
    <PersonOutlineIcon />,
    <BookmarkBorderOutlinedIcon />,
    <DoneOutlinedIcon />,
    <LibraryBooksRoundedIcon />,
    <FavoriteIcon />,
    <AccountCircleIcon />,
  ];
  return iconArray[index];
}

// This is a function to handle a click on the list of items in the drawer and call the callback function setDrawerTab in the App function
// This is a component to return an item in the list with its correct title and icon
function RenderListItemButtons({
  setDrawerTab,
  text,
  index,
  currentDrawerTab,
  setopen,
  open,
}) {
  function handleClick() {
    setDrawerTab(index);
    window.innerWidth <= 1024 ? setopen(!open) : setopen(open);
  }
  return (
    <ListItem
      key={index}
      disablePadding
      sx={{ borderRadius: "8px", width: "323px" }}
      onClick={handleClick}
    >
      <ListItemButton
        style={{
          backgroundColor: index === currentDrawerTab ? "#EFEFFD" : "#FFFFFF",
        }}
      >
        <ListItemIcon>
          <RenderIcon index={index} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: "#4A4A68",
            fontFamily: "Work Sans",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "22.4px",
          }}
          primary={text}
        />
      </ListItemButton>
    </ListItem>
  );
}

// This is the root function from which all other components are loaded
export default function HomePage() {
  // This is the state variable that holds the current selected tab in the drawer
  const [currentDrawerTab, setDrawerTab] = useState(0);
  const navNames = [
    "",
    "discover",
    "reading1",
    "bookmarks",
    "completed",
    "mylibrary",
    "liked",
    "profile",
    "reading2",
    "reading4",
    "*"
  ];
  var tabArray = [
    <Landing/>,
    <Discover2 />,
    <Reading1 />,
    <Bookmark />,
    <Completed />,
    <Mylibrary />,
    <LikedBooks />,
    <Profile />,
    <Reading2 />,
    <Reading4 />,
    <NotFound/>
  ];
  let location = useLocation();
  const [myarr, setMA] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.innerWidth <= 1024 ? setopen(!open) : setopen(open);
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    const str = location.pathname;
    var some = str.split("/");
    if (some.length === 3) {
      setMA(some);
      setDrawerTab(navNames.indexOf(some[2]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Added");
  };
  const [open, setopen] = useState(true);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
  }));

  const path = useLocation();

  return myarr ? (
    <div className="flex  justify-center lg:flex-row flex-col items-center bg-white overflow-hidden">
      {
        path.pathname !== '/' && 
        <div className="flex w-full flex-col justify-start items-start lg:hidden">
        <div className="flex flex-col items-start justify-start w-full  ">
          <div className="flex items-center ml-5 justify-start">
            <IconButton onClick={() => setopen(!open)} size={"large"}>
              <MenuIcon />
            </IconButton>
            <div
              style={{
                fontFamily: "Work Sans",
                fontWeight:700
              }}
              className="text-[#0E0E2C] font-[700] !text-[40px] lg:text-[64px] leading-[75px] tracking-[-2%]"
            >
              Gyani
            </div>
          </div>
          <Typography
            sx={{
              color: "#4A4A68",
              fontFamily: "Work Sans",
              fontWeight: 500,
              fontSize: "24px",
              marginLeft: "10%",
              width: "100%",
              lineHeight: "28.52px",
            }}
            component="div"
          >
            The Indegenous Library
          </Typography>
        </div>
      </div>
      }
      {open && 
      path.pathname !== '/' &&
      (
        <Drawer
          className="lg:block !overflow-hidden"
          sx={{
            width: 340,
            overflow: "hidden",
          }}
          variant="permanent"
          anchor="left"
        >
          <div sx={{ border: "none", boxShadow: "none" }}>
            <CardContent>
              <Typography
                sx={{
                  color: "#0E0E2C",
                  fontFamily: "Work Sans",
                  fontWeight: 700,
                  fontSize: "64px",
                  lineHeight: "75.07px",
                  letterSpacing: "-2%",
                  overflowX: "hidden",
                }}
                gutterBottom
              >
                Gyani
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Work Sans",
                }}
                className="text-[#4A4A68] font-[500] !text-[24px] leading-[28.5px] hidden lg:block"
                component="div"
              >
                The Indegenous Library
              </Typography>
            </CardContent>
          </div>
          <div className="lg:hidden">
            <DrawerHeader>
              <IconButton onClick={() => setopen(!open)}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
          </div>

          <List style={{ marginTop: "6px", marginLeft: "8px", width: "100%" }}>
            {[
              "Home",
              "Discover",
              "Reading",
              "Bookmarks",
              "Completed",
              "My Library",
            ].map((text, index) => (
              <Link to={navNames[index]} key={index}>
                <RenderListItemButtons
                  key={index}
                  setDrawerTab={setDrawerTab}
                  index={index}
                  text={text}
                  setopen={setopen}
                  open={open}
                  currentDrawerTab={currentDrawerTab}
                />
              </Link>
            ))}
          </List>
        </Drawer>
      )}
      <div className="flex flex-col w-full justify-center items-center lg:items-start h-full">
        <div className="flex flex-col gap-2 lg:flex-row justify-center lg:justify-center h-full items-center w-full">
          {!path.pathname.match("notfound")==="" && (
            <div>
              {currentDrawerTab !== 1 && (
                <>
                  {window.innerWidth < 1024 ? (
                    <Link to="/dashboard/discover">
                      <Fab
                        onClick={() => setDrawerTab(1)}
                        variant="circular"
                        color="primary"
                        aria-label="add"
                        size="medium"
                        style={{
                          margin: 0,
                          top: "auto",
                          right: 20,
                          bottom: 20,
                          left: "auto",
                          position: "fixed",
                        }}
                      >
                        <SearchIcon />
                      </Fab>
                    </Link>
                  ) : (
                    <div className="h-[48px] mb-10 !w-[90%]">
                      <Search />
                      </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <Routes>
          {navNames.map((nav, i) => {
            return <Route path={nav} element={tabArray[i]} />;
          })}
        </Routes>
        <Outlet />
      </div>
    </div>
  ) : (
    <></>
  );
}
