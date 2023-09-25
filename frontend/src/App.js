import "./index.css";
import { useState, useEffect } from "react";
import { Books } from "./components/books_landing/Books";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CardContent from "@mui/material/CardContent";
import Bookmark from "./components/books_landing/Bookmark";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Mylibrary } from "./components/books_landing/Mylibrary";
import { LikedBooks } from "./components/books_landing/LikedBooks";
import Completed from "./components/Completed/Completed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo1 from './SVGAvatars/Pencil.svg'

import {
  Link,
  Route,
  useLocation,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Profile from "./components/user-profile/Profile";
import HomeLanding from "./components/books_landing/HomeLanding";
import "./components/LoginPage/Signup.css";
import Reading1 from "./components/futurepress/Reading1";
import Reading2 from "./components/futurepress/Reading2";
import Reading4 from "./components/futurepress/Reading4";
import MenuIcon from "@mui/icons-material/Menu";
import { Fab, IconButton, styled, Tooltip } from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import NotFound from "./components/NotFound";
import ReactGA from 'react-ga';

import {
  BookmarkAddedOutlined,
  ChatBubbleOutline,
  DocumentScannerOutlined,
  Group,
  Home,
  LastPage,
  NotesOutlined,
  Payment,
  SettingsOutlined,
  SpeakerNotes,
} from "@mui/icons-material";
import SummaryGenerator from "./components/SummaryGenerator/SummaryGenerator";
import AiDetection from "./components/SummaryGenerator/AiDetection";
import logo from "../src/SVGAvatars/fullLogo.svg";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import Settings from "./components/Settings";
import MyNotes from "./components/books_landing/MyNotes";
import AIBot from "./components/SummaryGenerator/AIBot";
import Subscriptions from "./components/Subsriptions/Subscriptions";
import GyaniCommunity from "./components/Community/GyaniCommunity";
import TalkToBook from "./components/SummaryGenerator/TalkToBook";

// This is a function to return the corresponding icon to the tab
export function RenderIcon({ index }) {
  var iconArray = [
    <div/>,
    <Home />,
    // <SearchIcon />,
    <NotesOutlined />,
    // <LibraryBooksRoundedIcon />,
    <Group />,
    <SummarizeIcon />,
    // <SpeakerNotes />,
    <DocumentScannerOutlined />,
    <ChatBubbleOutline />,
    <SettingsOutlined />,
    //Reader
    <div/>,
    // <PersonOutlineIcon />,
    // <BookmarkBorderOutlinedIcon />,
    // <DoneOutlinedIcon />,
    // <FavoriteIcon />,
    <AccountCircleIcon />,
    <div />,
    <Payment />,
  ];
  return iconArray[index];
}

// This is a function to handle a click on the list of items in the drawer and call the callback function setDrawerTab in the App function
// This is a component to return an item in the list with its correct title and icon
export function RenderListItemButtons({
  setDrawerTab,
  text,
  index,
  currentDrawerTab,
  setopen,
  open,
}) {
  function handleClick() {
    setDrawerTab(index);
    // setopen(!open);
  }

  if (text === "1") {
    return (
      <div className="mt-4" style={{ fontFamily: "Work Sans" }}>
        {t("Tools")}
      </div>
    );
  }
  if (text === "2") {
    return (
      <div className="mt-4" style={{ fontFamily: "Work Sans" }}>
        {t("Reader")}
      </div>
    );
  }
  if (text === "3") {
    return (
      <div className="mt-4" style={{ fontFamily: "Work Sans" }}>
        {t("Billing")}
      </div>
    );
  }
  return (
    <Tooltip title={!open && text} placement="right" arrow>
      <ListItem
        key={index}
        disablePadding
        sx={{ width: open ? 250 : 60, height: "40px" }}
        onClick={handleClick}
      >
        <ListItemButton
          style={{
            backgroundColor: index === currentDrawerTab ? "#FFFFFF" : "#EFEFFD",
          }}
        >
          <ListItemIcon>
            <RenderIcon index={index} />
          </ListItemIcon>
          {open && (
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
          )}
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}



// This is the root function from which all other components are loaded
export default function App() {
  // This is the state variable that holds the current selected tab in the drawer
  const [currentDrawerTab, setDrawerTab] = useState(0);
  const navNames = [
    "",
    "home",
    // "discover1",
    "mynotes",
    // "mylibrary",
    "gyanicommunity",
    "summarygen",
    // "talktobook",
    "scan",
    "chatbot",
    "settings",
    "",
    // "reading1",
    // "bookmarks",
    // "completed",
    // "liked",
    "profile",
    "",
    "subscriptions",
    "reading2",
    "discoverbook",
    "reading4",
    "notfound",
  ];
  var tabArray = [
    <div />,
    <HomeLanding />,
    // <Books currentDrawerTab={currentDrawerTab} setDrawerTab={setDrawerTab} />,
    <MyNotes />,
    // <Mylibrary />,
    <GyaniCommunity />,
    <SummaryGenerator />,
    // <TalkToBook />,
    <AiDetection />,
    <AIBot />,
    <Settings />,
    <div />,
    // <Reading1 />,
    // <Bookmark />,
    // <Completed />,
    // <LikedBooks />,
    <Profile />,
    <div />,
    <Subscriptions />,
    <Reading2 />,
    <div />,
    <Reading4 />,
    <NotFound />,
  ];
  let location = useLocation();
  const [myarr, setMA] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.initialize('G-XFY1Q57QVZ');
    ReactGA.pageview(window.location.pathname + window.location.search);

    window.innerWidth <= 1024 ? setopen(!open) : setopen(open);
    console.log(JSON.parse(localStorage.getItem("user")))

    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login");
    }
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

  const [open, setopen] = useState(window.innerWidth >= 1024);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
  }));

  const path = useLocation();

  const { t } = useTranslation();

  return myarr ? (
    <>
      <div className="flex h-screen overflow-y-scroll justify-start lg:flex-row !w-full flex-col items-start bg-white overflow-hidden scrollbar-hide ">
        <Drawer
          className="lg:block !overflow-y-hidden !scrollbar-hide"
          sx={{
            // margin left for the main screen
            width: open ? 270 : 100,
            overflow: "hidden",
          }}
          variant={window.innerWidth < 1024 ? "persistent" : "permanent"}
          open={window.innerWidth < 1024 ? open : true}
          anchor="left"
          PaperProps={{
            sx: {
              backgroundColor: "#EFEFFD",
            },
          }}
        >
          <div className="flex flex-row justify-between items-center">
            <div>
              {open && (
                <a href="/"><CardContent  >
                <img src={logo} />
              </CardContent></a>
              )}
            </div>
            <div className={`flex justify-center items-center lg:block !scrollbar-hide ${!open && 'mt-5'}`}>
              <DrawerHeader className="!scrollbar-hide">
                <button className="flex justify-center items-center  rounded-full px-[0.5px] bg-[#EFEFFD]">
                  <IconButton
                    size="large"
                    type="button"
                    className="hover:opacity-[0.5]"
                    onClick={() => setopen(!open)}
                  >
                    <>
                    {
                      open ?<LastPage /> :<img style={{Width : 50,height:50 }} src={logo1} />
                    }
                    </>
                  </IconButton>
                </button>
              </DrawerHeader>
            </div>
          </div>

          <List className="mt-[6px] !ml-2 !w-[100%]">
            {[
              "1",
              t("Home"),
              // t("Discover"),
              t("My Notes"),
              // t("My Library"),
              t("Gyani Community"),
              t("Summary Generator"),
              // t("Talk to Book"),
              t("Detect AI"),
              t("Chat Bot"),
              t("Settings"),
              "2",
              // t("Reading"),
              // t("Bookmarks"),
              // t("Completed"),
              // t("Liked"),
              t("Profile"),
              "3",
              t("Subscriptions"),
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
        <div className="w-full">
          <div className="flex  flex-col justify-center items-center w-full">
            <div className="flex flex-col items-start justify-start !w-full  ">
              <div className="flex flex-row items-center px-4 mt-5 !justify-start gap-5 scrollbar-hide !w-full lg:px-8">
                {!open && (
                  <>
                    <button className="flex justify-start items-center  rounded-full px-[0.5px] hover:bg-[#EFEFFD] lg:hidden">
                      <IconButton
                        size="large"
                        type="button"
                        className="hover:opacity-[0.5]"
                        onClick={() => setopen(!open)}
                      >
                        <MenuIcon />
                      </IconButton>
                    </button>
                    {/* <img src={logo} /> */}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-full justify-center items-center lg:items-start">
            <div className="flex flex-col gap-2 lg:flex-row justify-center lg:justify-center items-center w-full">
              {!path.pathname.includes("notfound") && (
                <div className=" !w-full">
                  {currentDrawerTab == 1 ? (
                    <>
                      {window.innerWidth < 1024 ? (
                        <Link to="/dashboard/discover1">
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
                        <div />
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
            <Routes>
              {navNames.map((nav, i) => {
                return <Route exact path={nav} key={i} element={tabArray[i]} />;
              })}
              <Route path="/gyanicommunity/*" element={<GyaniCommunity />} />
              <Route
                path="/*"
                element={<Navigate to="/dashboard/notfound" />}
              />
            </Routes>
            {/* <Outlet/> */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
