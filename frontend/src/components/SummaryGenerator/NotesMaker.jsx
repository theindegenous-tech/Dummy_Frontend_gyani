import { useState,useRef } from "react";
import {
  DragHandleMenu,
  DragHandleMenuItem,
  RemoveBlockButton,
  useBlockNote,
  BlockNoteView,
  ReactSlashMenuItem,
  defaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import "./NotesMaker.css";
import "../SummaryGenerator/NotesMaker.css";
import axios from "axios";
import useContextMenu from "./useContextMenu";
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bolt,
  Book,
  LastPage,
  Note,
  Print,
  Save,
  Science,
  Search,
  Subject,
  Timer,
  Chat,
  Refresh,
  Share,
  Stop
} from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../books_landing/animation.css'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useTranslation } from "react-i18next";
import Summarize from "@mui/icons-material/Summarize";
import { useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";
import { database } from "../../Firebase";
import { child, get, onValue, ref, set } from "firebase/database";
import { gapi } from 'gapi-script';
import Drivelogo1 from './components/Drivelogo'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate } from "react-router-dom";
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import Loading from "../books_landing/Loading";
import { Fade } from "react-reveal";

export default function NotesMaker({
  notes,
  newNotesTitle,
  category,
  setNotesName,
  setSavedNotes,
  request,
  fetchNotes,
  sideMenu,
  setSideMenu,
  setText,
  editTitle,
  text,
  notesId,
  re2, 
  setre2,
  sty, 
  setsty,
  sar,
  setsar,
  gs,
  setgs,
  re,
  setre,
  parad, 
  setparad,
  dri, 
  setdri,
  handleTimerStart,
  handleTimerStop,
  timerStart,
  convertStoMs,
  time,
  timerd,
                  settimerd,
                  setcompletiond,
                  completiond,
                  Notesuuid,
                  shareDialog,
                  sav,
                  setsav
}) {
  const [open, setOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional");
  const [style, setStyle] = useState("Poetic");
  const [syncing, setSyncing] = useState(false);
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  const [SummeriseText, setSummeriseText] = useState();
  const [ElaborateText, setElaborateText] = useState();
  const [researchText, setResearchText] = useState("");
  const [researchResponse, setResearchResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [generateDialog, setGenerateDialog] = useState(false);
  const [generateDialog1, setGenerateDialog1] = useState(false);
  const [generateInput, setGenerateInput] = useState("");
  const [sources, setSources] = useState([]);
  const [tab, setTab] = useState(2);
  const [more, setMore] = useState(2);
  const [initNotes, setInitNotes] = useState();
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState();
  const [listvisible, setlistvisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showsearch, setshowsearch] = useState(false);
  const [foldersdata, setfoldersdata] = useState();
  const [length1, setlength1] = useState(0);
  const [ai1, setai1] = useState("false");
  const [show1, setshow1] = useState(false);
  const [su, setsu] = useState("false");
  const [el, setel] = useState("false");
  const [heading, setheading] = useState("false");
  const [headingdone, setheadingdone] = useState("false");
  const [menuguid, setmenuguid] = useState("false");
  const [gen, setgen] = useState("false");
  const [gendone, setgendone] = useState("false");
  const [reas, setreas] = useState("false");
  const [ft, setft] = useState("false");
  const [filename1, setfilename1] = useState("");
  const [showchatwithpdf, setshowchatwithpdf] = useState(false);
  const [showfolder, setshowfolder] = useState(false);
  const [localfile, setlocalfile] = useState();
  let navigate = useNavigate();
  const [displayMessages, setdisplayMessages] = useState([]);
  const [showprogressbar, setshowprogressbar] = useState();
  const FormData = require('form-data');
const fs = require('fs');


  const bottomRef = useRef(null);

  const history = useNavigate();

  useEffect(() => {
    let msgs = JSON.parse(localStorage.getItem("chats"));
    if (msgs !== null) setdisplayMessages(msgs);
  }, []);

  const [msg, setMsg] = useState("");
  const [input, setInput] = useState(false);

  function bottomScroll() {
    bottomRef.current &&
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    bottomScroll()
  }, 1);

  async function getChat() {
    if (msg.length <= 0) {
      alert("Please Write Message !");
      return;
    }
    setInput(true);
    bottomScroll();
    displayMessages.push([msg, "sent"]);
    bottomScroll();
    setMsg("");
    let data = JSON.stringify({
      "query": msg,
      "userid": user.id,
      "user_id": user.id,
      "filename": filename1
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/query_fine_tune/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      bottomScroll();
      console.log(response)
      displayMessages.push([response.data.response, "rcvd"]);
      bottomScroll();
      setInput(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async function uploadgd(url,name,id) {
    let data = JSON.stringify({
      "url":url,
      "filename":name,
      "user_id":id
    });
    setfilename1(name)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/send_drive_doc/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      alert(response.data.message)
    })
    .catch((error) => {
      console.log(error);
    });
      
  }
  
  const uploadlocalfile = async () => {
    if (!localfile) return;
    let data = new FormData();
    data.append('file', localfile);
    data.append('user_id', user.id); // assuming `user` is defined in your scope
    data.append('filename', localfile.name);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.gyanibooks.com/save_doc_api/',
        headers: { 
            ...data.getHeaders()
        },
        data: data
    };

    try {
        let response = await axios.request(config);
        setshowchatwithpdf(true);  // assuming these functions are defined in your scope
        setshowsearch(false);
        console.log(response);
    } catch (error) {
        alert(error);
    }
};


 
  
  const [plus1, setplus1] = useState("false");
  
  

  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v2/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';



const initClient = () => {
  setIsLoadingGoogleDriveApi(true);
  gapi.client
    .init({
      apiKey: "AIzaSyCsDxeAsBSly3Zs66-qeoYqE_SFyp3ydxc",
      clientId: "782574336068-468vpe6lpv8v1r9d025h3gh74dmdcvpj.apps.googleusercontent.com",
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      function (error) {
        console.log(error)
      }
    );
};

const updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    // Set the signed in user
    setSignedInUser(gapi.auth2.getAuthInstance().currentUser.le.wt.Ad);
    setIsLoadingGoogleDriveApi(false);
    // list files if user is authenticated
    listFiles();
  } else {
    // prompt user to sign in
    handleAuthClick();
  }
};


const listFiles = (searchTerm = null) => {
  setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        fields: 'nextPageToken, items(id, title, mimeType)',
    maxResults: 3000
      })
      .then(function (response) {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        const res = JSON.parse(response.body);
        setDocuments(res.items);
        // console.log(res.items);
      });
};


const handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn();
};
  
const handleClientLoad = () => {
  gapi.load('client:auth2', initClient);
};

const getfile1 = async(realFileId) => {
  gapi.client.drive.files
  .get({
    fileId: realFileId,
  })
  .then(function (response) {
    const res = JSON.parse(response.body);
    uploadgd(res.alternateLink,res.title,user.id)
    setshowchatwithpdf(true);
    setshowsearch(false)
  });
};

