import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoginPage, RegisterPage, DashBoard } from '../pages';
import { useEffect, useState } from 'react';
export const RoutesMain = () => {
	const [isLogin, setIsLogin] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const localToken = localStorage.getItem('@KenzieHub-acessToken');
		setIsLogin(Boolean(localToken));
		isLogin ? navigate('/dashboard') : navigate('/');
	}, [isLogin]);
	return (
		<Routes>
			<Route
				path='/'
				element={
					<LoginPage
						setIsLogin={setIsLogin}
						isLogin={isLogin}
					/>
				}
			/>
			<Route
				path='/register'
				element={<RegisterPage />}
			/>
			<Route
				path='/dashboard'
				element={
					<DashBoard
						setIsLogin={setIsLogin}
						isLogin={isLogin}
					/>
				}
			/>
		</Routes>
	);
};
