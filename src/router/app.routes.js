import { Router } from "express";
import appCtrl  from '../controller/app.controller.js'

const appRouter = Router();

appRouter.post('/login',appCtrl.postLogin);
appRouter.post('/register', appCtrl.postRegister);
appRouter.get('/', appCtrl.getUsers);
appRouter.get('/:id', appCtrl.getUserById);
appRouter.put('/:id', appCtrl.updateUser);
appRouter.delete('/:id', appCtrl.deleteUser);

export default appRouter;