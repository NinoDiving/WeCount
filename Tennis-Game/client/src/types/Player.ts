export type PlayerProps = {
	handleChangePlayer1: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleChangePlayer2: (e: React.ChangeEvent<HTMLInputElement>) => void;
	player1: { name: string; level: number };
	player2: { name: string; level: number };
};

export type Player = {
	name: string;
	level: number;
};
