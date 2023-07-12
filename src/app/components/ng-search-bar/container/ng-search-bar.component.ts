import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	SearchConfig,
	SearchField,
	SearchFieldType,
	TextSearchField,
} from '../types';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-ng-search-bar',
	templateUrl: './ng-search-bar.component.html',
	styleUrls: ['./ng-search-bar.component.scss'],
})
export class NgSearchBarComponent implements OnInit {
	@Output() onFilterChanged: EventEmitter<any> = new EventEmitter<any>();
	@Input() public set config(value: SearchConfig) {
		this.applyConfigValue(value);
		this.filterForm = this.buildFormControls(this._config.fields);
	}
	public filterForm: FormGroup;
	public _config: SearchConfig;

	constructor(private readonly fb: FormBuilder) {
		this._config = { fields: [] };
		this.filterForm = this.buildFormControls(this._config.fields);
	}

	public get filterFields(): FormArray {
		return this.filterForm.get('filterField') as FormArray;
	}

	private buildDefaultFieldCss(): any {
		return {
			buttonChip: {
				dirty: 'btn btn-warning',
				default: 'btn btn-primary',
			},
		};
	}

	private applyConfigValue(value: SearchConfig): void {
		let defaultConfig: SearchConfig = {
			autoRefresh: false,
			fields: [],
		};
		defaultConfig = { ...value };
		defaultConfig.fields = defaultConfig.fields.map((f) => {
			if (!f.css) {
				f.css = this.buildDefaultFieldCss();
			} else {
				if (!f.css.buttonChip) {
					f.css.buttonChip = {
						dirty: 'btn btn-warning',
						default: 'btn btn-primary',
					};
				}
			}
			return f;
		});
		this._config = defaultConfig;
	}

	private buildFormControls(fields: SearchField[]): FormGroup {
		const filterFieldsArray: FormGroup[] = fields.map(
			(field: SearchField) => {
				const formGroupConfig: { [key: string]: FormControl } = {};

				formGroupConfig['name'] = new FormControl(field.name);
				formGroupConfig['type'] = new FormControl(
					field.type.toString()
				);
				formGroupConfig['currentChipButtonClass'] = new FormControl(
					field.css?.buttonChip?.default
				);
				switch (field.type) {
					case SearchFieldType.string: {
						const textField: TextSearchField =
							field as TextSearchField;
						formGroupConfig['textValue'] = new FormControl();
						formGroupConfig['isCaseSensitive'] = new FormControl(
							textField.isCaseSensitive
						);
						break;
					}
				}

				return this.fb.group(formGroupConfig);
			}
		);

		return this.fb.group({
			filterField: this.fb.array(filterFieldsArray),
		});
	}

	private buildFilterObject(): any {
		const result: any = { and: [] };
		this.filterFields.controls.forEach((f) => {
			const currentFormGroup: FormGroup = f as FormGroup;
			if (currentFormGroup.dirty) {
				if (currentFormGroup.get('type')?.value === 'string') {
					const filterProperty: any = {};
					const propertyName: string =
						currentFormGroup.get('name')?.value;
					if (propertyName) {
						const isCaseSensitive: boolean =
							currentFormGroup.get('isCaseSensitive')?.value;
						filterProperty[propertyName] = isCaseSensitive
							? {
									includesSensitive:
										currentFormGroup.get('textValue')
											?.value,
							  }
							: {
									includes:
										currentFormGroup.get('textValue')
											?.value,
							  };

						result.and.push(filterProperty);
					}
				}
			}
		});
		console.log(result);

		return result;
	}

	public ngOnInit(): void {}

	public getFieldCaption(index: number): string {
		const currentFormGroup = this.filterFields.controls[index] as FormGroup;
		const filterField: SearchField = this._config.fields[index];
		if (!currentFormGroup.dirty) return filterField.name;

		if (filterField.type === SearchFieldType.string) {
			return `${filterField.name} : ${
				currentFormGroup.get('textValue')?.value
			}`;
		} else {
			return filterField.name;
		}
	}

	public getTypeName(field: SearchField): string {
		return field.type as string;
	}

	public getFormGroupByIndex(index: number): FormGroup {
		return this.filterFields.controls[index] as FormGroup;
	}

	public getFilterButtonClass(index: number): string {
		const currentFormGroup = this.filterFields.controls[index] as FormGroup;
		const filterField: SearchField = this._config.fields[index];
		if (this._config.autoRefresh) {
			return currentFormGroup.dirty
				? filterField.css?.buttonChip?.dirty || 'btn btn-warning'
				: filterField.css?.buttonChip?.default || 'btn btn-primary';
		} else {
			return currentFormGroup.get('currentChipButtonClass')?.value;
		}
	}

	public onReset(index: number): void {
		const currentFormGroup = this.filterFields.controls[index] as FormGroup;
		const filterField: SearchField = this._config.fields[index];
		currentFormGroup.reset({
			name: filterField.name,
			currentChipButtonClass: filterField.css?.buttonChip?.default,
		});
	}

	public onSearch(index: number): void {
		const currentFormGroup = this.filterFields.controls[index] as FormGroup;
		const filterField: SearchField = this._config.fields[index];
		// Set field button class
		if (currentFormGroup.dirty) {
			currentFormGroup
				.get('currentChipButtonClass')
				?.patchValue(filterField.css?.buttonChip?.dirty);

			if (this.onFilterChanged) {
				this.onFilterChanged.emit(this.buildFilterObject());
			}
		}
	}
}
