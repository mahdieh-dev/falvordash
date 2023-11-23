export interface IFormConstraints {
	presence?: { message: string };
	format?: {
		pattern: string;
		message: string;
	};
	length?: {
		minimum?: number;
		maximum?: number;
		message: string;
	};
}
