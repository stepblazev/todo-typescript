import { IApp } from '../models/IApp';
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

	public topics: Topic[] = [];

	constructor() {
		this.initEvents();
		this.renderTopics(this.getFiltered());
	}

	private getFiltered(): Topic[] {
		const search: string = this._searchInput.value;
		const marked: boolean = this._markedCheck.checked;
		const filteredTopics = this.topics.filter(
			(topic) =>
				topic.title.toLowerCase().includes(search.toLowerCase()) &&
				(marked ? topic.Marked === true : true)
		);
		return filteredTopics;
	}

	private initEvents() {
		this._addButton.addEventListener('click', () => {
			const title: string | null = prompt('New topic title:');
			if (!title) return;

			const exists: Topic | undefined = this.topics.find(
				(topic) => topic.title.toLowerCase() === title.toLowerCase()
			);
			if (exists) return alert('Topic with the same name already exists');

			const newTopic = new Topic(title);
			this.topics.unshift(newTopic);
			this.renderTopics(this.getFiltered());
		});
		this._deleteButton.addEventListener('click', () => {
			if (!confirm('Clear the topic list?')) return;
			this.topics = [];
			this.renderTopics([]);
		});

		this._searchInput.addEventListener('input', () => {
			this.renderTopics(this.getFiltered());
		});
		this._markedCheck.addEventListener('change', () => {
			this.renderTopics(this.getFiltered());
		});
	}

	private renderTopics(topics: Topic[]) {
		this._container.innerHTML = '';
		this.checkLength(topics);

		topics.forEach((topic, index) => {
			topic._root.querySelector('.topic__mark')?.addEventListener('click', () => {
				this.renderTopics(this.getFiltered());
			});

			topic._root.querySelector('.topic__edit')?.addEventListener('click', () => {
				if (!confirm(`Delete topic "${topic.title}"?`)) return;
				topic._root.remove();
				this.topics.splice(index, 1);
			});

			topic._root.querySelector('.topic__show-more')?.addEventListener('click', () => {
				this.topics.forEach((subTopic, subIndex) => {
					if (index === subIndex) return;
					subTopic.Opened = false;
				});
			});

			this._container.append(topic._root);
		});
	}

	private checkLength(topics: Topic[]) {
		if (!topics?.length) {
			return this._nothingLabel.classList.add('nothing_show');
		} else {
			this._nothingLabel.classList.remove('nothing_show');
		}
	}
}
