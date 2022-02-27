import 'module-alias/register';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressSwaggerGenerator from 'express-swagger-generator';
import cmsRoutes from '@routes/cms';
import siteRoutes from '@routes/site';
import commonRoutes from '@routes/common';
import { systemConfig } from '@configs';
import socketIo from 'socket.io';
// import { sync } from "@models";
// import * as rolesService from "@services/roles";
// import * as usersService from "@services/users";

const app = express();
const expressSwagger = expressSwaggerGenerator(app);
let options = {
  swaggerDefinition: {
    info: {
      description: 'Provided by UETVitualEvent',
      title: 'UETVitualEvent API',
      version: '1.0.0',
    },
    host: systemConfig.FE_URL,
    basePath: '/api/v1',
    produces: ['application/json'],
    // schemes: ['http', 'https']
  },
  basedir: __dirname,
  files: ['./app/routes/**/*.js'],
};
expressSwagger(options);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const io = socketIo();
app.io  = io;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.systemConfig = systemConfig;

/*---------------------------------------
| Router
---------------------------------------*/
app.use(systemConfig.prefixApiSite, siteRoutes);
app.use(systemConfig.prefixApiCommon, commonRoutes(io));
app.use(systemConfig.prefixApiCms, cmsRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    code: 'UNKNOWN_ERROR',
  });
});
// sync().then(async () => {
//   await rolesService.initialRoles();
//   await usersService.initialUser();
// }).catch(err => console.error(err.stack));

export default app;
