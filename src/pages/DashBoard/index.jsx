import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import styles from './index.module.scss';
import logo from '../../assets/logo.svg';

export const DashBoard = ({ setIsLogin, isLogin }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	useEffect(() => {
		const getUser = async () => {
			try {
				const localToken = localStorage.getItem('@KenzieHub-acessToken');
				if (localToken) {
					api.defaults.headers.common.Authorization = `Bearer ${localToken}`;
					const { data } = await api.get('/profile');
					setUser(data);
				} else navigate('/');
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, []);
	const logout = () => {
		navigate('/');
		localStorage.removeItem('@KenzieHub-acessToken');
		setIsLogin(false);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<img
						src={logo}
						alt=''
					/>
					<div>
						<button
							className='btn_return'
							onClick={() => logout()}
						>
							Sair
						</button>
					</div>
				</div>
			</header>
			<section className={styles.user__section}>
				<div className={styles.user__container}>
					<h1 className='title1'>Olá, {user ? user.name : '...'}</h1>
					<h3 className='headline'>{user ? user.course_module : '...'}</h3>
				</div>
			</section>
			<section className={styles.development__section}>
				<div className={styles.development__container}>
					<h2 className='title1'>Que pena! Estamos em desenvolvimento :(</h2>
					<p className='paragraph'>
						Nossa aplicação está em desenvolvimento, em breve teremos novidades
					</p>
				</div>
			</section>
		</>
	);
};
