import { useForm } from 'react-hook-form';
import { Input } from '../Input';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import styles from './index.module.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from './LoginSchema';

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(LoginSchema) });
	const [showPwd, setShowPwd] = useState(false);
	const navigate = useNavigate();
	const submit = (formData) => {
		const loginUser = async (formData) => {
			try {
				const { data } = await api.post('/sessions', formData);
				localStorage.setItem('@KenzieHub-acessToken', data.token);
				api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
				navigate('/dashboard');
			} catch (error) {
				console.log(error);
				toast.error('Usuário ou senha incorreta');
			}
		};

		loginUser(formData);
	};
	return (
		<form onSubmit={handleSubmit(submit)}>
			<Input
				label='Email'
				type='email'
				{...register('email')}
				error={errors.email}
			/>
			<div className={styles.pwd__container}>
				<Input
					label='Senha'
					type={showPwd ? 'text' : 'password'}
					{...register('password')}
					error={errors.password}
				/>
				{showPwd ? (
					<IoMdEyeOff
						className={styles.ico}
						onClick={() => setShowPwd(!showPwd)}
					/>
				) : (
					<IoMdEye
						className={styles.ico}
						onClick={() => setShowPwd(!showPwd)}
					/>
				)}
			</div>
			<button
				className={`btn ${styles.login__btn}`}
				type='submit'
			>
				Entrar
			</button>
		</form>
	);
};
