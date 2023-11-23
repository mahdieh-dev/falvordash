import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { pizza } from '@/assets';
import useFirebase from '@/hooks/useFirebase';
import { EForms } from '@/typescript/enums/EForms';
import { ERoutes } from '@/typescript/enums/ERoutes';
import { constraints, isEmpty, validateForm } from '@/utils/validation';

import '@/styles/register.scss';

function Register() {
	const [formValues, setFormValues] = useState<Record<EForms, string>>({});
	const [errors, setErrors] = useState({});
	const { registerUser, errors: firebaseErrors } = useFirebase();
	const navigate = useNavigate();

	const handleFormSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			setErrors({});
			const errors = validateForm({
				formObject: formValues,
				constraints: constraints.register,
			});
			if (errors && !isEmpty(errors)) {
				setErrors(errors);
				return;
			}
			await registerUser(formValues, () =>
				navigate(ERoutes.Dashboard, { replace: true })
			);
		},
		[formValues, registerUser, navigate]
	);

	const formObject = [
		{
			label: 'Full Name',
			inputName: 'fullName',
			placeholder: 'Mahdieh Shavandi',
			type: 'text',
			props: {
				minLength: 3,
			},
		},
		{
			label: 'Email',
			inputName: 'email',
			placeholder: 'mahdiehshavandi@ymail.com',
			type: 'email',
		},
		{
			label: 'Password',
			inputName: 'password',
			placeholder: '*******',
			type: 'password',
			props: {
				minLength: 6,
				maxLength: 30,
			},
		},
	];

	return (
		<div id="root">
			<div>
				<img src={pizza} />
				<form action="" onSubmit={handleFormSubmit}>
					{formObject.map((el, ind) => {
						const fieldError =
							errors[el.inputName] || firebaseErrors[el.inputName];
						return (
							<div id={'formInputWrapper'} key={ind}>
								<p>
									<label>{el.label}:</label>
								</p>
								<input
									type={el.type}
									name={el.inputName}
									{...el.props}
									value={formValues[el.inputName]}
									onChange={(e) =>
										setFormValues((prev) => ({
											...prev,
											[el.inputName]: e.target.value,
										}))
									}
								/>
								{fieldError ? <p id="inputError">{fieldError}</p> : <></>}
							</div>
						);
					})}
					<button type="submit" name="signup">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
