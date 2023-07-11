import { Component, Input, OnInit } from '@angular/core';
import { SearchConfig, SearchField } from '../types';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
} from '@angular/forms';

@Component({
	selector: 'app-ng-search-bar',
	templateUrl: './ng-search-bar.component.html',
	styleUrls: ['./ng-search-bar.component.scss'],
})
export class NgSearchBarComponent implements OnInit {
	public filterForm: FormGroup;
	@Input() public set config(value: SearchConfig) {
		this._config = value;
		this.filterForm = this.buildFormControls(this._config.fields);
	}

	public _config: SearchConfig;

	constructor(private readonly fb: FormBuilder) {
		this._config = { fields: [] };
		this.filterForm = this.buildFormControls(this._config.fields);
	}

	public get filterFields(): FormArray {
		return this.filterForm.get('filterField') as FormArray;
	}

	private buildFormControls(fields: SearchField[]): FormGroup {
		const filterFieldsArray: FormGroup[] = fields.map(
			(field: SearchField) => {
				const formGroupConfig: { [key: string]: FormControl } = {};

				Object.entries(field).forEach(([key, value]) => {
					formGroupConfig[key] = new FormControl(value);
				});

				return this.fb.group(formGroupConfig);
			}
		);

		return this.fb.group({
			filterField: this.fb.array(filterFieldsArray),
		});
	}

	public ngOnInit(): void {}

	public getTypeName(field: SearchField): string {
		return field.type as string;
	}

	public getFormGroupByIndex(index: number): FormGroup {
		return this.filterFields.controls[index] as FormGroup;
	}

	public getFilterButtonClass(index: number): string {
		const currentFormGroup = this.filterFields.controls[index] as FormGroup;
		return currentFormGroup.dirty ? 'btn btn-warning' : 'btn btn-primary';
	}
}
