import { useState, useEffect } from "react";
import List from "./components/List";
import ListItems from "./components/ListItems";
import Alert from "./components/Alert";
import Form from "./components/Form";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [filteredList, setFilteredList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null)
  const [status, setStatus] = useState("All");
  const [alert, setAlert] = useState({
    show: true,
    msg: "",
    type: "",
  });

  useEffect(() => {
    filterHandler();
    saveLocalStorage();
  }, [list, status]);

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredList(list.filter((lists) => lists.completed === true));
        break;

      case "uncompleted":
        setFilteredList(list.filter((lists) => lists.completed === false));
        break;

      default:
        setFilteredList(list);
        break;
    }
  };

  const saveLocalStorage = () => {
    localStorage.setItem("list", JSON.stringify(list));
  };

  const clearList = () => {
    showAlert(true, "list emptied", "danger")
    setList([])
  }

  let currentDate = new Date();
  const formattedDate =
    currentDate.getMonth() +
    1 +
    "-" +
    currentDate.getDate() +
    "-" +
    currentDate.getFullYear() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  return (
    <div className="App">
      <header>
        <h3>Check-List</h3>
      </header>
      <p className="alert">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      </p>

      <Form
        name={name}
        setName={setName}
        list={list}
        setList={setList}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        showAlert={showAlert}
        formattedDate={formattedDate}
        editID={editID}
        setEditID={setEditID}
      />
      <List
        list={list}
        setList={setList}
        filteredList={filteredList}
        showAlert={showAlert}
        setName={setName}
        setIsEditing={setIsEditing}
        setEditID={setEditID}
        isEditing={isEditing}
      />

      <button onClick={clearList}> Clear All </button>
    </div>
  );
}

export default App;
