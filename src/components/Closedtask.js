import React, { useState } from 'react';

function Closedtask(props) {
  const [inputText, setInputText] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const updateParentToDoList = (updatedList) => {
    props.onClosedListUpdate(updatedList);
  };


  // Add Task
  const addList = () => {
    if (inputText.trim() !== '') {
      if (editIndex !== null) {
        const updatedList = [...toDoList];
        updatedList[editIndex] = inputText;
        setToDoList(updatedList);
        setEditIndex(null);
      } else {
        setToDoList([...toDoList, inputText]);
      }
      setInputText('');
    }

    updateParentToDoList(toDoList);
  };

  // Delete Task
  const removeTask = (index) => {
    const updatedList = [...toDoList];
    updatedList.splice(index, 1);
    setToDoList(updatedList);
    setEditIndex(null);

    updateParentToDoList(toDoList);
  };


  // Edit Task
  const editTask = (index) => {
    setInputText(toDoList[index]);
    setEditIndex(index);

    updateParentToDoList(toDoList);
  };

  const taskCount = toDoList.length.toString().padStart(2, '0');

  return (
    <div className="clsoecls">
      <div className="titleCls">
        Closed Task
        <span className="spnCls1">{taskCount}</span>
      </div>
      <hr />
      <div className="titleCls">
        <input
          className="inputCls"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="btnCls" onClick={addList}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
        <div className="divCls1">
          {toDoList.map((task, index) => (
            <div className="taskContainer" key={index}>
              <div className="inputContainer">
                <input
                  className="inputCls1"
                  type="text"
                  value={task}
                  readOnly
                />
                <div className="buttonContainer">
                  <img className="imgCls" src="/edit.png" alt="Edit Icon" onClick={() => editTask(index)} />
                  <img className="imgCls" src="/delete.png" alt="Delete Icon" onClick={() => removeTask(index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Closedtask;
