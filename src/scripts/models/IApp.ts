import { Topic } from '../modules/Topic';

export interface IApp {
	_container: HTMLDivElement;
	_addButton: HTMLButtonElement;
	_deleteButton: HTMLButtonElement;
	_searchInput: HTMLInputElement;
	_markedCheck: HTMLInputElement;
	_nothingLabel: HTMLElement;

	topics: Topic[];
}
