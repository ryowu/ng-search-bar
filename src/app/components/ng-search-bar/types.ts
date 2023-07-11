export enum SearchFieldType {
	number = 'number',
	string = 'string',
}

export type SearchField = {
	name: string;
	type: SearchFieldType;
};

export type SearchConfig = {
	fields: SearchField[];
};
