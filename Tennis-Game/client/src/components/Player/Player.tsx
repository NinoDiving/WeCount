import type { PlayerProps } from "../../types/Player";
import "./Player.css";
export default function Player({
	handleChangePlayer1,
	handleChangePlayer2,
	player1,
	player2,
}: PlayerProps) {
	return (
		<main className="player-container">
			<div>
				<label htmlFor="player1">Nom du Joueur 1 :</label>
				<input
					type="text"
					name="name"
					id="player1"
					value={player1.name}
					onChange={handleChangePlayer1}
				/>
				<label htmlFor="level-player1">
					Choisissez le niveau de {player1.name || "Joueur 1"}
				</label>
				<input
					type="range"
					name="level"
					id="level-player1"
					onChange={handleChangePlayer1}
					value={player1.level}
					min={0}
					max={10}
				/>
				<p>
					Niveau de {player1.name || "Joueur 1"} : {player1.level}
				</p>
			</div>

			<div>
				<label htmlFor="player2">Nom du Joueur 2 :</label>
				<input
					type="text"
					name="name"
					id="player2"
					value={player2.name}
					onChange={handleChangePlayer2}
				/>
				<label htmlFor="level-player2">
					Choisissez le niveau de {player2.name || "Joueur 2"}
				</label>
				<input
					type="range"
					name="level"
					id="level-player2"
					onChange={handleChangePlayer2}
					value={player2.level}
					min={0}
					max={10}
				/>
				<p>
					Niveau de {player2.name || "Joueur 2"} : {player2.level}
				</p>
			</div>
		</main>
	);
}
