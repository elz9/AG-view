"use client";

import { useState } from "react";
import styles from "./TaskBoard.module.css";

const MOCK_TASKS = [
  { id: "1", title: "Setup agent infrastructure", status: "backlog", assignee: "human" },
  { id: "2", title: "Configure LLM endpoints", status: "in-progress", assignee: "agent" },
  { id: "3", title: "Test memory retrieval", status: "review", assignee: "agent" },
  { id: "4", title: "Deploy to staging", status: "done", assignee: "human" },
];

const COLUMNS = [
  { id: "backlog", label: "Backlog" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const getTasksByStatus = (status: string) => tasks.filter((t) => t.status === status);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Task Board</h2>
      </div>
      <div className={styles.board}>
        {COLUMNS.map((col) => (
          <div key={col.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <span className={styles.columnTitle}>{col.label}</span>
              <span className={styles.columnCount}>{getTasksByStatus(col.id).length}</span>
            </div>
            <div className={styles.columnContent}>
              {getTasksByStatus(col.id).map((task) => (
                <div key={task.id} className={styles.taskCard}>
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.taskMeta}>
                    <span className={`${styles.assignee} ${styles[task.assignee]}`}>
                      {task.assignee === "agent" ? "🤖" : "👤"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
