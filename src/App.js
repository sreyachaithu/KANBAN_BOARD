import React, { useState } from "react";

const initialData = {
  columns: {
    todo: {
      name: "To Do",
      color: "#FF6B6B", // red-ish
      items: [
        { id: 1, content: "Learn React" },
        { id: 2, content: "Build a Kanban board" },
      ],
    },
    inProgress: {
      name: "In Progress",
      color: "#4ECDC4", // teal
      items: [],
    },
    done: {
      name: "Done",
      color: "#556270", // dark blue-gray
      items: [],
    },
  },
};

function App() {
  const [columns, setColumns] = useState(initialData.columns);

  const moveItem = (fromCol, toCol, itemId) => {
    if (fromCol === toCol) return;

    const itemToMove = columns[fromCol].items.find((item) => item.id === itemId);

    setColumns((prev) => {
      const newFromItems = prev[fromCol].items.filter((item) => item.id !== itemId);
      const newToItems = [...prev[toCol].items, itemToMove];

      return {
        ...prev,
        [fromCol]: { ...prev[fromCol], items: newFromItems },
        [toCol]: { ...prev[toCol], items: newToItems },
      };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: 20,
        height: "100vh",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {Object.entries(columns).map(([colId, col]) => (
        <div
          key={colId}
          style={{
            width: 300,
            padding: 15,
            borderRadius: 8,
            backgroundColor: col.color,
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>{col.name}</h2>
          {col.items.length === 0 && (
            <p style={{ textAlign: "center", fontStyle: "italic" }}>No tasks</p>
          )}
          {col.items.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 6,
                padding: 12,
                marginBottom: 12,
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                color: "#333",
                userSelect: "none",
              }}
            >
              <p style={{ marginBottom: 10 }}>{item.content}</p>
              <div style={{ textAlign: "right" }}>
                {Object.keys(columns)
                  .filter((id) => id !== colId)
                  .map((targetColId) => (
                    <button
                      key={targetColId}
                      onClick={() => moveItem(colId, targetColId, item.id)}
                      style={{
                        marginLeft: 5,
                        padding: "5px 10px",
                        fontSize: 12,
                        borderRadius: 4,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: columns[targetColId].color,
                        color: "#fff",
                        opacity: 0.85,
                        transition: "opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.85)}
                    >
                      Move to {columns[targetColId].name}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
