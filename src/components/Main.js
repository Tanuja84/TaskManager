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
    'To Do': [],
    'Doing': [],
    'Deferred': [],
    'Closed': [],
  });

  const exportToExcel = () => {
    const wb = xlsx.utils.book_new();

    Object.keys(tasks).forEach((column) => {
      const data = tasks[column].map((task, index) => ({
        Task: task,
        Index: index + 1, // Add an index for reference
      }));

      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, column);
    });

    xlsx.writeFile(wb, 'task_management.xlsx');
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
            tasks={tasks['To Do']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'To Do': newTasks })}
          />
          <Doingtask
            title="Doing"
            tasks={tasks['Doing']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'Doing': newTasks })}
          />
          <Differed
            title="Deferred"
            tasks={tasks['Deferred']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'Deferred': newTasks })}
          />
          <Closedtask
            title="Closed"
            tasks={tasks['Closed']}
            setTasks={(newTasks) => setTasks({ ...tasks, 'Closed': newTasks })}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default Main;
