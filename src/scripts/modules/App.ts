import { IApp } from '../models/IApp';
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
			const topicList = this.Todo.addTopic(title);
			this.renderTopics(topicList);
		});
		this._deleteButton.addEventListener('click', () => {
			if (confirm('Clear the topic list?')) this.Todo.deleteAll();
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
	}

	renderTopics(topics: Topic[]) {
		if (topics?.length === 0) {
			this._container.innerHTML = '';
			this._nothingLabel.classList.add('nothing_show');
			return;
		} else {
			this._nothingLabel.classList.remove('nothing_show');
		}
		for (let i = 0; i < topics.length; i++) {
			console.log(topics[i]);
			this.renderTasks(topics[i]);
		}
	}

	renderTasks(topic: Topic) {
		const { tasks } = topic;
		for (let j = 0; j < tasks.length; j++) {
			console.log(tasks[j]);
		}
	}
}
