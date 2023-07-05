import { ITodoStore } from '../models/ITodoStore';
import { Topic } from './Topic';

export class TodoStore implements ITodoStore {
	public topics: Topic[] = [];

	public getSearched(search: string, marked: boolean) {
		const searchResult = this.topics.filter(
			(topic) =>
				topic.title.toLowerCase().includes(search.toLowerCase()) &&
				(marked ? topic.Marked === true : true)
		);
		return searchResult;
	}

	public addTopic(title: string) {
		const newTopic: Topic = new Topic(title);
		// newTopic._root.style.zIndex = `${100 + this.topics.length}`;
		this.topics.push(newTopic);
		return newTopic._root;
	}

	public deleteAll() {
		this.topics = [];
	}

	public hideAll() {
		this.topics.forEach((topic) => {
			topic.Opened = false;
		});
	}
}
