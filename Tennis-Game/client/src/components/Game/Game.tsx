import useGame from "../../services/Hooks/useGame";
import GamePoint from "../GamePoint/GamePoint";
import Player from "../Player/Player";
import "./Game.css";

export default function Game() {
	const {
		handleSubmit,
		generatePoint,
		handleChangePlayer1,
		handleChangePlayer2,
		player1,
		player2,
		points,
		gameState,
	} = useGame();

	return (
		<main className="game_board">
			<form className="form-container" onSubmit={handleSubmit}>
				<Player
					handleChangePlayer1={handleChangePlayer1}
					handleChangePlayer2={handleChangePlayer2}
					player1={player1}
					player2={player2}
				/>
				<GamePoint generatePoint={generatePoint} points={points} />
				<button type="submit">Jouer la partie</button>
			</form>

			<table className="table_result">
				<caption>
					Résultat:{" "}
					{!gameState.winner
						? "Jeu en cours, pas de vainqueur"
						: `${gameState.winner} a remporté Rolland-Garos !`}
				</caption>
				<thead>
					<tr>
						<th>{null}</th>
						<th>Set1</th>
						<th>Set2</th>
						<th>Set3</th>
						<th>Current Game</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>{player1.name}</th>
						{gameState.sets[0].map((score, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<td key={index}>{score}</td>
						))}
						<td>{gameState.currentGame[0]}</td>
					</tr>
					<tr>
						<th>{player2.name}</th>
						{gameState.sets[1].map((score, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<td key={index}>{score}</td>
						))}
						<td>{gameState.currentGame[1]}</td>
					</tr>
				</tbody>
			</table>
		</main>
	);
}
