import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	BooleanSearchField,
	NumberSearchField,
	SearchField,
	SearchFieldType,
	TextSearchField,
} from './types';
import { Subject, Subscription } from 'rxjs';

export class FilterUnit {
	//#region Members
	private sub: Subscription;
	private _field: SearchField;
	private _caption: string;
	private readonly fb: FormBuilder = new FormBuilder();
	private _dataForm: FormGroup = this.fb.group({});

	private currentChipButtonClass = '';

	public autoEmitChange = false;
	public $actionSource: Subject<boolean> = new Subject<boolean>();
	//#endregion

	constructor() {
		this.sub = new Subscription();
		this._field = { name: '', type: SearchFieldType.String };
		this._caption = '';
		this.currentChipButtonClass =
			this._field.css?.buttonChip?.default || 'btn btn-primary';
	}

	//#region Get/Set
	private get isDirty(): boolean {
		if (this._field.type === SearchFieldType.String) {
			const textValue = this._dataForm.get('textValue')?.value;
			return textValue && textValue.trim() !== '';
		}
		if (this._field.type === SearchFieldType.Number) {
			return (
				this._dataForm.get('currentMin')?.dirty ||
				this._dataForm.get('currentMax')?.dirty ||
				false
			);
		} else {
			return this._dataForm.dirty;
		}
	}

	public get dataForm(): FormGroup {
		return this._dataForm;
	}

	public get fieldCaption(): string {
		if (this.autoEmitChange) {
			const caption = this._field.caption || 'Field';
			if (!this.isDirty) return caption;

			return this.getRawCaption();
		} else {
			return this._caption;
		}
	}

	public get textPlaceholder(): string {
		const caption = this._field.caption || 'Field';
		return `Enter ${caption}`;
	}

	public get currentMinValue(): FormControl {
		return this._dataForm.get('currentMin') as FormControl;
	}

	public get currentMaxValue(): FormControl {
		return this._dataForm.get('currentMax') as FormControl;
	}

	public get minValue(): number {
		const numberField = this._field as NumberSearchField;
		return numberField.min;
	}

	public get maxValue(): number {
		const numberField = this._field as NumberSearchField;
		return numberField.max;
	}

	public get filterButtonClass(): string {
		if (this.autoEmitChange) {
			return this.isDirty
				? this._field.css?.buttonChip?.dirty || 'btn btn-warning'
				: this._field.css?.buttonChip?.default || 'btn btn-primary';
		} else {
			return this.currentChipButtonClass;
		}
	}

	public get isStringType(): boolean {
		return this._field.type === SearchFieldType.String;
	}

	public get isNumberType(): boolean {
		return this._field.type === SearchFieldType.Number;
	}

	public get isBooleanType(): boolean {
		return this._field.type === SearchFieldType.Boolean;
	}

	public set filterField(value: SearchField) {
		this._field = value;
		this._caption = value.caption || '';
		this.buildFilterDataForm();
	}
	//#endregion

	private getRawCaption(): string {
		const caption = this._field.caption || 'Field';
		if (!this.isDirty) {
			return caption;
		}

		if (this._field.type === SearchFieldType.String) {
			const textValue = this._dataForm.get('textValue')?.value;
			return textValue ? `${caption} : ${textValue}` : caption;
		} else if (this._field.type === SearchFieldType.Number) {
			const minValue = this._dataForm.get('currentMin')?.value;
			const maxValue = this._dataForm.get('currentMax')?.value;
			return `${caption} : ${minValue}~${maxValue}`;
		} else {
			return caption;
		}
	}

	private buildFilterDataForm() {
		const formGroupConfig: { [key: string]: FormControl } = {};
		switch (this._field.type) {
			case SearchFieldType.String: {
				const textField: TextSearchField = this
					._field as TextSearchField;
				formGroupConfig['textValue'] = new FormControl();
				formGroupConfig['isCaseSensitive'] = new FormControl(
					textField.isCaseSensitive
				);
				break;
			}
			case SearchFieldType.Number: {
				const numberField: NumberSearchField = this
					._field as NumberSearchField;
				formGroupConfig['currentMin'] = new FormControl(
					numberField.min
				);
				formGroupConfig['currentMax'] = new FormControl(
					numberField.max
				);
				break;
			}
			case SearchFieldType.Boolean: {
				const booleanField: BooleanSearchField = this
					._field as BooleanSearchField;
				formGroupConfig['checked'] = new FormControl(
					booleanField.checked
				);
				break;
			}
		}

		this._dataForm = this.fb.group(formGroupConfig);

		if (this.sub) {
			this.sub.unsubscribe();
		}

		this.sub = this._dataForm.valueChanges.subscribe((data) => {
			if (this._field.type === SearchFieldType.String) {
				if (data.textValue && this.autoEmitChange) {
					this.$actionSource.next(false);
				}
			}
			if (this._field.type === SearchFieldType.Number) {
				if (this.autoEmitChange) {
					this.$actionSource.next(false);
				}
			} else if (this._field.type === SearchFieldType.Boolean) {
				this.$actionSource.next(false);
			}
		});
	}

	public dispose(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}

		this.$actionSource.complete();
	}

	public getFilterResultObject(): any {
		let result: any;

		if (this._field.type === SearchFieldType.Boolean) {
			result = {};
			result[this._field.name] = {
				equalTo: this._dataForm.get('checked')?.value,
			};
		} else if (this.isDirty) {
			if (this._field.type === SearchFieldType.String) {
				const textField: TextSearchField = this
					._field as TextSearchField;
				const filterProperty: any = {};
				filterProperty[textField.name] = this._dataForm.get(
					'isCaseSensitive'
				)?.value
					? {
							includesSensitive:
								this._dataForm.get('textValue')?.value,
					  }
					: {
							includes: this._dataForm.get('textValue')?.value,
					  };

				result = filterProperty;
			}
			if (this._field.type === SearchFieldType.Number) {
				result = {};
				result[this._field.name] = {
					largeThanOrEqualTo: this._dataForm.get('currentMin')?.value,
					lessThanOrEqualTo: this._dataForm.get('currentMax')?.value,
				};
			}
		}

		return result;
	}

	public onReset(): void {
		if (this._field.type === SearchFieldType.Number) {
			const numberField = this._field as NumberSearchField;
			this._dataForm.reset(
				{
					min: numberField.min,
					max: numberField.max,
					currentMin: numberField.min,
					currentMax: numberField.max,
				},
				{ emitEvent: false }
			);
		} else {
			this._dataForm.reset();
		}

		this.currentChipButtonClass =
			this._field.css?.buttonChip?.default || 'btn btn-primary';
		this._caption = this._field.caption || '';
	}

	public onSearchButtonClicked(): void {
		this.currentChipButtonClass = this.isDirty
			? this._field.css?.buttonChip?.dirty || 'btn btn-warning'
			: this._field.css?.buttonChip?.default || 'btn btn-primary';

		this._caption = this.getRawCaption();
		this.$actionSource.next(true);
	}
}
