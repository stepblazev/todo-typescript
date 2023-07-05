import { ITopic } from './ITopic';

export interface ITodoStore {
	topics: ITopic[];
	// ------------------------------
	getSearched: (search: string, marked: boolean) => ITopic[];
	addTopic: (title: string) => ITopic[];
	deleteTopic: (id: number) => ITopic[];
	deleteAll: () => void;
	hideAll: () => void;
}
