import { HopeProvider, NotificationsProvider } from '@hope-ui/solid';
import { Router, Route, Link } from '@solidjs/router'; // Импортируем роутинг
import { createSignal } from 'solid-js';
import ELibApp from './ELibApp';
import LoginPage from './pages/LoginPage';


import CurrentPageProvider from './providers/CurrentPageProvider';
import PatronEditingProvider from './providers/PatronEditingProvider';
import CurrentPatronProvider from './providers/CurrentPatron';
import ItemEditingProvider from './providers/ItemEditingProvider';
import ModalProvider from './providers/ModalProvider';
import InputValidationProvider from './providers/InputValidationProvider';
import CurrentBookProvider from './providers/CurrentBook';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false); // Состояние для отслеживания входа пользователя
  const [role, setRole] = createSignal(null); // Состояние для хранения роли пользователя

  const handleLoginSuccess = (role) => {
    setRole(role); // Устанавливаем роль пользователя
    setIsLoggedIn(true); // Меняем состояние на успешный вход
  };

  return (
    <HopeProvider>
      <Router>
        <NotificationsProvider placement={"bottom-end"}>
          <InputValidationProvider>
            <CurrentPageProvider>
              <ModalProvider>
                <PatronEditingProvider>
                  <ItemEditingProvider>
                    <CurrentPatronProvider>
                      <CurrentBookProvider>
                        {isLoggedIn() ? (
                          // В зависимости от роли перенаправляем на нужную страницу
                          role() === 'librarian' ? (
                            <ELibApp role={role()} />
                          ) : (
                            // Для пользователей
                            <UserDashboard role={role()} />
                          )
                        ) : (
                          // Если пользователь не авторизован, показываем страницу логина
                          <LoginPage onLoginSuccess={handleLoginSuccess} />
                        )}
                      </CurrentBookProvider>
                    </CurrentPatronProvider>
                  </ItemEditingProvider>
                </PatronEditingProvider>
              </ModalProvider>
            </CurrentPageProvider>
          </InputValidationProvider>
        </NotificationsProvider>
      </Router>
    </HopeProvider>
  );
}

export default App;

