import { ITask } from './ITask';

export interface ITopic {
	// _root: HTMLElement;
	// ------------------------------
	id: number;
	title: string;
	marked: boolean;
	opened: boolean;
	tasks: ITask[];
	// ------------------------------
	open: () => void;
	hide: () => void;
	setMarked: (marked: boolean) => void;
	addTask: (name: string) => ITask[];
	deleteTask: (order: number) => ITask[];
	decreaseTaskOrder: (task: ITask) => ITask[];
	rename: (newName: string) => void;
}