const search1 = async() => {
setDocuments(documents.filter(e=>e.title.toUpperCase()==searchTerm.toUpperCase()));
};




  let vertical = "top";
  let horizontal = "right";

  let user = JSON.parse(localStorage.getItem("user"));

  const CustomDragHandleMenu = (props) => {
    return (
      <DragHandleMenu>
        <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
        <DragHandleMenuItem
          closeMenu={props.closeMenu}
          onClick={() => {
            summarise(props.block.content[0].text.toString());
            props.closeMenu();
          }}
        >
          Summarise
        </DragHandleMenuItem>
        <DragHandleMenuItem
          closeMenu={props.closemenu}
          onClick={() => {
            // console.log(props.block.content[0].text.toString());
            // elaborate(props.block.content[0].text.toString());
            props.closeMenu();
          }}
        >
          Elaborate
        </DragHandleMenuItem>
        <DragHandleMenuItem
          closeMenu={props.closemenu}
          onClick={() => {
            setGenerateDialog(true);
            props.closeMenu();
          }}
        >
          Generate
        </DragHandleMenuItem>
      </DragHandleMenu>
    );
  };
  const summariseMenu = (editor) => {
    setSideMenu(true);
    setTab(0);
    setlistvisible(true);
    setshowsearch(false)
    // summarise(editor.getTextCursorPosition().block.content[0].text);
  };
  const elaborateMenu = (editor) => {
    setSideMenu(true);
    setTab(1);
    setlistvisible(true);
    setshowsearch(false)
    // elaborate(editor.getTextCursorPosition().block.content[0].text);
  };
  const generateMenu = (editor) => {
    setGenerateDialog(true);
  };
  const researchMenu = (editor) => {
    setSideMenu(true);
    setTab(2);
    setlistvisible(false);
    setshowsearch(false)
    // setGenerateDialog1(true);
  };


  const summariseMenuItem = new ReactSlashMenuItem(
    "Summarise",
    summariseMenu,
    ["summarise", "sm"],
    "Tools",
    <Summarize size={18} />,
    "Used to Summarise the text of this block.",
  );
  const elaborateMenuItem = new ReactSlashMenuItem(
    "Elaborate",
    elaborateMenu,
    ["paraphrase", "elaborate"],
    "Tools",
    <Book size={18} />,
    "Used to Elaborate the text of this block."
  );
  const generateMenuItem = new ReactSlashMenuItem(
    "Generate",
    generateMenu,
    ["generate"],
    "Tools",
    <Note size={18} />,
    "Used to Generate the text of this block."
  );
  const researchMenuItem = new ReactSlashMenuItem(
    "Research",
    researchMenu,
    ["research", "elaborate"],
    "Tools",
    <Science size={18} />,
    "Used to Research the text of this block."
  );

  const customSlashMenuItemList = [
    summariseMenuItem,
      elaborateMenuItem,
      researchMenuItem,
      generateMenuItem,
      ...defaultReactSlashMenuItems,
  ];

  let editor = useBlockNote({});

  editor = useBlockNote({
    slashCommands: [
      ...customSlashMenuItemList,
    ],
    // initialContent: initNotes,
    onEditorReady: (editor) => {
      get(
        child(ref(database), "/" + user.personalisation.id + "/" + notesId)
      ).then((snapshot) => {
        let data = snapshot.val();
        data = JSON.parse(data.notes);
        editor._tiptapEditor.commands.setContent(data)
      });
    },
    onEditorContentChange: (editor) => {
      setTimeout(() => {
        set(ref(database, "/" + user.personalisation.id + "/" + notesId), {
          notes: JSON.stringify(editor._tiptapEditor.getJSON()),
        });
      }, 4000);
      
    },
    customElements: {
      dragHandleMenu: CustomDragHandleMenu,
    },
  });

  

  const summarise = async (text) => {
    setLoading(true);
    let data = JSON.stringify({
      "text": text + `For this text use the tone as ${tone}, with emotion ${style}`,
      "lang": language,
      "userId":user.id
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/inde_summary/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      var text = {
        type: "blockContainer",
        attrs: {
          id: "5cb9dc7f-4f6d-4cbf-8cd3-1bc76b3071c3",
          textColor: "blue",
          backgroundColor: "gray",
          level: 3,
        },
        content: [
          {
            type: "paragraph",
            attrs: {
              textAlignment: "left",
            },
            // marks: [
            //   {
            //     type: "bold",
            //   },
            // ],
            content: [
              {
                type: "text",
                text: response.data,
              },
            ],
          },
        ],
      };
  
      const updateBlock = {
        type: "paragraph",
        content: [
          {
            type: "text",
            style: {
              id: "5cb9dc7f-4f6d-4cbf-8cd3-1bc76b3071c3",
              textColor: "blue",
              backgroundColor: "gray",
              level: 3,
            },
            text: response.data,
            styles: { textColor: "blue", backgroundColor: "gray", level: 3 },
          },
        ],
      };
      console.log(response.data)
      var update = editor._tiptapEditor.getJSON();
      var len = update.content[0].content.length;
      update.content[0].content[len - 1] = text;
      editor._tiptapEditor.chain().focus().setContent(update).run();
      setText(editor._tiptapEditor.getJSON());
      document.getElementById("bottom").scrollIntoView();
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const elaborate = async (text) => {
    setLoading(true);
    let data = JSON.stringify({
      "text": text + `For this text use the tone as ${tone}, with emotion ${style}`,
      "lang": language,
      "userid":user.id
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/ind_Elaborate/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      var text = {
        type: "blockContainer",
        attrs: {
          // id: "5cb9dc7f-4f6d-4cbf-8cd3-1bc76b3071c3",
          textColor: "blue",
          backgroundColor: "gray",
          level: 3,
        },
        content: [
          {
            type: "paragraph",
            attrs: {
              textAlignment: "left",
            },
            // marks: [
            //   {
            //     type: "bold",
            //   },
            // ],
            content: [
              {
                type: "text",
                text: response.data,
              },
            ],
          },
        ],
      };
      const updateBlock = {
        type: "paragraph",
        content: [
          {
            type: "text",
            style: {
              id: "5cb9dc7f-4f6d-4cbf-8cd3-1bc76b3071c3",
              textColor: "blue",
              backgroundColor: "gray",
              level: 3,
            },
            text: response.data,
            styles: { textColor: "blue", backgroundColor: "gray", level: 3 },
          },
        ],
      };
      editor.insertBlocks(
        [updateBlock],
        editor.getTextCursorPosition().block,
        "after"
      );
      setText(editor._tiptapEditor.getJSON());
      document.getElementById("bottom").scrollIntoView();
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const research = async () => {
    setLoading(true)
    setSources([]);
    const res = await axios.post(
      "https://bot.gyanibooks.com/api/ind_research_work/",
      {
        //DATA TO POST
        text: researchText,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setSources(res.data[1]);
    setResearchResponse(res.data[0]);
    setLoading(false)
  };

  const filesfromfolder = async (fid) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/drive/v2/files?q='${fid}'+in+parents&key=AIzaSyCsDxeAsBSly3Zs66-qeoYqE_SFyp3ydxc`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setshow1(true)
      setshowfolder(true)
      setlength1(res.data.items.length)
    setfoldersdata(res.data.items)
    }
    catch(err) {
      setlength1(0)
    //  console.log(err)
    }
    
    
  };

  const generate = async () => {
    setLoading(true);
    const res = await axios.post(
      "https://bot.gyanibooks.com/api/ind_Elaborate/",
      {
        //DATA TO POST
        text: generateInput,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updateBlock = {
      type: "paragraph",
      content: [
        {
          type: "text",
          style: {
            id: "5cb9dc7f-4f6d-4cbf-8cd3-1bc76b3071c3",
            textColor: "blue",
            backgroundColor: "gray",
            level: 3,
          },
          text: res.data,
          styles: { textColor: "blue", backgroundColor: "gray", level: 3 },
        },
      ],
    };
    editor.insertBlocks(
      [updateBlock],
      editor.getTextCursorPosition().block,
      "after"
    );
    setText(editor._tiptapEditor.getJSON());
    // document.getElementById("bottom").scrollIntoView();
    setLoading(false);
  };


  async function detectAI() {
    const div = document.getElementById("editorNotes");
    if (div !== null) {
      setLoading1(true);
      let data = JSON.stringify({
        text: div.innerText,
        "userid":user.id
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.gyanibooks.com/inde_ai_detect/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const res = await axios.request(config);

      let real = 1 -res.data.fake;
      // console.log(real);
      setLoading1(false);
      setScore(Math.floor(real*100));
    }
  }

  async function saveText() {
    setSyncing(true);
    setNotesName(
      user.personalisation.id + "." + category + "." + request === "PUT"
        ? editTitle
        : newNotesTitle
    );
    if (request === "POST" && newNotesTitle.length <= 3) {
      setOpen("Title Must be more than 3 characters !");
      setSyncing(false);
      return;
    }
    let payload = {
      user: user.personalisation.id,
      title: request === "PUT" ? editTitle : newNotesTitle,
      category: category === undefined ? "Uncategorised" : category,
      notes: JSON.stringify(text),
    };
    let res = null;

    request === "PUT"
      ? (res = await axios.put(
          "https://api.gyanibooks.com/library/notes/",
          payload
        ))
      : (res = await axios.post(
          "https://api.gyanibooks.com/library/notes/",
          payload
        ));
    if (res.status === 200) {
      setOpen(res.data);
    }

    if (res.status === 200) {
      //
      setSavedNotes(text);
      setSyncing(false);
      fetchNotes();
      return true;
    }
  }

  useEffect(() => {
    if(sty=="true"){
      setTab(1);
      setlistvisible(true)
    }
  }, [sty]);

  const gettransaction = () => {
    let data = JSON.stringify({
      "userid": user.id
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/sub_details/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setshowprogressbar(response.data[response.data.length-1].payment_confimation)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    gettransaction()
  }, []);
  

  const printNotes = () => {
    let printContents = document.getElementById("printable").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // window.location.reload();
  };

  const { t } = useTranslation();

  const handleTabChange = (newValue) => {
    setTab(newValue);
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div style={{ p: 3 }}>
            <Typography>{children}</Typography>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full my-4 flex flex-col items-center justify-between scrollbar-hide"
      style={{ fontFamily: "Work Sans" }}
      onContextMenu={(e) => {
        setSelectedText(window.getSelection().toString());
        e.preventDefault();
        setClicked(true);
        setPoints({
          x: e.pageX,
          y: e.pageY,
        });
      }}
    >
      <div className="flex justify-center items-center">
        <Drawer
          anchor={"right"}
          open={sideMenu}
          onClose={() => setSideMenu(false)}
          variant="temporary"
        >
          <div
            className="w-full px-3 lg:!w-[700px] text-center lg:px-1 flex justify-center lg:justify-start items-center lg:items-start flex-col lg:gap-4 mb-5"
            style={{ fontFamily: "Work Sans" }}
          >
            <div className="flex flex-row justify-between items-center w-full mt-5">
              <button
                className="flex justify-start items-center  rounded-full px-[0.5px]  hover:bg-[#EFEFFD]"
                onClick={() => setSideMenu(false)}
              >
                <IconButton
                  size="large"
                  type="button"
                  className="hover:opacity-[0.5]"
                >
                  <LastPage />
                </IconButton>
              </button>
              {/* <IconButton
                size="large"
                className="px-[0.5px] !hover:bg-[#EFEFFD]"
                onClick={() => printNotes()}
              >
                <Print />
              </IconButton> */}
            </div>
            <div className="rounded-2xl bg-gray-200 text-lg  w-full hidden">
              <Bolt className="text-blue-400" /> Your balance: 9,313 premium
              words
            </div>
            <div className="flex lg:flex-row justify-between items-start w-full mt-1">
            <div className="container px-5  mx-auto" style={{fontFamily:"Work Sans"}}>
        <div className="flex flex-col text-center   w-full mb-2">            
            <div className="flex mx-auto  bg-[#EFEFFD] rounded-lg overflow-hidden">
              <>
              {
                <Tooltip open={su=="true"}  placement='bottom'
                arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Want a quick overview of all the superb work you have done! Go hit the summarizer button! 🔥</p>
                
             <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
               setsu("false")
               setdri("true")
             }}/>
                
                </div>}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#0E0E2C',
                        '& .MuiTooltip-arrow': {
                          color: '#0E0E2C',
                        },
                      },
                    },
                  }}
                  >
<Tooltip title={"Summarise"} arrow placement="bottom">
               <Button style={{
                            backgroundColor:
                              tab == 0 ? "#428CFB" : "#EFEFFD",
                            color: tab==0 ? "white":"#428CFB"
                          }} className="border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  w-full"  onClick={() => {
                        setTab(0)
                        setlistvisible(true);
                        setshowsearch(false);
                        setshowchatwithpdf(false)
                      }}>
               <p className=" text-[16px] font-[700] px-8 max-[645px]:px-1 max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }} >Summarise</p>
              </Button>
              </Tooltip>
              </Tooltip>
              }
              </>
              <>
              {
                <Tooltip open={el=="true"}  placement='bottom'
                arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Use the elaborate to get a simpler and easier version of the information! ✨</p>
                
             <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
               setsu("true")
               setel("false")
             }}/>
                
                </div>}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#0E0E2C',
                        '& .MuiTooltip-arrow': {
                          color: '#0E0E2C',
                        },
                      },
                    },
                  }}
                  >
              <Tooltip title={"Elaborate"} arrow placement="bottom">
              <button style={{
                            backgroundColor:
                              tab == 1 ? "#428CFB" : "#EFEFFD",
                            color: tab==1 ? "white":"#428CFB"
                          }} className="border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  w-full"
              onClick={() => {
                setTab(1);
                setlistvisible(true);
                setshowsearch(false);
                setshowchatwithpdf(false)
              }}><p className=" text-[16px] font-[700] px-8 max-[645px]:px-1 max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>ELABORATE</p></button>
              </Tooltip>
              </Tooltip>
              }
              </>
              
              <Tooltip title={"Research"} arrow placement="bottom">
              <button style={{
                            backgroundColor:
                              tab == 2 ? "#428CFB" : "#EFEFFD",
                            color: tab==2 ? "white":"#428CFB"
                          }} className="border border-transparent rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  w-full" onClick={() => {
                        setTab(2)
                        setlistvisible(false);
                        setshowsearch(false);
                        setshowchatwithpdf(false)
                      }}>
                <p className="text-[16px] font-[700] px-8 max-[645px]:px-1 max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>RESEARCH</p>
              </button>
              </Tooltip>
              <>
              {
                <Tooltip open={dri=="true"}  placement='bottom'
                arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs"  style={{ fontFamily: "Work Sans" }}>Do you already have a document? Use chat with PDF, upload your file, and literally ask any questions related to it!</p>
                
             <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
               setdri("false")
               setSideMenu(false)
               setsar("true")
             }}/>
               
                </div>}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#0E0E2C',
                        '& .MuiTooltip-arrow': {
                          color: '#0E0E2C',
                        },
                      },
                    },
                  }}
                  >
              <Tooltip title={"Chat with pdf"} arrow placement="bottom">
              <button style={{
                            backgroundColor:
                              tab == 3 ? "#428CFB" : "#EFEFFD",
                            color: tab==3 ? "white":"#428CFB"
                          }} className=" border border-transparent  rounded-lg  flex flex-row justify-center items-center space-x-2 py-2  w-full" onClick={() => {
                        setTab(3)
                        handleClientLoad();
                            setshowsearch(true);
                            setlistvisible(false);
                            setshowchatwithpdf(false)
                      }}>
                        <div className="flex flex-row">
                        <p className=" text-[16px] font-[700] pl-1 px-1 max-[645px]:px-1  max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>CHAT</p>
                        <p className=" text-[16px] font-[700] max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>WITH</p>
                        <p className=" text-[16px] font-[700] px-1 pr-1 max-[645px]:px-1 max-[645px]:text-[8px]" style={{ fontFamily: "Work Sans" }}>PDF</p>
                        </div>
              </button>
              </Tooltip>
              </Tooltip>
              }
              </>
              
            </div>
            
          </div>
          <>
          {
            sty=="true" ? <ListItem className="pulse flex flex-col lg:flex-row justify-around items-center gap-5  !w-full" > 
            {listvisible && (
              <>
              <FormControl
              className="lg:!flex flex-col gap-1  w-[120px]"
              fullWidth
            >
              <InputLabel id="demo-simple-select-helper-label" fullWidth>
                Writing Style
              </InputLabel>
              <Tooltip open={sty=="true"}  placement='top'
           arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[1050px]:text-xs" style={{ fontFamily: "Work Sans" }}>You can choose from a variety of writing styles, tones, and languages! Why don’t you paste your research information here and give it a try?</p>
            {/* <ArrowBackIcon className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
          setsty("false")
          setgs("true")
          setSideMenu(false)
        }}/> */}
        {/* <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
          setsty("false")
          setel("true")
        }}/> */}
           
           </div>}
             componentsProps={{
               tooltip: {
                 sx: {
                   bgcolor: '#0E0E2C',
                   '& .MuiTooltip-arrow': {
                     color: '#0E0E2C',
                   },
                 },
               },
             }}
             >
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="!h-[3] !w-full !rounded-lg"
                value={style}
                label="Writing Style"
                onChange={(e) => {
                  setStyle(e.target.value)
                  setsty("false")
          setel("true")
                }}
              >
                <MenuItem value={"Poetic"}>Poetic</MenuItem>
                <MenuItem value={"Travel Guide"}>Travel Guide</MenuItem>
                <MenuItem value={"Stand-up Comedian"}>
                  Stand-up Comedian
                </MenuItem>
                <MenuItem value={"Motivational Coach"}>
                  Motivational Coach
                </MenuItem>
                <MenuItem value={"Relationship Coach"}>
                  Relationship Coach
                </MenuItem>
                <MenuItem value={"Philosopher"}>Philosopher</MenuItem>
                <MenuItem value={"Astrologer"}>Astrologer</MenuItem>
                <MenuItem value={"Career Counselor"}>
                  Career Counselor
                </MenuItem>
                <MenuItem value={"Personal Trainer"}>
                  Personal Trainer
                </MenuItem>
                <MenuItem value={"Accountant"}>Accountant</MenuItem>
              </Select>
              </Tooltip>
            </FormControl>
            <FormControl className="flex flex-col gap-1  w-[120px]" fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Tone
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="!h-[3]"
                value={tone}
                label="Tone"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value={"Professional"}>Professional </MenuItem>
                <MenuItem value={"Emmotional"}>Emotional </MenuItem>
                <MenuItem value={"Encouraging"}>Encouraging </MenuItem>
                <MenuItem value={"Creative"}>Creative </MenuItem>
                <MenuItem value={"Funny"}>Funny </MenuItem>
                <MenuItem value={"Dramatic"}>Dramatic </MenuItem>
                <MenuItem value={"Witty"}>Witty </MenuItem>
                <MenuItem value={"Sarcastic"}>Sarcastic </MenuItem>
                <MenuItem value={"Engaging"}>Engaging </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="flex flex-col gap-1  w-[120px]" fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Output In
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                className="!h-[3]"
                value={language}
                label="Output In"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value={"en"}>English </MenuItem>
                <MenuItem value={"hi"}>Hindi</MenuItem>
                <MenuItem value={"kn"}>Kannada</MenuItem>
                <MenuItem value={"fr"}>French </MenuItem>
                <MenuItem value={"ja"}>Japanese</MenuItem>
                <MenuItem value={"ar"}>Arabic</MenuItem>
                <MenuItem value={"bn"}>Bangla</MenuItem>
              </Select>
            </FormControl>
            </>
            )}
            {
              showsearch && (
                <>
                <div className="flex flex-row w-100 mx-auto ">
                <input class="shadow appearance-none border rounded w-100 bg-red-200 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"  placeholder="Title" 
        type="text"
        value={searchTerm}
        onChange={(e) => {
          if(e.target.value){
            setSearchTerm(e.target.value)
          }
          else{
            setSearchTerm(e.target.value)
            handleClientLoad();
          }
        }}
        />
        <button
                      className="h-[30px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
              focus:outline-4 focus:outline-[#31D0AA] "
                      onClick={() => search1()}
                    >
                      <Search color="light"/>
                    </button>
                </div>
                </>
              )
            }
            {
            showchatwithpdf && (
              <>
               <div className="flex flex-row justify-between items-center w-full gap-3 ">
                       <button
                        className="h-[43px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mb-2"
                        onClick={() => {
                          setshowchatwithpdf(false)
                          setshowsearch(true)
                          }}
                      >
                       Return
                      </button>
               </div>
              </>
            )
          }
          </ListItem>:<ListItem className=" flex flex-col lg:flex-row justify-around items-center gap-5  !w-full" > 
          {listvisible && (
            <>
            <FormControl
            className="lg:!flex flex-col gap-1  w-[120px]"
            fullWidth
          >
            <InputLabel id="demo-simple-select-helper-label" fullWidth>
              Writing Style
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              className="!h-[3] !w-full !rounded-lg"
              value={style}
              label="Writing Style"
              onChange={(e) => setStyle(e.target.value)}
            >
              <MenuItem value={"Poetic"}>Poetic</MenuItem>
              <MenuItem value={"Travel Guide"}>Travel Guide</MenuItem>
              <MenuItem value={"Stand-up Comedian"}>
                Stand-up Comedian
              </MenuItem>
              <MenuItem value={"Motivational Coach"}>
                Motivational Coach
              </MenuItem>
              <MenuItem value={"Relationship Coach"}>
                Relationship Coach
              </MenuItem>
              <MenuItem value={"Philosopher"}>Philosopher</MenuItem>
              <MenuItem value={"Astrologer"}>Astrologer</MenuItem>
              <MenuItem value={"Career Counselor"}>
                Career Counselor
              </MenuItem>
              <MenuItem value={"Personal Trainer"}>
                Personal Trainer
              </MenuItem>
              <MenuItem value={"Accountant"}>Accountant</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="flex flex-col gap-1  w-[120px]" fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Tone
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              className="!h-[3]"
              value={tone}
              label="Tone"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value={"Professional"}>Professional </MenuItem>
              <MenuItem value={"Emmotional"}>Emotional </MenuItem>
              <MenuItem value={"Encouraging"}>Encouraging </MenuItem>
              <MenuItem value={"Creative"}>Creative </MenuItem>
              <MenuItem value={"Funny"}>Funny </MenuItem>
              <MenuItem value={"Dramatic"}>Dramatic </MenuItem>
              <MenuItem value={"Witty"}>Witty </MenuItem>
              <MenuItem value={"Sarcastic"}>Sarcastic </MenuItem>
              <MenuItem value={"Engaging"}>Engaging </MenuItem>
            </Select>
          </FormControl>
          <FormControl className="flex flex-col gap-1  w-[120px]" fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Output In
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              className="!h-[3]"
              value={language}
              label="Output In"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value={"en"}>English </MenuItem>
                <MenuItem value={"hi"}>Hindi</MenuItem>
                <MenuItem value={"kn"}>Kannada</MenuItem>
                <MenuItem value={"fr"}>French </MenuItem>
                <MenuItem value={"ja"}>Japanese</MenuItem>
                <MenuItem value={"ar"}>Arabic</MenuItem>
                <MenuItem value={"bn"}>Bangla</MenuItem>
            </Select>
          </FormControl>
          </>
          )}
          {
            showsearch && (
              <>
               <div className="flex flex-row justify-between items-center w-full gap-3 ">
               <input
                        className=" bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[40px] text-center w-full scrollbar-hide"
                        rows={2}
                        value={searchTerm}
                        onChange={(e) => { 
                          if(e.target.value){
                            setSearchTerm(e.target.value)
                          }
                          else{
                            setSearchTerm(e.target.value)
                            handleClientLoad();
                          }
                          
                        }}
                        // onKeyDown={(e) => e.key === "Enter" && research()}
                        placeholder="Write Text Here"
                      />
                       <button
                        className="h-[43px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mb-2"
                        onClick={() => {
                          search1()
                          
                          }}
                      >
                        <Search color="light"/>
                      </button>
               </div>
              </>
            )
          }
           {
            showchatwithpdf && (
              <>
               <div className="flex flex-row justify-between items-center w-full gap-3 ">
                       <button
                        className="h-[43px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mb-2"
                        onClick={() => {
                          setshowchatwithpdf(false)
                          setshowsearch(true)
                          }}
                      >
                       Return
                      </button>
               </div>
              </>
            )
          }
        </ListItem>
          }
          </>
          
              {/* <Drawer
                variant="permanent"
                sx={{
                  margin: 0,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                    // width: 100,
                    boxSizing: "border-box",
                  },
                }}
                PaperProps={{
                  style: {
                    position: "relative",
                    backgroundColor: "#EFEFFD",
                    borderRight: "3px groove gray",
                  },
                }}
                className="!lg:h-full"
              >
                <List>
                  {[
                    ["Summarise", <Summarize fontSize="large" />],
                    ["Elaborate", <Book fontSize="large"/>],
                    ["Research", <Science fontSize="large"/>],
                    ["Chat with pdf", <Drivelogo1 />],
                  ].map((item, index) => (
                    <Tooltip title={item[0]} arrow placement="right">
                      <ListItem
                        key={text}
                        disablePadding
                        onClick={() => {
                          setTab(index)
                          if(index==3){
                            handleClientLoad();
                            setshowsearch(true);
                          }
                          else{
                            setshowsearch(false);
                          }
                          if(index==0 || index==1){
                            setlistvisible(true);
                          }
                          else{
                            setlistvisible(false);
                          }
                        } }
                      >
                        <ListItemButton
                          style={{
                            backgroundColor:
                              index === tab ? "#FFFFFF" : "#EFEFFD",
                            marginRight: 0,
                            paddingRight: 0,
                            paddingTop:60
                          }}
                        >
                          <ListItemIcon disablePadding>{item[1]}</ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))}
                </List>
              </Drawer> */}
              <div className="w-full flex flex-col mx-1  justify-center items-center">
                {tab == 0 && (
                  <>
                    <textarea
                      className="bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[370px] text-center pt-5 mb-1 !pl-1 w-[96%] scrollbar-hide"
                      rows={2}
                      value={SummeriseText}
                      onChange={(e) => setSummeriseText(e.target.value)}
                      placeholder="Enter Text Here"
                    />
                    <button
                      className="h-[48px] w-[96%] flex flex-row bg-blue-500 justify-center items-center  rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#ffffff] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mt-1"
                      onClick={() => {
                        summarise(SummeriseText);
                        setSideMenu(false);
                      }}
                    >
                      SUMMARISE 
                    </button>
                  </>
                )}
                {tab == 1 && (
                  <>
                    <textarea
                      className="bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[370px] text-center pt-5 mb-1 w-[96%] scrollbar-hide"
                      rows={2}
                      value={ElaborateText}
                      onChange={(e) => setElaborateText(e.target.value)}
                      placeholder="Enter Text Here"
                    />
                    <button
                      className="h-[48px] w-[96%] flex flex-row justify-center bg-blue-500 items-center px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#ffffff] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mt-1"
                      onClick={() => {
                        elaborate(ElaborateText);
                        setSideMenu(false);
                      }}
                    >
                      ELABORATE 
                    </button>
                  </>
                )}
                {tab == 3 && (
                  <>
                    <div className="m-1 h-[420px] overflow-y-scroll scrollbar-hide w-[96%]" >
                      <>
                      {
                        !showchatwithpdf ? !showfolder ? <div> 
                          <div className="m-3 ">
            <input type="file"
                onChange={
                    (e) => {
                        if (e.target.files[0]) {
                            setlocalfile(e.target.files[0])
                        }
                    }
                }/>
                <Button
            variant="contained"
            onClick={() => {
              uploadlocalfile()
            }}
          >
            Upload
          </Button>
        </div>
                          <table className="min-w-full">
                        <thead>
                          <tr className="flex flex-row  items-center">
                          </tr>
                        </thead>
                        <tbody className="">
                          {documents.map((item, index) => (
                            <div key={index} className="group relative">
                               {
                              item.mimeType.slice(item.mimeType.length-6,item.mimeType.length)== "folder" ? <div><div className="mt-4 flex justify-between cursor-pointer  bg-white hover:bg-[#EFEFFD] p-3 rounded-lg drop-shadow-md w-[99%]"  onClick={() => filesfromfolder(item.id)}>
                              <div className="flex flex-row gap-8">
                                {
                                  show1 ?<FolderIcon fontSize="large" /> :<FolderIcon fontSize="large"/> 
                                }
                                <p className="mt-1 mr-5 text-base text-black " style={{ fontFamily: "Work Sans" }}>{item.title}</p>
                              </div>
                            </div>
                            </div>
                            : null
                            }
                          </div>
                          ))}
                          {documents.map((item, index) => (
                            <div key={index} className="group relative">
                               {
                              item.mimeType.slice(item.mimeType.length-6,item.mimeType.length)== "folder" ?null
                            :
                            <div className="mt-4 flex justify-between  bg-white hover:bg-[#EFEFFD] p-3 rounded-lg drop-shadow-md cursor-pointer w-[99%]" onClick={() => getfile1(item.id)}>
                              <div className="flex flex-row gap-8">
                                <p className="mt-1 mr-5 text-base text-black" style={{ fontFamily: "Work Sans" }}>{item.title}</p>
                              </div>
                            </div>
                            }
                          </div>
                          ))}
                        </tbody>
                      </table></div> : <div>{show1 && (length1==0 ?
                      <div>
                      <button
                        className="h-[43px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mb-2"
                        onClick={() => {
                         
                          setshowfolder(false)
                          }}
                      >
                       Return
                      </button>
                       <p>No data to show</p> </div>:
                              <>
                               <button
                        className="h-[43px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mb-2"
                        onClick={() => {
                         
                          setshowfolder(false)
                          }}
                      >
                       Return
                      </button>
                              {foldersdata.map((item, index) => (
                            <div key={index} className="group relative">
                               { 
                            <div className="mt-4 ml-16 flex bg-white hover:bg-[#EFEFFD] p-3 rounded-lg drop-shadow-md cursor-pointer w-[99%]" onClick={() => {
                             
                              uploadgd(item.alternateLink,item.title,user.id)
                              setshowchatwithpdf(true);
                              setshowsearch(false)
                            }}>
                              <div className="flex flex-row gap-8">
                                <p className="mt-1 mr-5 text-base text-black" style={{ fontFamily: "Work Sans" }}>{item.title}</p>
                              </div>
                            </div>
                            }
                          </div>
                          ))}
                          </>
                            )
                }</div> :<div><div
        id="messages"
        style={{ fontFamily: "Work Sans" }}
        className="flex flex-col p-3  overflow-y-scroll  scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch messages scrollbar-hide"
      >
        {displayMessages &&
          displayMessages.map((msg, i) => (
            <Fade bottom>
              <div className="chat-message py-2" key={i}>
                <div
                  className={`flex items-end ${
                    msg[1] === "sent" && "justify-end"
                  }`}
                >
                  <div className="flex flex-col space-y-2 text-md max-w-lg mx-2 order-2 items-end">
                    <div>
                      <span
                        className={`px-4 py-2 rounded-lg inline-block rounded-bl-none ${
                          msg[1] === "sent"
                            ? "bg-[#428CFB] text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {msg[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        <div id="bottomRef" ref={bottomRef} />
      </div><div className="px-4 mb-2">
        <div className="relative pt-4 flex justify-between items-center w-full">
          <input
            type="text"
            placeholder="Write your message!"
            value={msg}
            rows={1}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.shiftKey && e.code === 13) setMsg(msg + "\n");
              else if (e.key === "Enter" && !input && !e.shiftKey) getChat();
            }}
            className="lg:w-[80%] focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3 scrollbar-hide w-full mr-2"
          />
          <div className=" right-0 items-center inset-y-0 sm:flex">
            <button
              disabled={input}
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-[#428CFB] hover:bg-[#428CFB] focus:outline-none"
              onClick={() => getChat()}
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div></div>
                      }
                      </>
    </div>
                  </>
                )}
                {tab == 2 && (
                  <>
                    <div className="flex flex-row justify-between items-center w-[96%] gap-3">
                      <>
                      {
                        re2=="true" ?<Tooltip open={re2=="true"}  placement='bottom'
                        arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Let's “Research”! Type the Cornell method of note-taking. You can type in any question or topic you’d like to learn more about</p>
                         {/* <ArrowBackIcon className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
                       setre2("false")
                       setre("true")
                       setSideMenu(false)
                     }}/> */}
                     {/* <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
                       setre2("false")
                       setai1("true")
                     }}/> */}
                             </div>}
                          componentsProps={{
                            tooltip: {
                              sx: {
                                bgcolor: '#0E0E2C',
                                '& .MuiTooltip-arrow': {
                                  color: '#0E0E2C',
                                },
                              },
                            },
                          }}
                          >
                                 <input
                                   className="pulse bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[40px] text-center w-full scrollbar-hide"
                                   rows={2}
                                   value={researchText}
                                   onChange={(e) => { 
                                    setResearchText(e.target.value)
                                    setre2("false")
                                    setai1("true")
                                  }}
                                   onKeyDown={(e) => e.key === "Enter" && research()}
                                   placeholder="Write Text Here"
                                 />
                           </Tooltip> :
                      <input
                        className=" bg-blue-50 rounded-lg outline-none focus:outline-4 focus:outline-blue-400 border-blue-400 h-[40px] text-center w-full scrollbar-hide"
                        rows={2}
                        value={researchText}
                        onChange={(e) => setResearchText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && research()}
                        placeholder="Write Text Here"
                      />
                      }
                      </>
                      <button
                        className="h-[43px] flex flex-row justify-center items-center bg-blue-500 px-4 gap-2 rounded-[8px] hover:bg-blue-700 text-[16px] border-2 font-[700] leading-[19px] text-[#f9f9f9] outline-none
                focus:outline-4 focus:outline-[#31D0AA] mb-2"
                        onClick={() => {
                          research()
                          
                          }}
                      >
                        <Search color="light"/>
                      </button>
                    </div>
                    {researchText.length > 1 && sources.length > 0 ? (
                      <div className="flex flex-col justify-center items-center w-full">
                       
                        <textarea
                          className="bg-blue-50 rounded-lg border-blue-400 h-[350px] mb-2 text-center pt-5 w-[96%]  scrollbar-hide outline-none"
                          rows={2}
                          value={researchResponse}
                          placeholder="Enter Text Here"
                        ></textarea>
                 
                        <button
                          className="h-[40px] flex flex-row justify-center items-center px-4 gap-2 rounded-[8px] 
                          hover:bg-[#EFEFFD] text-[16px] border-2 font-[700] leading-[19px] text-[#428CFB] outline-none
                          focus:outline-4 focus:outline-[#31D0AA] "
                          onClick={() =>
                            navigator.clipboard.writeText(researchResponse)
                          }
                        >
                          COPY TEXT
                        </button>
                        <div className="flex justify-evenly px-4 flex-wrap my-3 items-center w-full gap-2">
                          {researchText.length > 1 &&
                            sources.slice(0, more).map((source, id) => (
                              <a href={source} target="_blank" className="hover:bg-[#428CFB]">
                                <button
                                  className="h-[48px] flex flex-row justify-center items-center
                                px-4 gap-2 !w-auto  text-[16px] border-2 font-[700] leading-[19px]
                                text-gray-500 outline-none focus:outline-4 focus:outline-[#31D0AA]  rounded-full hover:bg-white"
                                  onClick={() => {
                                    summarise(SummeriseText);
                                    setSideMenu(false);
                                  }}
                                  key={id}
                                >
                                  {id + 1}
                                  <div class="border-r h-6 border-gray-500 border-1"></div>
                                  <img
                                    src={
                                      "https://" +
                                      source.split("/")[2] +
                                      "/favicon.ico"
                                    }
                                    height="25"
                                    width="25"
                                    alt="favicon"
                                  />
                                  <span>{source.split(".")[1]}</span>
                                </button>
                              </a>
                            ))}
                          {more <= 3 ? (
                            <button onClick={() => setMore(sources.length)}>
                              Show More
                            </button>
                          ) : (
                            <button onClick={() => setMore(3)}>
                              Show Less
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                      {
                        loading ?  <Loading /> : null
                      }
                      </>
                     
                      // <div className="w-full mt-20">
                      //   <Skeleton className="!w-full" />
                      //   <Skeleton className="!w-full" />
                      //   <Skeleton className="!w-full" />
                      // </div>
                    )}
                  </>
                )}
              </div>
              </div>
              </div>
              </div>
             <>
             {
              !showprogressbar ?<div className="mt-2 ml-11 mr-11 mb-3 ">
              <div class="flex justify-between mb-1">
  <span class="text-base font-medium text-blue-500 cursor-pointer" onClick={()=>{
            let path = `/dashboard/subscriptions`;
            navigate(path);
          }}>Upgrade &rarr;</span>
  <span class="text-sm font-medium text-blue-500 ">{user.credits_left}</span>
</div>
<div class="w-full bg-gray-200 rounded-full h-2.5">
  <div class="bg-blue-500 h-2.5 rounded-full" style={{ width:"50%" }}></div>
</div>
             </div> : null
             }
             </>
              <div className="flex justify-start absolute top-0 right-0 mt-5 mr-11">
                <>
                {
                  ai1=="true" ?<Tooltip open={ai1=="true"}  placement='bottom' 
                  arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>You can see the plagiarism score here, which analyses if any part of your text has already been published or not. It's all about boosting your writing. ✌️</p>
                  {/* <ArrowBackIcon className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
                 setre2("true")
                 setai1("false")
               }}/> */}
               {/* <ArrowForwardIcon className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
                 setSideMenu(false)
                 setai1("false")
                 setft("true")
               }}/> */}
                  
                  </div>}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: '#0E0E2C',
                          '& .MuiTooltip-arrow': {
                            color: '#0E0E2C',
                          },
                        },
                      },
                    }}
                    >
                   <button
                       aria-label="add"
                       size="medium"
                       className="pulse  !rounded-full lg:px-3 bg-green-900 hover:bg-green-700 text-white w-auto flex flex-row px-[1px] py-2"
                       onClick={() => {
                        detectAI()
                        setSideMenu(false)
                 setai1("false")
                 setft("true")
                       }
                      }
                     >
                       <span className=" lg:block !lg:px-2 " style={{ fontFamily: "Work Sans" }}>Originality&nbsp;Score</span>{""}
                       &nbsp;
                       <span className="font-bold">{score}%</span>{""}
                       <Refresh className={`${loading1 && "animate-spin"} `} />
                     </button>
                     </Tooltip> :
                <Tooltip title="Check if your article is written by AI" arrow>
              <button
                  aria-label="add"
                  size="medium"
                  className="!shadow-none !rounded-full lg:px-3 bg-green-900 hover:bg-green-700 text-white w-auto flex flex-row px-[1px] py-2"
                  onClick={() => detectAI()}
                >
                  <span className=" lg:block !lg:px-2 " style={{ fontFamily: "Work Sans" }}>Originality&nbsp;Score</span>{""}
                  &nbsp;
                  <span className="font-bold">{score}%</span>{""}
                  <Refresh className={`${loading1 && "animate-spin"} `} />
                </button>
                </Tooltip>
                }
                </>
              
                </div>
                
        </Drawer>
      </div>
      <div
        id="editorNotes"
        className="w-[100%] !h-[100%] overflow-y-scroll scrollbar-hide"
      >
        <BlockNoteView editor={editor} />
        <div className={`w-full flex justify-center ${loading ? "" : "hidden"}`}>
        <>
                      {
                        loading ?  <Loading /> : null
                      }
                      </>
          {/* <Skeleton className="h-10 w-2/3 my-4" />
          <Skeleton className="h-10 w-1/2 my-4" />
          <Skeleton className="h-10 w-5/6 my-4" /> */}
        </div>
        <div id="bottom" className="pt-20 " />
      </div>
      <div
        className="lg:hidden noprint"
        style={{ position: "fixed", bottom: 0 }}
      >
        <BottomNavigation  showLabels value={"chat"}>
          <BottomNavigationAction
            className="!text-blue"
            label="Research"
            icon={ <>
              {
                re=="true"?<Tooltip open={re=="true" && window.innerWidth<1024}   placement='bottom' 
                arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Explore further information by pressing the ‘Research’ button here! 😋</p>
                 
                </div>}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#0E0E2C',
                        '& .MuiTooltip-arrow': {
                          color: '#0E0E2C',
                        },
                      },
                    },
                  }}
                  ><Science onClick={() => {
                    setSideMenu(true)
                    setre("false") 
                              setre2("true")
                              
            }} className="pulse" color="primary" /></Tooltip> :<Science onClick={() => {
              setSideMenu(true)    
      }} color="primary" />}</> }
          />
          <BottomNavigationAction
            label="Share"
            icon={ <>
              {
                sar=="true"?<Tooltip open={sar=="true" && window.innerWidth<1024}   placement='bottom'
                arrow title={<div className=" rounded-lg"><p className="text-white  text-base" style={{ fontFamily: "Work Sans" }}>Awesome! You’re almost finished with your note journey! </p>
                <p className="text-white text-base mt-2 max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}> 
      Why not share this with someone? Don't worry, you can manage who can edit or view it! You can even publish it within the Gyani community! After all, sharing is a form of caring!
      😍</p>
                </div>}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#0E0E2C',
                        '& .MuiTooltip-arrow': {
                          color: '#0E0E2C',
                        },
                      },
                    },
                  }}
                  ><Share className="pulse"  onClick={() =>  {
                    shareDialog.push(Notesuuid)
                    setsar("false")
                    setsav("true")
                  }}/></Tooltip> :<Share  onClick={() =>  shareDialog.push(Notesuuid)}/> }</>}
          />
          <BottomNavigationAction
            onClick={() => printNotes()}
            label="Print"
            icon={<Print />}
          />
          <BottomNavigationAction label={timerStart ? convertStoMs(parseInt(time / 1000)) : "Timer"} icon= {timerStart ? (
                         
                            <Stop color="info" onClick={() => handleTimerStop()}/>
                    
                        ) : (
                          <>
                    {
                      timerd=="true" ?<Tooltip open={timerd=="true" && window.innerWidth<1024}  placement='bottom' 
                      arrow title={<div className=" rounded-lg"><p className="m-2 text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Let's start the timer! Then you can keep track of your writing time. ⏱️</p>
                      </div>}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#0E0E2C',
                              '& .MuiTooltip-arrow': {
                                color: '#0E0E2C',
                              },
                            },
                          },
                        }}
                        >
                            <Timer color="info" className="pulse" onClick={() => {
                              handleTimerStart()
                              settimerd("false")
                                       setcompletiond("true")
                            }}/>
                          </Tooltip> :<Timer color="info" onClick={() => {
                              handleTimerStart()
                            }}/> }</>
                        )}/>
          <BottomNavigationAction
            label="Save"
            icon={ <>
              {
                sav=="true" ? <Tooltip open={sav=="true" && window.innerWidth<1024}  placement='bottom'
                arrow title={<div className="rounded-lg">
                  <p className="text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Woohoo! You've just made your debut note!</p>
                <p className="text-white text-base text-center max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>🙌</p>
                <p className="text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Make sure to save it so you don't lose it!</p>
                </div>}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: '#0E0E2C',
                        '& .MuiTooltip-arrow': {
                          color: '#0E0E2C',
                        },
                      },
                    },
                  }}
                  ><Save className="pulse" color="secondary" onClick={() => {
                    saveText()
                    setsav("false")
                       localStorage.setItem("first_time_user", "false");
                  }}/></Tooltip> : <Save color="secondary" onClick={() => saveText()} /> }</>}
          />
        </BottomNavigation>
      </div>
      <Dialog
        open={generateDialog}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => setGenerateDialog(!generateDialog)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Generate some text data by entering the commands."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <input
              type="text"
              placeholder="Write your command!"
              value={generateInput}
              rows={1}
              onKeyUp={(e) =>
                e.key === "Enter" && generate() && setGenerateDialog(false)
              }
              onChange={(e) =>{
                setGenerateInput(e.target.value)
                setgendone(localStorage.getItem("first_time_user"))
              }}
              className="lg:w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 scrollbar-hide"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Tooltip open={gendone=="true"}   placement='right'
             arrow title={<div className=" rounded-lg"><p className=" text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Good job! You have created your first draft 🎉</p>
             <span class="relative -left-4 -bottom-4 flex h-12 w-12">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-700 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-12 w-12 bg-blue-700"><AutoFixHighIcon onClick={()=>{
            setgendone("false")
          }} className="m-1 cursor-pointer" fontSize="large"/></span>
