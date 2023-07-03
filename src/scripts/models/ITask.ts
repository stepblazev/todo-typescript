export interface ITask {
	name: string;
	completed: boolean;
	order: number;
	// ------------------------------
	increaseOrder: () => void;
	decreaseOrder: () => void;
	setCompleted: (completed: boolean) => void;
}
