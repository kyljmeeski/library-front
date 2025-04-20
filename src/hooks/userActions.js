// src/users/userActions.js

// Функция для поиска книги по названию
export const searchBooks = (query) => {
    return fetch(`/api/searchBooks?q=${query}`)
      .then(response => response.json())
      .then(data => data.books)
      .catch(error => console.error('Ошибка поиска книг:', error));
  };
  
  // Функция для получения профиля пользователя
  export const getUserProfile = (userId) => {
    return fetch(`/api/userProfile?id=${userId}`)
      .then(response => response.json())
      .catch(error => console.error('Ошибка загрузки профиля:', error));
  };
  
  // Функция для обновления данных профиля пользователя
  export const updateUserProfile = (userId, updatedData) => {
    return fetch(`/api/updateUserProfile?id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .catch(error => console.error('Ошибка обновления профиля:', error));
  };
  