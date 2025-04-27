import { createSignal } from 'solid-js';


  const products = [
    { id: 1, name: "Война и мир", image: "https://m.media-amazon.com/images/I/912F83swwRL._UF1000,1000_QL80_.jpg" },
    { id: 2, name: "1984", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6bQvS9Fc8M9JCsn86Ni05z7_IkZ-plEC8w&s" },
    { id: 3, name: "Мастер и Маргарита", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShOAAie_XRZZgaJ7R2vwypBXq4IztVT6qtog&s" },
    { id: 4, name: "Преступление и наказание", image: "https://m.media-amazon.com/images/I/81gmcOTGRJL._UF1000,1000_QL80_.jpg" },
    { id: 5, name: "Убить пересмешника", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdwxmeUg0XzuySVjKcOlfqjnBj41bvjAOyeQ&s" },
    { id: 6, name: "Гордость и предубеждение", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ksbSa1FFG7CdcxNWb_nUqyBiocf8gbr2uw&s" },
    { id: 7, name: "На маяк", image: "https://cdn.azbooka.ru/cv/w1100/1115f078-5a00-4009-ab3a-917c2bebb2ad.jpg" },
    { id: 8, name: "451 градус по Фаренгейту", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdqsOlpa5d5uKafyx8Vifd_RjvnVgxaWQPw&s" },
    { id: 9, name: "Анна Каренина", image: "https://cdn.azbooka.ru/cv/w1100/f85b70c8-f0e4-4104-bd2e-b3de263793d8.jpg" },
    { id: 10, name: "Моби Дик", image: "https://basket-10.wbbasket.ru/vol1426/part142664/142664795/images/big/1.webp" },
    { id: 11, name: "Гарри Поттер и философский камень", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu-27xE5HVMhCp_XxxQnpZ_G1OW8J29o4Icg&s" },
    { id: 12, name: "В поисках утраченного времени", image: "https://imo10.labirint.ru/books/199745/cover.jpg/242-0" },
    { id: 13, name: "О дивный новый мир", image: "https://s2-goods.ozstatic.by/1000/782/121/10/10121782_0.jpg" },
    { id: 14, name: "От нуля к единице", image: "https://static.tildacdn.com/tild3530-3133-4436-a130-653331313862/2book.jpg" }
  ];
  



export default function UserDashboard() {
  const [cart, setCart] = createSignal([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showCart, setShowCart] = createSignal(false);
  const [userName, setUserName] = createSignal("Пользователь");
  const [showProfilePopup, setShowProfilePopup] = createSignal(false);
  const [readerForm, setReaderForm] = createSignal({
    fullName: "",
    address: "",
    contacts: "",
    passportId: "",
    birthDate: "",
  });

  const filteredProducts = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm().toLowerCase())
    );
  };

  const addToCart = (productId) => {
    const product = products.find((prod) => prod.id === productId);
    setCart((prevCart) => [...prevCart, product]);
  };

  const toggleCart = () => {
    const currentState = showCart();
    setShowCart(!currentState);
    console.log("Корзина открыта: ", !currentState);  // Проверка состояния корзины
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup());
  };

  const handleSaveProfile = () => {
    // Сохранение данных профиля
    alert('Данные успешно сохранены!');
    setShowProfilePopup(false); // Закрываем попап после сохранения
  };

  return (
    <div>
      {/* Стили */}
      <style>{`
        body {
          margin: 0;
          font-family: Poppins, sans-serif;
        }
        .container {
          width: 900px;
          margin: auto;
          max-width: 90vw;
          text-align: center;
          padding-top: 10px;
          transition: transform .5s;
        }
        svg {
          width: 30px;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }
        .icon-cart {
          position: relative;
        }
        .icon-cart span {
          position: absolute;
          background-color: red;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          color: #fff;
          top: 50%;
          right: -20px;
        }
        .title {
          font-size: xx-large;
        }
        .account-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        .account {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          margin-top: 20px;
          cursor: pointer;
        }
        .account svg {
          width: 25px;
          margin-right: 10px;
        }
        .listProduct {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .listProduct .item {
          background-color: #EEEEE6;
          padding: 20px;
          border-radius: 20px;
        }
        .listProduct .item h2 {
          font-weight: 500;
          font-size: large;
        }
        .listProduct .item button {
          background-color: rgb(86, 63, 143);
          color: #eee;
          border: none;
          padding: 5px 10px;
          margin-top: 10px;
          border-radius: 20px;
        }
        .listProduct .item button:hover {
          background-color: rgb(70, 52, 120);
        }
        .cartTab {
          width: 300px;
          background-color: #353432;
          color: #eee;
          position: fixed;
          top: 0;
          right: ${showCart() ? "0" : "-300px"};
          bottom: 0;
          display: grid;
          grid-template-rows: 70px 1fr 70px;
          transition: .5s;
          border-radius: 20px 0 0 20px;
      
         }
        .cartTab .close-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          color: #eee;
          cursor: pointer;
          }
        .cartTab h1 {
          padding: 20px;
          margin: 0;
          font-weight: 300;
        }
        .cartTab .btn {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .cartTab button {
          background-color: rgb(86, 63, 143);
          border: none;
          font-family: Poppins;
          font-weight: 500;
          cursor: pointer;
          border-radius: 20px;
          padding: 10px;
          font-size: 16px;
          color: #fff;
        }
        .cartTab .close {
          background-color: #eee;
        }
        .listCart .item img {
          width: 100%;
        }
        .listCart .item {
          display: grid;
          grid-template-columns: 70px 150px 50px 1fr;
          gap: 10px;
          text-align: center;
          align-items: center;
        }
        .listCart .item:nth-child(even) {
          background-color: #eee1;
        }
        .listCart {
          overflow: auto;
        }
        .listCart::-webkit-scrollbar {
          width: 0;
        }
        .search-input {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 20px auto;
          padding: 10px 40px 10px 20px;
          border-radius: 30px;
          background-color: #f5f5f5;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        }
        .search-input input {
          width: 100%;
          height: 40px;
          border: none;
          background: transparent;
          font-size: 16px;
          padding: 0;
          outline: none;
        }
        .search-input .icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
          cursor: pointer;
        }
        .search-input input::placeholder {
          color: #aaa;
        }
        .close-icon {
          cursor: pointer;
          font-size: 30px;
          position: absolute;
          top: 10px;
          right: 10px;
          color: #eee;
        }
        .clear-button {
          background-color: rgb(86, 63, 143);
          color: #fff;
          padding: 10px;
          border: none;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          font-size: 16px;
          margin: 10px;
        }
        .clear-button:hover {
          background-color: rgb(70, 52, 120);
        }

        /* Стиль всплывающего окна профиля */
        .profile-popup {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 20px;
          border-radius: 10px;
          font-size: 18px;
          z-index: 999;
          display: ${showProfilePopup() ? "block" : "none"};
          width: 300px;
          text-align: center;
        }

        .profile-popup input {
          margin: 10px 0;
          padding: 10px;
          width: 80%;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .profile-popup button {
          background-color: rgb(86, 63, 143);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
        }
      `}</style>

      <div class="container">
        <header>
          <div class="title">Каталог книг</div>
          <div class="icon-cart" onClick={toggleCart}>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
            </svg>
            <span>{cart().length}</span>
          </div>
        </header>

        <div class="account-container">
          <div class="account" onClick={toggleProfilePopup}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="30" height="30">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.87 0-7 1.79-7 4v2h14v-2c0-2.21-3.13-4-7-4z"/>
            </svg>
            <span>Привет, {userName()}!</span>
          </div>
        </div>

        <div class="search-input">
          <input
            type="text"
            placeholder="Поиск книг..."
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4-4"
            />
          </svg>
        </div>

        <div class="listProduct">
          {filteredProducts().map((product) => (
            <div class="item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <button onClick={() => addToCart(product.id)}>Взять книгу</button>
            </div>
          ))}
        </div>
      </div>

      <div class={`cartTab`}>
        <div class="close-icon" onClick={toggleCart}>✖</div>
        <h1>Список ваших книг</h1>
        
        <div class="listCart">
          {cart().length === 0 ? (
            <div>Ваш список пуст</div>
          ) : (
            cart().map((item, index) => (
              <div key={index} class="item">
                <img src={item.image} alt={item.name} />
                <div>{item.name}</div>
              </div>
            ))
          )}
        </div>
        <div class="btn">
          <button class="clear-button" onClick={clearCart}>Очистить</button>
        </div>
      </div>

      {/* Попап с профилем */}
      {showProfilePopup() && (
        <div class="profile-popup">
          <h2>Редактирование профиля</h2>
          <input
            type="text"
            value={readerForm().fullName}
            onInput={(e) => setReaderForm({ ...readerForm(), fullName: e.target.value })}
            placeholder="Ф.И.О."
          />
          <input
            type="text"
            value={readerForm().address}
            onInput={(e) => setReaderForm({ ...readerForm(), address: e.target.value })}
            placeholder="Адрес"
          />
          <input
            type="text"
            value={readerForm().contacts}
            onInput={(e) => setReaderForm({ ...readerForm(), contacts: e.target.value })}
            placeholder="Контакты"
          />
          <input
            type="text"
            value={readerForm().passportId}
            onInput={(e) => setReaderForm({ ...readerForm(), passportId: e.target.value })}
            placeholder="Номер паспорта"
          />
          <input
            type="date"
            value={readerForm().birthDate}
            onInput={(e) => setReaderForm({ ...readerForm(), birthDate: e.target.value })}
          />
          <button onClick={handleSaveProfile}>Сохранить</button>
        </div>
      )}
    </div>
  );
}




 





