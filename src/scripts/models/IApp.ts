import { ITodoStore } from './ITodoStore';
import { ITopic } from './ITopic';

export interface IApp {
	// ------------------------------
	_container: HTMLDivElement;
	_addButton: HTMLButtonElement;
	_deleteButton: HTMLButtonElement;
	_searchInput: HTMLInputElement;
	_markedCheck: HTMLInputElement;
	_nothingLabel: HTMLElement;
	// ------------------------------
	Todo: ITodoStore;
	// ------------------------------
	initEvents: () => void;
	renderTopics: (topics: ITopic[]) => void;
	renderTasks: (topic: ITopic) => void;
}
