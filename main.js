const path = require("path");
const url = require("url");
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
// const connectDB = require("./config/db");
// const CashMemo = require("./models/CashMemo");
const DataStore = require("nedb");

const cashMemoDb = new DataStore({
  filename: "E:/cash_memo_database/cash-memo.db",
  autoload: true,
});

// connectDB();

let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

const menu = [
  {
    label: "New",
    click: function () {
      mainWindow.webContents.send("menu", "new");
    },
  },
  {
    label: "Receipts",
    click: function () {
      mainWindow.webContents.send("menu", "receipts");
    },
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "selectall" },
    ],
  },
  {
    label: "Exit",
    click: function () {
      app.quit();
    },
    accelerator: "Alt + F4",
  },
  // uncomment it in developement
  // {
  //   label: "Developer",
  //   submenu: [{ role: "reload" }, { role: "toggledevtools" }],
  // },
];

function createMainWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    icon: `${__dirname}/assets/invoice-512.png`,
    minWidth: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.maximize();

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8081",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      // const {
      //   default: installExtension,
      //   REACT_DEVELOPER_TOOLS,
      // } = require("electron-devtools-installer");

      // installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
      //   console.log("Error loading React DevTools: ", err)
      // );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

//create memo
ipcMain.on("CashMemo:add", async (e, item) => {
  try {
    await cashMemoDb.insert(item);
  } catch (err) {
    console.log(err);
  }
});

//get memos

ipcMain.on("CashMemo:load", async () => {
  await cashMemoDb.find({}, (err, doc) => {
    if (doc) {
      mainWindow.webContents.send("CashMemo:get", JSON.stringify(doc));
    } else {
      console.log(err);
    }
  });
});

//get memo

ipcMain.on("CashMemo:load:id", async (e, id) => {
  const memo = await cashMemoDb.find({ _id: id }, (err, doc) => {
    if (doc) {
      mainWindow.webContents.send("CashMemo:get:id", JSON.stringify(doc));
    } else {
      console.log(err);
    }
  });
});

// get register numbers

// ipcMain.on("CashMemo:load:registerNumbers", async () => {
//   try {
//     const numbers = await cashMemoDb.find({});
//     mainWindow.webContents.send(
//       "CashMemo:get:registerNumbers",
//       JSON.stringify(numbers)
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });

app.on("ready", () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on("ready", () => (mainWindow = null));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
