# ng-search-bar
Angular component that generates input UI for filtering data with JSON output

# Usage:
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

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/300dafce-2e2f-4a27-a082-571cd7b3a392)

Search Criteria JSON output:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/476f41b4-5d36-468c-bbfa-5aeff9ab2c33)

More features coming!
In-progress...
