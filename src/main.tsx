import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import Register from '@/routes/register.tsx';
import Root from '@/routes/root.tsx';

import Dashboard from './routes/dashboard';
import { ERoutes } from './typescript/enums/ERoutes';

import '@/index.css';

localStorage.clear();

const router = createBrowserRouter([
	{
		path: ERoutes.Landing,
		element: <Root />,
		errorElement: <div>Error</div>,
	},
	{
		path: ERoutes.Register,
		element: <Register />,
		errorElement: <div>Error</div>,
	},
	{
		path: ERoutes.Dashboard,
		element: <Dashboard />,
		errorElement: <div>Error</div>,
	},
	{
		path: '*',
		element: <Navigate to={ERoutes.Landing} />,
		errorElement: <div>Error</div>,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
