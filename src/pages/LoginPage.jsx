import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [rememberMe, setRememberMe] = createSignal(false);
  const [isLogin, setIsLogin] = createSignal(true);

  const [firstName, setFirstName] = createSignal('');
  const [lastName, setLastName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [regPassword, setRegPassword] = createSignal('');

  const navigate = useNavigate();

  const validatePassword = (password) => {
    return password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (username().trim() === '') {
      setError('Имя пользователя не может быть пустым');
      return;
    }
    if (!validatePassword(password())) {
      setError('Пароль должен содержать хотя бы 6 символов, цифру и заглавную букву');
      return;
    }
    if (username() === 'librarian' && password() === 'Lib123') {
      alert('Вход выполнен как библиотекарь!');
      onLoginSuccess('librarian');
      navigate('/');
    } else if (username() === 'user' && password() === 'User123') {
      alert('Вход выполнен как пользователь!');
      onLoginSuccess('user');
      navigate('/pages/UserDashboard');
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!validatePassword(regPassword())) {
      setError('Пароль должен содержать хотя бы 6 символов, цифру и заглавную букву');
      return;
    }
    alert('Регистрация как читатель завершена!');
    onLoginSuccess('user');
    navigate('/pages/UserDashboard');
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Montserrat', sans-serif;
            background: #f6f5f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
          }

          h1 {
            font-weight: normal;
            margin: 0;
            font-size: 36px;
            color: rgb(86, 63, 143);
            text-align: center;
            font-family: 'Montserrat', sans-serif;
          }

          .top-header-text {
            margin-bottom: 10px;
            text-align: center;
          }

          .top-header-text p {
            font-size: 16px;
            color: #333;
          }

          .container {
            width: 450px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
            padding: 30px;
            margin-top: 20px;
          }

          .form-container form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }

          .form-container input {
            background: #eee;
            border: 1px solid #ddd;
            padding: 14px 16px;
            margin: 8px 0;
            width: 100%;
            border-radius: 6px;
            font-size: 14px;
            font-family: 'Montserrat', sans-serif;
          }

          button {
            border-radius: 20px;
            border: 1px solid rgb(86, 63, 143);
            background: rgb(86, 63, 143);
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            padding: 12px 35px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: transform 80ms ease-in;
            width: 100%;
            cursor: pointer;
            margin-top: 10px;
          }

          button:active {
            transform: scale(0.95);
          }

          .checkbox-container {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
          }

          .checkbox-container input[type="checkbox"] {
            transform: scale(0.85);
            cursor: pointer;
            margin: 0;
          }

          .checkbox-container label {
            font-size: 14px;
            font-style: italic;
            margin: 0;
            cursor: pointer;
            white-space: nowrap;
          }

          .switch-form {
            margin-top: 20px;
            text-align: center;
          }

          .switch-form a {
            font-size: 14px;
            color: rgb(86, 63, 143);
            text-decoration: underline;
            cursor: pointer;
          }

          .switch-form p {
            font-size: 12px;
          }

          .form-container label {
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 5px;
          }

          .registration-header {
            font-size: 30px;
            font-weight: normal;
            color: rgb(86, 63, 143);
            margin-bottom: 20px;
            font-family: 'Montserrat', sans-serif;
            text-align: center;
          }
        `}
      </style>

      {/* Login Header */}
      {isLogin() && (
        <div class="top-header-text">
          <h1>АРМ Библиотекаря</h1>
          <p>Войдите для доступа к библиотечной системе</p>
        </div>
      )}

      {/* Registration Header */}
      {!isLogin() && (
        <div class="top-header-text">
          <h1 style={{ fontSize: '32px', color: 'rgb(86, 63, 143)' }}>Регистрация</h1>
        </div>
      )}

      <div class="container">
        {/* Login Form */}
        {isLogin() && (
          <div class="form-container">
            <form onSubmit={handleLoginSubmit}>
              <label for="username">Имя пользователя</label>
              <input
                type="text"
                id="username"
                placeholder="Имя пользователя"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                required
              />

              <label for="password">Пароль</label>
              <input
                type="password"
                id="password"
                placeholder="Пароль"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                required
              />

              <div class="checkbox-container">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe()}
                  onChange={() => setRememberMe(!rememberMe())}
                />
                <label for="remember">Запомнить меня</label>
              </div>

              <button type="submit">Войти</button>

              {error() && <p style={{ color: 'red', marginTop: '15px' }}>{error()}</p>}

              <div class="switch-form">
                <p>
                  Нет аккаунта? <a onClick={() => setIsLogin(false)}>Зарегистрироваться</a>
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Registration Form */}
        {!isLogin() && (
          <div class="form-container">
            <form onSubmit={handleRegisterSubmit}>
              <label for="firstName">Имя</label>
              <input
                type="text"
                id="firstName"
                placeholder="Имя"
                value={firstName()}
                onInput={(e) => setFirstName(e.target.value)}
                required
              />

              <label for="lastName">Фамилия</label>
              <input
                type="text"
                id="lastName"
                placeholder="Фамилия"
                value={lastName()}
                onInput={(e) => setLastName(e.target.value)}
                required
              />

              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email()}
                onInput={(e) => setEmail(e.target.value)}
                required
              />

              <label for="regPassword">Пароль</label>
              <input
                type="password"
                id="regPassword"
                placeholder="Пароль"
                value={regPassword()}
                onInput={(e) => setRegPassword(e.target.value)}
                required
              />

              <button type="submit">Зарегистрироваться</button>

              {error() && <p style={{ color: 'red', marginTop: '15px' }}>{error()}</p>}

              <div class="switch-form">
                <p>
                  Уже есть аккаунт? <a onClick={() => setIsLogin(true)}>Войти</a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
