import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Todotask from './Todotask';
import Doingtask from './Doingtask';
import Differed from './Differed';
import Closedtask from './Closedtask';
import * as xlsx from 'xlsx';

function Main(props) {
  const [tasks, setTasks] = useState({
    'ToDo': [],
    'Doing': [],
    'Deferred': [],
    'Closed': [],
  });


  const exportToExcel = () => {
    const wb = xlsx.utils.book_new();
    const data = [['To Do', 'Doing', 'Deferred', 'Closed']];

    const maxLength = Math.max(
      tasks['ToDo'].length,
      tasks['Doing'].length,
      tasks['Deferred'].length,
      tasks['Closed'].length
    );

    for (let i = 0; i < maxLength; i++) {
      const rowData = [
        tasks['ToDo'][i] || '',
        tasks['Doing'][i] || '',
        tasks['Deferred'][i] || '',
        tasks['Closed'][i] || '',
      ];
      data.push(rowData);
    }

    const ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Task Management');
    xlsx.writeFile(wb, 'task_management.xlsx');
  };

  const handleToDoListUpdate = (updatedToDoList) => {
    setTasks({ ...tasks, 'ToDo': updatedToDoList });
  };
  const handleDoingListUpdate = (updatedToDoList) => {
    setTasks({ ...tasks, 'Doing': updatedToDoList });
  };
  const handleDefferedListUpdate = (updatedToDoList) => {
    setTasks({ ...tasks, 'Deferred': updatedToDoList });
  };
  const handleClosedListUpdate = (updatedToDoList) => {
    setTasks({ ...tasks, 'Closed': updatedToDoList });
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mainCls">
        <div className="divCls">
          <span className="spanCls">{props.title}</span>
          <button className="exportButton" onClick={exportToExcel}>
            Export Excel
          </button>
        </div>
        <div className="card-container">
          <Todotask className="mycls1"
            title="To Do"
            tasks={tasks['ToDo']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'ToDo': newTasks })}
            onToDoListUpdate={handleToDoListUpdate}
          />
          <Doingtask
            title="Doing"
            tasks={tasks['Doing']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'Doing': newTasks })}

            onDoingListUpdate={handleDoingListUpdate}
          />
          <Differed
            title="Deferred"
            tasks={tasks['Deferred']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'Deferred': newTasks })}

            onDifferedListUpdate={handleDefferedListUpdate}
          />
          <Closedtask
            title="Closed"
            tasks={tasks['Closed']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'Closed': newTasks })}
            onClosedListUpdate={handleClosedListUpdate}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default Main;
