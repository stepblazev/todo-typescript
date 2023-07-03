import { ITodoStore } from './ITodoStore';
import { ITopic } from './ITopic';

export interface IApp {
	// ------------------------------
	_container: HTMLDivElement;
	_addButton: HTMLButtonElement;
	_searchInput: HTMLInputElement;
	_markedCheckbox: HTMLInputElement;
	// ------------------------------
	Todo: ITodoStore;
	// ------------------------------
	initEvents: () => void;
	render: () => void;
	renderTasks: (topic: ITopic) => void;
}
