import { Task } from '../modules/Task';

export interface ITopic {
	_root: HTMLElement;
	title: string;
	Opened: boolean;
	Marked: boolean;
	tasks: Task[];
}
