import { Router } from "express";
import { getAllUsers, getUserById, signUp } from "../services/userService";

export const router = Router();

router.post("/", async (req, res) => {
  try {
    const id = await signUp(req.body.name, req.body.socketId);
    res.send({ id });
  } catch (err) {
    res.status(409).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.send(user);
});

router.get("", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
})