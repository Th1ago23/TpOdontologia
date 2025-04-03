import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { AppointmentController } from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Rotas de autenticação
router.post("/register", async (req, res, next) => {
  try {
    await AuthController.register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await AuthController.login(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/users", authMiddleware, async (req, res, next) => {
  try {
    await UserController.getUsers(req, res);
  } catch (error) {
    next(error);
  }
});
  
  router.get("/users/:id", authMiddleware, (req, res, next) => {
    UserController.getUserById(req, res).catch(next);
  });
  
  // Rotas de agendamentos
  router.post("/appointments", authMiddleware, (req, res, next) => {
    AppointmentController.createAppointment(req, res).catch(next);
  });
  
  router.get("/appointments", authMiddleware, (req, res, next) => {
    AppointmentController.getAppointments(req, res).catch(next);
  });
  
  router.put("/appointments/:id", authMiddleware, (req, res, next) => {
    AppointmentController.updateAppointmentStatus(req, res).catch(next);
  });

export default router;
