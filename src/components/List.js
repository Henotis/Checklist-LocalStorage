import React from "react";
import ListItems from "./ListItems";

const List = ({
  list,
  setList,
  filteredList,
  showAlert,
  setIsEditing,
  setName,
  setEditID,
}) => {
  return (
    <div className="listContainer">
      {filteredList.map((lists) => {
        const { text, id, timestamp } = lists;
        return (
          <ListItems
            key={id}
            timestamp={timestamp}
            list={list}
            lists={lists}
            setList={setList}
            text={text}
            showAlert={showAlert}
            setIsEditing={setIsEditing}
            setName={setName}
            setEditID={setEditID}
          />
        );
      })}
    </div>
  );
};

export default List;
