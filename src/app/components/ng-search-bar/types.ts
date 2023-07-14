export enum SearchFieldType {
	Number = 'number',
	String = 'string',
	Boolean = 'boolean',
}

export interface SearchField {
	name: string;
	caption?: string;
	type: SearchFieldType;
	css?: {
		buttonChip?: {
			dirty: string;
			default: string;
		};
	};
}

export interface NumberSearchField extends SearchField {
	min: number;
}

export interface TextSearchField extends SearchField {
	textValue?: string;
	isCaseSensitive: boolean;
	maxLength?: number;
}

export interface BooleanSearchField extends SearchField {
	checked: boolean;
}

export interface SearchConfig {
	autoRefresh?: boolean;
	autoRefreshDebounceTime?: number;
	fields: (TextSearchField | NumberSearchField | BooleanSearchField)[];
}
