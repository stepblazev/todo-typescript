import topicIcons from '../assets/topic-icons.json';
import { IApp } from '../models/IApp';
import { Task } from './Task';
import { TodoStore } from './TodoStore';
import { Topic } from './Topic';

export class App implements IApp {
	public _container: HTMLDivElement = document.getElementById('container') as HTMLDivElement;
	public _addButton: HTMLButtonElement = document.getElementById('add') as HTMLButtonElement;
	public _deleteButton: HTMLButtonElement = document.getElementById(
		'delete'
	) as HTMLButtonElement;
	public _searchInput: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
	public _markedCheck: HTMLInputElement = document.getElementById('marked') as HTMLInputElement;
	public _nothingLabel: HTMLElement = document.getElementById('nothing') as HTMLElement;

	public Todo: TodoStore = new TodoStore();

	constructor() {
		this.initEvents();
		// this.renderTopics(this.Todo.topics);
	}

	initEvents() {
		this._addButton.addEventListener('click', () => {
			const title: string | null = prompt('New topic title:');
			if (!title) return;
			const newTopic = this.Todo.addTopic(title);
			this._container.prepend(newTopic);
		});
		this._deleteButton.addEventListener('click', () => {
			if (!confirm('Clear the topic list?')) return;
			this.Todo.deleteAll();
			this.renderTopics([]);
		});

		const getFiltered = () => {
			const search: string = this._searchInput.value;
			const marked: boolean = this._markedCheck.checked;
			const topicList = this.Todo.getSearched(search, marked);
			this.renderTopics(topicList);
		};

		this._searchInput.addEventListener('input', getFiltered);
		this._markedCheck.addEventListener('change', getFiltered);
		this._container.addEventListener('load', getFiltered);
	}

	renderTopics(topics: Topic[]) {
		this._container.innerHTML = '';

		if (!topics?.length) {
			return this._nothingLabel.classList.add('nothing_show');
		} else {
			this._nothingLabel.classList.remove('nothing_show');
		}

		topics.forEach((topic) => this._container.append(topic._root));
	}
}
