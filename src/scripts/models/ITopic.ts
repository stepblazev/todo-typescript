import { ITask } from './ITask';

export interface ITopic {
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
	rename: (newName: string) => void;
}
