type ScoreResult = {
	winner: string;
	sets: number[][];
	currentGame: string[];
};

export default function calculateScore(
	points: string[],
	player1Name: string,
	player2Name: string,
): ScoreResult {
	const player1 = { name: player1Name, sets: [0, 0, 0], currentGame: 0 };
	const player2 = { name: player2Name, sets: [0, 0, 0], currentGame: 0 };
	let currentSet = 0;

	function getGameScore(points: number): string {
		switch (points) {
			case 0:
				return "0";
			case 1:
				return "15";
			case 2:
				return "30";
			case 3:
				return "40";
			default:
				return "AV";
		}
	}

	for (const point of points) {
		if (currentSet >= 3) break;

		const winner = point.includes(player1Name) ? player1 : player2;
		const loser = winner === player1 ? player2 : player1;

		winner.currentGame++;

		if (
			winner.currentGame >= 4 &&
			winner.currentGame - loser.currentGame >= 2
		) {
			winner.sets[currentSet]++;
			winner.currentGame = 0;
			loser.currentGame = 0;

			if (
				winner.sets[currentSet] >= 6 &&
				winner.sets[currentSet] - loser.sets[currentSet] >= 2
			) {
				currentSet++;
			}
		}
	}

	return {
		winner:
			currentSet >= 3
				? player1.sets.filter((set) => set >= 6).length > 1
					? player1Name
					: player2Name
				: "none",
		sets: [player1.sets, player2.sets],
		currentGame: [
			getGameScore(player1.currentGame),
			getGameScore(player2.currentGame),
		],
	};
}
