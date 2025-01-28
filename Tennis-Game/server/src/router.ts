import express from "express";
import calculateScore from "./services/calculateScore";
import type { storedPointsProps } from "./types/points/storedPoints";

const router = express.Router();

let storedPoints: storedPointsProps = {} as storedPointsProps;

router.post("/api/score", (req, res) => {
	const { points, player1Name, player2Name } = req.body;

	if (!points) {
		res.status(400).json({
			error: "Erreur, les points sont obligatoires",
		});
	}

	storedPoints = points;

	const result = calculateScore(points, player1Name, player2Name);

	res.json({
		receivedPoints: storedPoints,
		result: {
			...result,
		},
	});
});

router.get("/api/score", (req, res) => {
	if (Object.keys(storedPoints).length === 0) {
		res.status(404).json({ error: "Aucun score disponible" });
	}

	res.json({ storedPoints });
});

export default router;
