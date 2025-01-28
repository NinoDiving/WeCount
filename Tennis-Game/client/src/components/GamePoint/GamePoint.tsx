import type { GamePointProps } from "../../types/Game";

export default function GamePoint({ generatePoint, points }: GamePointProps) {
	return (
		<main className="gamePoint_container">
			{" "}
			<article>
				<button type="button" onClick={() => generatePoint()}>
					Générer les points
				</button>
				{points.length > 0 && (
					<aside>
						{points.map((point) => (
							<p key={point}>{`🎾 - ${point}`}</p>
						))}
					</aside>
				)}
			</article>
		</main>
	);
}
