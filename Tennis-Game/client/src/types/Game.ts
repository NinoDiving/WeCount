export type GamePointProps = {
	generatePoint: () => void;
	points: string[];
};

export type GameState = {
	sets: number[][];
	currentGame: string[];
	winner: string | null;
};
