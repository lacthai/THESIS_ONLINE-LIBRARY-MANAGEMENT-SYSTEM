const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");
global.StatusCodes = require("http-status-codes").StatusCodes;

const io = require('socket.io')(8080, {
  cors: {
      origin: 'http://localhost:3002',
  }
});

const { ConnectDatabase } = require("./database/databaseConnector");
const messageRouter = require("./routes/messageRoute");
const conversationRouter = require("./routes/ConversationRoute");
const booksRouter = require("./routes/bookRoutes");
const bookCategoryRouter = require("./routes/bookCategoryRoutes");
const booksRouterLimitSkip = require("./routes/bookRoutesLimitSkip");
const booksRouterRecentBooks = require("./routes/booksRoutesRecentBooks");
const booksRouterFeaturedBooks = require("./routes/booksRoutesFeatured");
const requestBookRouter = require("./routes/requestBooksRoute");
const popularBooksRouter = require("./routes/popularBooksRoutes");
const bookChartRouter = require("./routes/bookChartRoute");
const bookPieChartRouter = require("./routes/bookPieChartRoute");
const mostUserRouter = require("./routes/mostUserRoute");
const userRouter = require("./routes/usersRoute");

const CheckBookReturnRouter = require("./routes/checkBookReturn");

const signUpRouter = require("./routes/signUpRoute");
const loginRouter = require("./routes/loginRoutes");
const logoutRouter = require("./routes/logoutRoute");
const forgotpasswordRouter = require("./routes/forgotpassword");

const filterRouter = require("./routes/filterRoutes");

const adminHomePageInfoRouter = require("./routes/adminHomePageInfoRoute");

const CustomError = require("./errorHandler/CustomError");
const PageNotFound = require("./errorHandler/PageNotFound");

// Allow CORS Policy
// app.use(cors())

// For recieiving httpOnly cookies
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());

// Parse Form data in JSON Format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// making uploads folder globally accessable through static routing
const path = require("path");
// const { cookie } = require('express/lib/response')
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
const verifyToken = require("./middleware/verifyToken");
const adminAuthorization = require("./middleware/adminAuth");

// ROUTES
app.use("/api/v1/signup", signUpRouter);
app.use("/api/v1/login", loginRouter);

app.use("/api/v1/logout", verifyToken, logoutRouter);
app.use("/api/v1/forgotpassword", forgotpasswordRouter);

// Filter Books
app.use("/api/v1/filter", filterRouter);

// ALL BOOKS CRUD (Dynamic Middleware Setup on API Endpoints)
app.use("/api/v1/books", booksRouter);

// Fetches all Categories of Books
app.use("/api/v1/book_category", bookCategoryRouter);

// Limit() and Skip() & Pagination
app.use("/api/v1/book", booksRouterLimitSkip);

app.use("/api/v1/recentBooks", booksRouterRecentBooks);
app.use("/api/v1/featuredBooks", booksRouterFeaturedBooks);
app.use("/api/v1/requestBooks", verifyToken, requestBookRouter);
app.use("/api/v1/popularBooks", popularBooksRouter);
app.use("/api/v1/mostBorrowed", bookChartRouter);
app.use("/api/v1/mostBorrowedCategories", bookPieChartRouter);
app.use("/api/v1/mostBorrowedUsers", mostUserRouter)
// User Routes
app.use("/api/v1/users", verifyToken, userRouter);

// handles if book not returned then automate CHARGES FINE
app.use("/api/v1/checkbookreturn", CheckBookReturnRouter);

// Admin Home page Infos
app.use(
  "/api/v1/adminHomePageInfo",
  verifyToken,
  adminAuthorization,
  adminHomePageInfoRouter
);

// Update Users Email - ADMIN
const UpdateUserEmailRouter = require("./routes/updateUserEmailRoute");
app.use(
  "/api/v1/updateUserEmail",
  verifyToken,
  adminAuthorization,
  UpdateUserEmailRouter
);

// Fetch Similar Books
const SimilarBooksRouter = require("./routes/similarBooksRouter");
app.use("/api/v1/similarBooks", SimilarBooksRouter);
 
// Fetch RECOMMENDED books
const recommendedBooksRouter = require("./routes/recommendBooksRouter");
app.use("/api/v1/recommendedBooks", verifyToken, recommendedBooksRouter);

//---------------- RECOMMENDATION ALGO TESTING --------------------------
const { algoTest } = require("./controller/bookRecommendationAlgorithm");
app.get("/api/algotest", algoTest);


// Chat Route

app.use("/api/v1/conversation",conversationRouter)
app.use("/api/v1/conversation/:userId",conversationRouter)


app.use("/api/v1/message",messageRouter)
app.use("/api/v1/message/:conversationId",messageRouter)
 



let users = [];
io.on('connection', socket => {
    console.log('User connected', socket.id);
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await Users.findById(senderId);
        console.log('sender :>> ', sender, receiver);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id, fullName: user.fullName, email: user.email }
            });
            }else {
                io.to(sender.socketId).emit('getMessage', {
                    senderId,
                    message,
                    conversationId,
                    receiverId,
                    user: { id: user._id, fullName: user.fullName, email: user.email }
                });
            }
        });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
    // io.emit('getUsers', socket.userId);
});

// Query Db
const QueryRouter = require("./utils/MongoDbQuery");


app.use("/api/v1/query", QueryRouter);

app.use(CustomError);
app.use(PageNotFound);

// Server
const port = process.env.CONNECTION_PORT || 3000;
const InitiateServer = async () => {
  try {
    await ConnectDatabase(process.env.CONNECTION_URL);
    console.log("Connected to Database Successfully");
    app.listen(port, () =>
      console.log(`server started at port ${port} . . . `)
    );
  } catch (error) {
    console.log("ERROR IN SERVER");
  }
};

InitiateServer();
