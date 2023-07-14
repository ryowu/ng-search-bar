# ng-search-bar
Angular component that generates input UI for filtering data with JSON output

# Usage:
Put below html in your target page template

```html
<app-ng-search-bar [config]="config" (onFilterChanged)="onFilterChanged($event)"></app-ng-search-bar>
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
		{
			name: 'Enabled',
			type: SearchFieldType.Boolean,
			caption: 'Enabled',
			checked: true,
		},
	],
};
```

# That's it! Run your application and check the result

The ng-search-bar will generate the search controls as below:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/f4bb01ba-4e81-422d-801d-17e448085582)

Search Criteria JSON output:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/1daafa6e-9e96-4b47-95f5-0a1855a75088)

More features coming!
In-progress...
