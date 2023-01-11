import React from "react";

const Form = ({
  name,
  setName,
  list,
  setList,
  isEditing,
  setIsEditing,
  showAlert,
  formattedDate,
  editID,
  setEditID
}) => {
  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please enter something", "danger");
    } else if (name && isEditing) {
      //editing
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, text: name };
          }
          return item;
        })
      );
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "edited", "success")
    } else {
      setList([
        ...list,
        {
          text: name,
          completed: false,
          timestamp: formattedDate,
          id: Math.random() * 1000,
        },
      ]);
      showAlert(true, "Added to list", "success");
      setName("");
    }
  };

  return (
    <form>
      <div className="input">
        <input
          type="text"
          value={name}
          onChange={nameHandler}
          placeholder="e.g. chores"
        />
        <button onClick={submitHandler} type="submit">
          Enter
        </button>
      </div>
    </form>
  );
};

export default Form;
