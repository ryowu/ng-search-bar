import { Component, Input, OnInit } from '@angular/core';

type User = {
	name: string;
	age: number;
	department: string;
	isActive: boolean;
};

@Component({
	selector: 'app-data-area',
	templateUrl: './data-area.component.html',
	styleUrls: ['./data-area.component.scss'],
})
export class DataAreaComponent implements OnInit {
	@Input() public set filterObject(value: any) {
		this.applyFilter(value);
	}

	private rawUsers: User[] = [
		{ name: 'John Doe', age: 25, department: 'Sales', isActive: true },
		{
			name: 'Jane Smith',
			age: 30,
			department: 'Marketing',
			isActive: false,
		},
		{
			name: 'Michael Johnson',
			age: 35,
			department: 'Finance',
			isActive: true,
		},
		{ name: 'Emily Davis', age: 28, department: 'HR', isActive: false },
		{
			name: 'David Wilson',
			age: 32,
			department: 'Operations',
			isActive: true,
		},
		{ name: 'Sarah Brown', age: 27, department: 'IT', isActive: true },
		{
			name: 'Christopher Lee',
			age: 29,
			department: 'Sales',
			isActive: false,
		},
		{
			name: 'Olivia Turner',
			age: 31,
			department: 'Marketing',
			isActive: true,
		},
		{
			name: 'Daniel Martin',
			age: 33,
			department: 'Finance',
			isActive: false,
		},
		{ name: 'Sophia Clark', age: 26, department: 'HR', isActive: true },
		{
			name: 'Matthew Garcia',
			age: 34,
			department: 'Operations',
			isActive: true,
		},
		{ name: 'Ava Hernandez', age: 29, department: 'IT', isActive: false },
		{
			name: 'William Johnson',
			age: 28,
			department: 'Sales',
			isActive: true,
		},
		{
			name: 'Isabella Anderson',
			age: 31,
			department: 'Marketing',
			isActive: false,
		},
		{
			name: 'James Wilson',
			age: 30,
			department: 'Finance',
			isActive: true,
		},
		{ name: 'Emma Thompson', age: 27, department: 'HR', isActive: false },
		{
			name: 'Joseph Martinez',
			age: 32,
			department: 'Operations',
			isActive: true,
		},
		{ name: 'Mia Davis', age: 26, department: 'IT', isActive: true },
		{
			name: 'Alexander Robinson',
			age: 33,
			department: 'Sales',
			isActive: false,
		},
		{
			name: 'Charlotte White',
			age: 29,
			department: 'Marketing',
			isActive: true,
		},
	];

	public users: User[] = [];

	constructor() {}

	public ngOnInit(): void {
		// A null filter mean show all items
		// since there is a boolean filter, it must have a value
		this.applyFilter({
			isActive: { equalTo: true },
		});
	}

	// This function simulate the database operation
	private applyFilter(filterObject: any): void {
		if (!filterObject) {
			this.users = this.rawUsers;
			return;
		}

		this.users = this.rawUsers.filter((user) => {
			let isNameMatch = false;
			let isAgeMatch = false;
			let isDepartmentMatch = false;
			let isActiveMatch = false;

			if (filterObject.name) {
				if (
					filterObject.name.includesSensitive &&
					user.name.includes(filterObject.name.includes)
				) {
					isNameMatch = true;
				} else if (
					!filterObject.name.includesSensitive &&
					user.name
						.toLowerCase()
						.includes(filterObject.name.includes.toLowerCase())
				) {
					isNameMatch = true;
				} else {
					isNameMatch = false;
				}
			} else {
				isNameMatch = true;
			}

			if (filterObject.age) {
				if (
					filterObject.age.lessThanOrEqualTo >= user.age &&
					filterObject.age.largeThanOrEqualTo <= user.age
				) {
					isAgeMatch = true;
				} else {
					isAgeMatch = false;
				}
			} else {
				isAgeMatch = true;
			}

			if (filterObject.department) {
				if (
					filterObject.department.includesSensitive &&
					user.department.includes(filterObject.department.includesSensitive)
				) {
					isDepartmentMatch = true;
				} else if (
					!filterObject.department.includesSensitive &&
					user.department
						.toLowerCase()
						.includes(
							filterObject.department.includes.toLowerCase()
						)
				) {
					isDepartmentMatch = true;
				} else {
					isDepartmentMatch = false;
				}
			} else {
				isDepartmentMatch = true;
			}

			if (
				filterObject.isActive !== undefined &&
				user.isActive === filterObject.isActive.equalTo
			) {
				isActiveMatch = true;
			} else {
				isActiveMatch = false;
			}

			return (
				isNameMatch && isAgeMatch && isDepartmentMatch && isActiveMatch
			);
		});
	}
}
