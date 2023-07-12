# ng-search-bar
Angular component that generates input UI for filtering data with JSON output

# Let's see how to use:
Put below html in your target page template

```html
<app-ng-search-bar [config]="config"></app-ng-search-bar>
```

Put below code in the page component class

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

# That's it! Run your application and check the result

The ng-search-bar will generate the search controls as below:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/1617912d-0898-4977-8f8a-5e0116043250)


In-progress, stay tuned, lol
