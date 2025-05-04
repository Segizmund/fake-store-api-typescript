import React, {FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext.tsx";

interface AuthResponse {
    token?: string;
    message?: string;
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data: AuthResponse = await response.json();
                if (data.token) {
                    setToken(data.token);
                    login(data.token, username, password);
                    console.log('Успешная авторизация! Токен:', data.token);
                    navigate('/');
                } else {
                    setError(data.message || 'Неожиданный ответ от сервера (нет токена).');
                    setToken(null);
                }
            } else {
                try {
                    const errorText = await response.text();
                    setError(`Ошибка авторизации: ${errorText}`);
                    console.error('Ошибка авторизации:', errorText);
                } catch (textError) {
                    setError(`Ошибка авторизации (не удалось прочитать текст ошибки). Статус: ${response.status}`);
                    console.error('Ошибка авторизации (не удалось прочитать текст ошибки):', textError, 'Статус:', response.status);
                }
                setToken(null);
            }
        } catch (error: string) {
            setError('Произошла ошибка при отправке запроса.');
            console.error('Ошибка при отправке запроса:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <div className={'flex flex-col gap-2 mb-6 bg-[#222831] p-8 rounded-md shadow-md max-w-[271px] w-full'}>
                <p className={'font-semibold text-white'}>Данные для входа:</p>
                <p><span className={'font-semibold text-white'}>Логин:</span> <span className={'text-[#D65A31]'}>mor_2314</span></p>
                <p><span className={'font-semibold text-white'}>Пароль:</span> <span className={'text-[#D65A31]'}>83r5^_</span></p>
                {error && <p className="text-red-500 text-xs italic mb-6 break-all">{error}</p>}
                {token && <p className="text-green-500 text-xs italic mb-6 break-all">Вы успешно авторизованы! Токен: <br/>{token}</p>}
            </div>
            <div className="bg-[#222831] shadow-md rounded p-8 mb-4 max-w-[271px] w-full">
                <h2 className="block text-white text-xl font-bold mb-4">Авторизация</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#D65A31] text-sm font-bold mb-2" htmlFor="username">
                            Имя пользователя
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-[#D65A31] leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#D65A31] text-sm font-bold mb-2" htmlFor="password">
                            Пароль
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-[#D65A31] mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-[#D65A31] cursor-pointer hover:bg-white hover:text-[#D65A31] transition duration-300 easy-linear text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Авторизация...' : 'Войти'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;