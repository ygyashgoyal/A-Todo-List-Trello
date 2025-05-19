// src/components/Taskboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskBoard({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const API_URL = "http://localhost:8000"; // or your backend's URL

    const statuses = ["todo", "inprogress", "done"];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks`, {
                    params: { userId: user.uid },
                });
                setTasks(response.data);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
            }
        };

        if (user?.uid) {
            fetchTasks();
        }
    }, [user]);

    const handleDragEnd = (result) => {
        console.log("DRAG END RESULT:", result); // 👈 add this

        const { source, destination, draggableId } = result;

        if (!destination) return;

        // If dropped in the same place, do nothing
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Create a new copy of tasks
        const updatedTasks = Array.from(tasks);

        // Find and remove the dragged task
        const draggedTaskIndex = updatedTasks.findIndex(t => String(t.id) === draggableId);
        if (draggedTaskIndex === -1) return;

        const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);

        // Update task status if moving to a different column
        draggedTask.status = destination.droppableId;

        // Insert the task at its new position
        updatedTasks.splice(destination.index, 0, draggedTask);

        setTasks(updatedTasks);

        // Update backend
        axios.put(`http://localhost:8000/tasks/${draggedTask.id}`, draggedTask)
            .catch(err => console.error("Failed to update task status", err));
    };

    const handleCreateTask = () => {
        console.log("User UID:", user?.uid);
        console.log("Title:", title);
        if (!title.trim() || !user?.uid) {
            console.warn("Missing title or user UID");
            return;
        }

        const newTask = {
            id: crypto.randomUUID(),
            title,
            description,
            status: "todo",
            userId: user.uid,
        };

        axios.post("http://localhost:8000/tasks", newTask)
            .then(() => {
                setTasks((prev) => [...prev, newTask]);
                setTitle("");
                setDescription("");
            })
            .catch((err) => console.error("Error adding task:", err));
    };


    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:8000/tasks/${id}`)
            .then(() => setTasks(prev => prev.filter(task => task.id !== id)));
    };

    const moveTask = (id, newStatus) => {
        const updatedTasks = [...tasks];
        const task = updatedTasks.find(t => t.id === id);
        if (!task) return;

        task.status = newStatus;

        axios.put(`http://localhost:8000/tasks/${task.id}`, task)
            .then(() => setTasks(updatedTasks));
    };

    return (
        <div className="p-6 pt-8">
            {/* Create Task Section */}
            <div className="mb-8 bg-white shadow-lg p-6 rounded-lg flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Title"
                    className="border text-black border-gray-300 p-3 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border text-black border-gray-300 p-3 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    onClick={handleCreateTask}
                    className="bg-blue-600 hover:bg-blue-700 font-bold text-white px-5 py-3 rounded shadow transition"
                >
                    ➕ Add Task
                </button>
            </div>

            {/* Task Columns */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-col md:flex-row gap-6">
                    {statuses.map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    className="bg-gray-100 p-4 rounded-lg w-full md:w-1/3 min-h-[400px] shadow-md"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2 className="text-xl font-bold capitalize mb-4 text-gray-800 border-b pb-2">
                                        {status === "inprogress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
                                    </h2>

                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((task, index) => (
                                            <Draggable draggableId={String(task.id)} index={index} key={task.id}>
                                                {(provided) => (
                                                    <div
                                                        className="bg-white p-4 rounded-md shadow-sm mb-3 cursor-grab active:cursor-grabbing border border-transparent hover:border-blue-300 transition"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="flex justify-between items-center mb-1">
                                                            <div className="flex items-center">
                                                                <span
                                                                    className="mr-2 text-gray-400 text-lg select-none"
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    ⠿
                                                                </span>
                                                                <h4 className="font-semibold text-gray-800">{task.title}</h4>
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                    handleDeleteTask(task.id);
                                                                }}
                                                                className="text-red-500 hover:text-red-700 text-sm ml-2"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>

                                                        {/* Action Buttons */}
                                                        <div className="flex flex-wrap gap-2">
                                                            {status === "todo" && (
                                                                <>
                                                                    <button
                                                                        onClick={() => moveTask(task.id, "inprogress")}
                                                                        className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                                                                    >
                                                                        → In Progress
                                                                    </button>
                                                                    <button
                                                                        onClick={() => moveTask(task.id, "done")}
                                                                        className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded hover:bg-green-200"
                                                                    >
                                                                        ✔ Done
                                                                    </button>
                                                                </>
                                                            )}
                                                            {status === "inprogress" && (
                                                                <>
                                                                    <button
                                                                        onClick={() => moveTask(task.id, "todo")}
                                                                        className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                                                                    >
                                                                        → To Do
                                                                    </button>
                                                                    <button
                                                                        onClick={() => moveTask(task.id, "done")}
                                                                        className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded hover:bg-green-200"
                                                                    >
                                                                        ✔ Done
                                                                    </button>
                                                                </>
                                                            )}
                                                            {status === "done" && (
                                                                <>
                                                                    <button
                                                                        onClick={() => moveTask(task.id, "todo")}
                                                                        className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                                                                    >
                                                                        → To Do
                                                                    </button>
                                                                    <button
                                                                        onClick={() => moveTask(task.id, "inprogress")}
                                                                        className="text-yellow-600 text-xs bg-yellow-100 px-2 py-1 rounded hover:bg-yellow-200"
                                                                    >
                                                                        ↺ In Progress
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );

}
