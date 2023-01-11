import React from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { BsTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi"

const ListItems = ({
  text,
  id,
  list,
  setList,
  lists,
  showAlert,
  timestamp,
  setIsEditing,
  setEditID,
  setName,
}) => {
  const deleteHandler = () => {
    setList(list.filter((item) => item.id !== lists.id));
    showAlert(true, "Item deleted", "success");
  };

  const completeHandler = () => {
    setList(
      list.map((item) => {
        if (item.id === lists.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const editHandler = () => {
    const specificItem = list.find((item) => item.id == lists.id);
    setIsEditing(true);
    setEditID(lists.id);
    setName(specificItem.text);
  };

  return (
    <div>
      <ul>
        <li>
          <button className="checkBox" onClick={completeHandler}>
            {lists.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
          </button>
        </li>
        <li className={`${lists.completed ? "completed" : ""}`} key={id}>
          {text}
        </li>
        <li>
          <button className="trashButton" onClick={editHandler}>
            <BiEditAlt />
          </button>
        </li>
        <li>
          <button className="trashButton" onClick={deleteHandler}>
            <BsTrashFill />
          </button>
        </li>

        <li>
          <p style={{ color: "gray", fontSize: "10px" }}>{timestamp}</p>
        </li>
      </ul>
    </div>
  );
};

export default ListItems;