</span>
             </div>}
               componentsProps={{
                 tooltip: {
                   sx: {
                     bgcolor: '#0E0E2C',
                     '& .MuiTooltip-arrow': {
                       color: '#0E0E2C',
                     },
                   },
                 },
               }}
               >
          <Button
            variant="contained"
            onClick={() => {
              generate();
              setGenerateDialog(false);
              setgendone("false")
            }}
          >
            Generate
          </Button>
          </Tooltip>
          <Button onClick={() => setGenerateDialog(!generateDialog)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={ft=="true"}
        keepMounted
        onClose={() => {
          setft("false")
        }}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "black",
            borderRadius:10
          },
        }}
      >
        <DialogContent className=" rounded-lg">
          <p className="text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Congrats! You've reached a cool milestone by creating your content!
          🤲</p>
          {/* <ArrowBackIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
                    setai1("true")
                    setSideMenu(true)
                    setft("false")
          }}/> */}
          <ArrowForwardIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
                    setparad("true");
                    setft("false")
          }}/>
          
        </DialogContent>
      </Dialog>
      <Dialog
        open={parad=="true"}
        keepMounted
        onClose={() => {
          setparad("false") 
        }}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "black",
            borderRadius:10
          },
        }}
      >
        <DialogContent className=" rounded-lg">
          <p className="text-white text-base max-[750px]:text-xs" style={{ fontFamily: "Work Sans" }}>Do you wish to continue the tutorial? Explore more to see how Gyani could assist you in becoming a better writer! 😤
          </p>
          {/* <ArrowBackIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-16 cursor-pointer" fontSize="large" onClick={()=>{
                    setparad("false")
                    setft("true")
          }}/> */}
          <ArrowForwardIcon sx= {
                      {
                       color: 'white',
                     }
                   } className="ml-2 cursor-pointer" fontSize="large" onClick={()=>{
                    setparad("false")
                    setgs("true")
          }}/>
          
        </DialogContent>
      </Dialog>
    
      <Dialog
        open={generateDialog1}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => setGenerateDialog1(!generateDialog1)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Research some text data by entering the Text."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <input
              type="text"
              placeholder="Write your Text!"
              value={researchText}
              rows={1}
              onKeyUp={(e) =>
                e.key === "Enter" && research() && setGenerateDialog1(false)
              }
              onChange={(e) => setResearchText(e.target.value)}
              className="lg:w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 scrollbar-hide"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              research(researchText);
              setGenerateDialog1(false);
            }}
          >
            Search
          </Button>
          <Button onClick={() => setGenerateDialog1(!generateDialog1)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={open}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          severity={`${
            open === "Title Must be more than 3 characters !"
              ? "error"
              : "success"
          }`}
          sx={{
            backgroundColor:
              open === "Title Must be more than 3 characters !"
                ? "red"
                : "lightGreen",
          }}
        >
          {open}
        </Alert>
      </Snackbar>
    </div>
  );
}