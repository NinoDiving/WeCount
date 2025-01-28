import type React from "react";
import { useState } from "react";
import type { GameState } from "../../types/Game";
import type { Player } from "../../types/Player";

export default function useGame() {
	const [player1, setPlayer1] = useState<Player>({ name: "Joueur1", level: 5 });
	const [player2, setPlayer2] = useState<Player>({ name: "Joueur2", level: 5 });
	const [points, setPoints] = useState<string[]>([]);
	const [gameState, setGameState] = useState<GameState>({
		sets: [
			[0, 0, 0],
			[0, 0, 0],
		],
		currentGame: ["0", "0"],
		winner: null,
	});

	const handleChangePlayer1 = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPlayer1((prev) => ({
			...prev,
			[name === "name" ? "name" : "level"]:
				name === "name" ? value : Number(value),
		}));
	};

	const handleChangePlayer2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPlayer2((prev) => ({
			...prev,
			[name === "name" ? "name" : "level"]:
				name === "name" ? value : Number(value),
		}));
	};
	const generatePoint = () => {
		const p1Level = player1.level;
		const p2Level = player2.level;

		const newPoints = [];
		const player1Name = player1.name || "Joueur1";
		const player2Name = player2.name || "Joueur2";

		const totalLevel = p1Level + p2Level;

		const player1Probability = p1Level / totalLevel;

		for (let i = 0; i < 150; i++) {
			const randomValue = Math.random();
			const winner =
				randomValue <= player1Probability ? player1Name : player2Name;
			newPoints.push(`Point ${i + 1} : remporté par ${winner}`);
		}

		setPoints(newPoints);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/score`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						points,
						player1Name: player1.name,
						player2Name: player2.name,
					}),
				},
			);

			if (!response.ok) {
				throw new Error(
					`Erreur lors de l'envoi des données: ${response.status}`,
				);
			}

			const data = await response.json();
			setGameState({
				sets: data.result.sets,
				currentGame: data.result.currentGame,
				winner: data.result.winner === "none" ? null : data.result.winner,
			});
		} catch (error) {
			console.error("Erreur lors de la soumission du formulaire :", error);
		}
	};

	return {
		handleSubmit,
		generatePoint,
		handleChangePlayer1,
		handleChangePlayer2,
		player1,
		player2,
		points,
		gameState,
	};
}
