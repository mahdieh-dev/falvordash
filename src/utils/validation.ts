export function isEmpty(value: string | number | object | undefined) {
	switch (typeof value) {
		case 'string':
			return !value.length;
		case 'number':
			return value === 0;
		case 'object':
			return !Object.keys(value).length;
		case 'undefined':
			return true;
		default:
			return false;
	}
}

import { EForms } from '@/typescript/enums/EForms';
import { IFormConstraints } from '@/typescript/forms';

const nameConstraints = {
	presence: { message: 'Please enter your name.' },
	format: {
		pattern: '[a-zA-ZÀ-ž_\\-. ]+',
		message: 'Please enter a valid name',
	},
	length: {
		minimum: 2,
		maximum: 50,
		message: 'The name is too short',
	},
};
const passwordConstraints = {
	presence: { message: 'Please enter your password' },
	length: {
		minimum: 6,
		maximum: 10,
		message: 'Please choose a longer password.',
	},
};

const emailConstraints = {
	presence: { message: 'Please enter your email.' },
	format: {
		pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
		message: 'Please enter a valid email address',
	},
};

export const constraints: Record<string, Record<EForms, IFormConstraints>> = {
	register: {
		[EForms.Name]: nameConstraints,
		[EForms.Email]: emailConstraints,
		[EForms.Password]: passwordConstraints,
	},
};

export const validateForm = ({
	formObject,
	constraints,
}: {
	formObject: Record<EForms, object | string | number>;
	constraints: Record<EForms, IFormConstraints>;
}) => {
	const errors: Record<EForms, string> = {};
	for (const key of Object.keys(constraints)) {
		if (constraints[key]?.presence && isEmpty(formObject[key])) {
			errors[key] = constraints[key].presence.message;
		} else if (
			constraints[key]?.format &&
			!new RegExp(constraints[key].format.pattern).test(formObject[key])
		) {
			errors[key] = constraints[key].format.message;
		} else if (constraints[key]?.length && formObject[key]) {
			if (
				(constraints[key].length.minimum &&
					formObject[key].length < constraints[key].length.minimum) ||
				(constraints[key].length.maximum &&
					formObject[key].length > constraints[key].length.maximum)
			) {
				errors[key] = constraints[key].length.message;
			}
		}
	}
	return errors;
};
