# ng-search-bar
Angular component that generates input UI for filtering data with JSON output

# Overview
![image](https://github.com/ryowu/ng-search-bar/assets/4537570/2eae2dfb-bfe1-44e7-ac58-2afb6ed8a1dc)
![image](https://github.com/ryowu/ng-search-bar/assets/4537570/3456f31a-3aab-4344-93d3-771d0c7f0c98)

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
			name: 'name',
			type: SearchFieldType.String,
			isCaseSensitive: false,
		},
		{
			name: 'age',
			type: SearchFieldType.String,
			isCaseSensitive: true,
		},
		{
			name: 'department',
			type: SearchFieldType.String,
			isCaseSensitive: false,
		},
		{
			name: 'isActive',
			type: SearchFieldType.Boolean,
			caption: 'Is Active',
			checked: true,
		},
	],
};
```

# That's it! Run your application and check the result

The ng-search-bar will generate the search controls as below:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/de9f8f67-2dab-4d69-ba76-35192d5f765c)

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/eb4c3ab5-006f-462d-8e71-2e169cb4df29)

Search Criteria JSON output:

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/03fcc565-c862-484d-be91-09825ea96091)

More features coming!
In-progress...
