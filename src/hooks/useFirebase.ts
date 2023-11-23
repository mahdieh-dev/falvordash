import { useCallback, useState } from 'react';
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth';

import { EForms } from '@/typescript/enums/EForms';
import { EStorage } from '@/typescript/enums/EStorage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const useFirebase = () => {
	const [errors, setErrors] = useState<Record<EForms, string>>({});
	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: 'AIzaSyBsLj-tPsj4AeraRFMXdsWKKtPIEIKw998',
		authDomain: 'flavordash-59626.firebaseapp.com',
		projectId: 'flavordash-59626',
		storageBucket: 'flavordash-59626.appspot.com',
		messagingSenderId: '800301784734',
		appId: '1:800301784734:web:6cab6fbb04d1d166e3a58f',
		measurementId: 'G-D16XESZHLT',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	const auth = getAuth(app);

	const registerUser = useCallback(
		async (
			{ email, password, fullName }: Record<EForms, string>,
			callback: () => void
		) => {
			try {
				const authResponse = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				if (!authResponse) {
					return;
				}
				await updateProfile(authResponse.user, { displayName: fullName });
				const token = await authResponse.user.getIdToken(true);
				localStorage.setItem(EStorage.Token, token);
				callback?.();
			} catch (error) {
				console.log('error when registering the user:', error);
				if (error?.code?.includes('email')) {
					const errorMessage = error.message.split('/')[1].split('-').join(' ');
					setErrors({
						[EForms.Email]:
							errorMessage.slice(0, errorMessage.length - 2) ?? '',
					});
				}
			}
		},
		[auth]
	);

	return { app, analytics, registerUser, errors };
};

export default useFirebase;
