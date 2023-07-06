export interface ITask {
	_root: HTMLElement;

	name: string;
	order: number;
	Completed: boolean;

	increaseOrder: () => void;
	decreaseOrder: () => void;
	setCompleted: (completed: boolean) => void;
}
