import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from 'helmet';
import userRouter from "./src/routes/user.routes";
import winston from 'winston';
import { loggerObj } from './app.helpers';
import { engine } from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import genreRouter from "./src/routes/genre.routes";
import dotenv from 'dotenv';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './src/swagger/swagger';
const swaggerDocs = swaggerJsdoc(swaggerOptions);




// express JSON and cors
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());



// setting up express session
app.set('trust proxy', 1);

app.use(session({
    secret: process.env.ENC_KEY as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: {
        maxAge: 3600000,
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none'
    }
}));




// Public directory and expres handlebars config
// Express handlebars
app.engine('handlebars', engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}));
// public folder
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'src', 'public')));







// Setup winston
export const logger = winston.createLogger(loggerObj);

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
};

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});




// Home route and documentation
app.get("/", (req, res) => res.send("Hello, World!"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Routes usiages
app.use("/users", userRouter);
app.use("/genres", genreRouter);


// 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));


// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message,
        name: err.name,
        stack: err.stack
    });
});


export default app;