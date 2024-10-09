import { useForm } from 'react-hook-form';
import { Input } from '../Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './RegisterSchema';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import '../../../styles/Typography.scss';
import styles from './index.module.scss';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
	const navigate = useNavigate();
	const [showPwd, setShowPwd] = useState(false);
	const [showConfPwd, setConfShowPwd] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(RegisterSchema) });
	const submit = (formData) => {
		const registerUser = async () => {
			try {
				const { data } = await api.post('/users', formData);
				toast.success('Conta criada com sucesso');
				setTimeout(() => {
					navigate('/');
				}, 2500);
			} catch (error) {
				console.log(error);
				toast.error('Ops, algo deu errado');
			}
		};
		registerUser();
	};
	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(submit)}
		>
			<div className={styles.inner__container}>
				<h2 className='title1'>Crie sua conta</h2>
				<p className='headline'>Rapido e grátis, vamos nessa</p>
			</div>

			<Input
				label='Nome'
				type='text'
				{...register('name')}
				error={errors.name}
				placeholder='Digite aqui seu nome'
			/>
			<Input
				label='Email'
				type='email'
				{...register('email')}
				error={errors.email}
				placeholder='Digite aqui seu email'
			/>
			<div className={styles.pwd__container}>
				<Input
					label='Senha'
					type={showPwd ? 'text' : 'password'}
					{...register('password')}
					error={errors.password}
					placeholder='Digite aqui sua senha'
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
			<div className={styles.pwd__container}>
				<Input
					label='Confirmar senha'
					type={showConfPwd ? 'text' : 'password'}
					{...register('confirmPassword')}
					error={errors.confirmPassword}
					placeholder='Digite novamente sua senha'
				/>
				{showConfPwd ? (
					<IoMdEyeOff
						className={styles.ico}
						onClick={() => setConfShowPwd(!showConfPwd)}
					/>
				) : (
					<IoMdEye
						className={styles.ico}
						onClick={() => setConfShowPwd(!showConfPwd)}
					/>
				)}
			</div>

			<Input
				label='Bio'
				type='text'
				{...register('bio')}
				error={errors.bio}
				placeholder='Fale sobre você'
			/>
			<Input
				label='Contato'
				type='text'
				{...register('contact')}
				error={errors.contact}
				placeholder='Opção de contato'
			/>
			<div className={styles.select__container}>
				<label
					className='label'
					htmlFor='course_module'
				>
					Selecione um módulo
				</label>
				{errors.course_module ? (
					<p className='help'>{errors.course_module.message}</p>
				) : null}
				<select
					name='course_module'
					id='course_module'
					{...register('course_module')}
				>
					<option value=''>Escolha seu módulo</option>
					<option value='Primeiro módulo (Introdução ao Frontend)'>
						Primeiro módulo
					</option>
					<option value='Segundo módulo (Frontend Avançado)'>
						Segundo módulo
					</option>
					<option value='Terceiro módulo (Introdução ao Backend)'>
						Terceiro módulo
					</option>
					<option value='Quarto módulo (Backend Avançado)'>
						Quarto módulo
					</option>
				</select>
			</div>
			<button
				className='btn'
				type='submit'
			>
				Cadastrar
			</button>
		</form>
	);
};
