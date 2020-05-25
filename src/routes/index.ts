import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';
import SessionRouter from './session.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionRouter);

export default routes;
