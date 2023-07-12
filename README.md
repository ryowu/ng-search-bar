# ng-search-bar
Angular component that generates input UI for filtering data with JSON output

```typescript
public config: SearchConfig = {
	fields: [
		{
			name: 'Name',
			type: SearchFieldType.string,
			isCaseSensitive: false,
		},
		{
			name: 'Category',
			type: SearchFieldType.string,
			isCaseSensitive: true,
		},
		{
			name: 'Location',
			type: SearchFieldType.string,
			isCaseSensitive: false,
		},
	],
};
```

The ng-search-bar will generate the search controls as below:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/1617912d-0898-4977-8f8a-5e0116043250)

In-progress, stay tuned, lol
