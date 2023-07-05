import { ITask } from './ITask';

export interface ITopic {
	_root: HTMLElement;

	id: number;
	title: string;
	tasks: ITask[];
	Opened: boolean;
	Marked: boolean;

	addTask: (name: string) => ITask[];
	deleteTask: (order: number) => ITask[];
	decreaseTaskOrder: (task: ITask) => ITask[];
}
