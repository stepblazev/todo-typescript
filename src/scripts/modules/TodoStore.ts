import { ITodoStore } from '../models/ITodoStore';
import { Topic } from './Topic';

export class TodoStore implements ITodoStore {
	public topics: Topic[] = [];

	constructor() {}

	public getSearched(search: string, marked: boolean) {
		const searchResult = this.topics.filter(
			(topic) =>
				topic.title.toLowerCase().includes(search.toLowerCase()) &&
				(marked ? topic.marked === true : true)
		);
		return searchResult;
	}

	public addTopic(title: string) {
		const newTopic: Topic = new Topic(title);
		this.topics = [newTopic, ...this.topics];
		return this.topics;
	}

	public deleteTopic(id: number) {
		this.topics = this.topics.filter((topic) => topic.id != id);
		return this.topics;
	}

	public hideAll() {
		this.topics.forEach((topic) => topic.hide());
	}

	public deleteAll() {
		this.topics = [];
	}
}
