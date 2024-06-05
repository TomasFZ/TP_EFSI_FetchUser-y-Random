import { useEffect, useState } from "react";

const UsersList = () => {
  const urlApi = "https://randomuser.me/api/?results=5";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(urlApi)
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.log('Hubo un error ' + error));
  }, []);

  const abrirModal = (user) => {
    setSelectedUser(user); //selectedUser toma los valores de un user en la lista users. se selecciona al usuario pasado por parametros y apartir de su info se arma el modal con sus detalles. 
  };

  const cerrarModal = () => {
    setSelectedUser(null);
  };

  let modal = null;
if (selectedUser !== null) { //Yo agregarÃ­a para ver la foto de la persona arriba del texto a la hora de abrir el modal :) - Temporaly 
  modal = (
    <div className="modal" onClick={cerrarModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="blocc">{selectedUser.name.first + " " + selectedUser.name.last}</h2>
        <p>Email: {selectedUser.email}</p>
        <p>Telefono: {selectedUser.phone}</p>
        <p>Localidad: {selectedUser.location.city}, {selectedUser.location.country}</p>
      </div>
    </div>
  );
}

return (
  <div>
    <h1 className="paddedText">Listado: </h1>
    <ul className="user-list">
      {users.map((user, index) => (
        <li key={index} className="user-card" onClick={() => abrirModal(user)}>
          {user.name.first + " " + user.name.last}
        </li>
      ))}
    </ul>

    {modal}
  </div>
);

};

export default UsersList;
