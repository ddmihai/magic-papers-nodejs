"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const winston_1 = __importDefault(require("winston"));
const app_helpers_1 = require("./app.helpers");
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const genre_routes_1 = __importDefault(require("./src/routes/genre.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = require("./src/swagger/swagger");
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
// express JSON and cors
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// setting up express session
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: process.env.ENC_KEY,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: {
        maxAge: 3600000,
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none'
    }
}));
// Public directory and expres handlebars config
// Express handlebars
app.engine('handlebars', (0, express_handlebars_1.engine)({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, 'src', 'views', 'layouts'),
    partialsDir: path_1.default.join(__dirname, 'src', 'views', 'partials')
}));
// public folder
app.set('view engine', 'handlebars');
app.set('views', path_1.default.join(__dirname, 'src', 'views'));
app.use(express_1.default.static('public'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'src', 'public')));
// Setup winston
exports.logger = winston_1.default.createLogger(app_helpers_1.loggerObj);
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
;
app.use((req, res, next) => {
    exports.logger.info(`${req.method} ${req.url}`);
    next();
});
// Home route and documentation
app.get("/", (req, res) => res.send("Hello, World!"));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Routes usiages
app.use("/users", user_routes_1.default);
app.use("/genres", genre_routes_1.default);
// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));
// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        name: err.name,
        stack: err.stack
    });
});
exports.default = app;
