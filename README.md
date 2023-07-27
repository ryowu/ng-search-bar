# ng-search-bar
Angular component that generates input UI for filtering data with JSON output

### [Live Demo hosted in github page](https://ryowu.github.io/ng-search-bar/)

# Overview
![image](https://github.com/ryowu/ng-search-bar/assets/4537570/3456f31a-3aab-4344-93d3-771d0c7f0c98)

# Usage:
Put below html in your target page template

```html
<ng-search-bar [config]="config" (onFilterChanged)="onFilterChanged($event)"></ng-search-bar>
```

Put below code in the page component class

```typescript
public config: SearchConfig = {
	autoRefresh: true,
	fields: [
		{
			name: 'name',
			type: SearchFieldType.String,
			isCaseSensitive: false,
		},
		{
			name: 'age',
			type: SearchFieldType.Number,
			min: 1,
			max: 120,
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

![image](https://github.com/ryowu/ng-search-bar/assets/4537570/32eec526-f0ae-43ca-ab12-675c2c802dc1)

Search Criteria JSON output:

```json
{
   "name":{
      "includes":"John"
   },
   "age":{
      "largeThanOrEqualTo":16,
      "lessThanOrEqualTo":62
   },
   "department":{
      "includesSensitive":"IT"
   },
   "isActive":{
      "equalTo":true
   }
}
```

More features coming!
In-progress...
