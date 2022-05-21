import { Router } from "express";
import { getTeamByUser } from "../repositories/teamRepository";
import { changeTeam, createTeam, getAllTeams, getTeamById, leaveTeam } from "../services/teamService";

export const router = Router();

router.post("/", async (req, res) => {
  const team = await createTeam(req.body);
  res.send(team.id);
});

router.get("/:id", async (req, res) => {
  const team = await getTeamById(req.params.id);
  res.send(team);
});

router.get("", async (req, res) => {
    const teams = await getAllTeams();
    res.send(teams);
  });

router.patch("", async (req, res) => {
    const {userId, teamId, roomId} = req.body;
    await changeTeam(userId, teamId, roomId);
    
    res.status(200).send();
});

router.get("/a/:id", async (req, res) => {
    const teams = await getTeamByUser(req.params.id)
    res.send(teams);
})