import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const  navigate = useNavigate();

    const role =
    localStorage.getItem("role");

        const validationSchema =
                Yup.object({
                    title: Yup.string().required("Title Required"),
                    description: Yup.string().required("Description Required"),
                    priority: Yup.string().required("Priority Required"),
                    assignedTo: Yup.string().required("User Required"),
                    dueDate: Yup.string().required("Due date Required"),
                });

    const fetchTasks = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setTasks(res.data.tasks || res.data);
        } catch (error) {
            console.log(error);
        }
    };
       const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            setUsers(res.data.data);
        } catch (error) {
            console.log(error);
        }
       };
       useEffect(() => {
        fetchTasks();
        fetchUsers();
       }, []);

        const handleCreate = async (values,
            { resetForm }) => {
            try {
                await axios.post(
                    "http://localhost:5000/api/tasks",
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                 resetForm();
                 fetchTasks();
            } catch (error) {
                console.log(error);
            }
        };

          const handleDelete = async (id) => {
            try {
                await axios.delete(
                    `http://localhost:5000/api/tasks/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                fetchTasks();
            } catch (error) {
                console.log(error);
            }
        };
           const handleUpdate = async (id) => {
            const newTitle = prompt("Enter new title");
            if (!newTitle) return;
            try {
                await axios.put(
                    `http://localhost:5000/api/tasks/${id}`,
                    {title:newTitle},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                fetchTasks();
            } catch (error) {
                console.log(error);
            }
        };
           const handleStatusChange = async (id,
            status) => {
                try {
                    await axios.put(`http://localhost:5000/api/tasks/${id}`,
                        { status: status },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );
                     fetchTasks();
                } catch (error) {
                    console.log(error);
                }
            };

             const handleLogout = () => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/");
             };
              return (
                <>
                    <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
                    <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
                    {role === "admin" && (
                        <p className="text-blue-600 text-center mb-2">You are Admin</p>
                    )}
                    {role === "employee" && (
                        <p className="text-center mb-2">You are Employee</p>
                    )}
                     {role === "admin" && (
                        <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            priority: "",
                            assignedTo: "",
                             dueDate: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleCreate}
                        >
                            <Form className="space-y-3 mb-6">
                                      <Field 
                                        name="title"
                                        placeholder="Enter Task title"
                                        className="w-full border p-2 rounded" />
                                        <ErrorMessage 
                                        name="title"
                                        component="div"
                                        className="text-red-500 text-sm" />

                                        <Field 
                                        name="description"
                                        placeholder="Enter Description"
                                        className="w-full border p-2 rounded" />
                                        <ErrorMessage 
                                        name="description"
                                        component="div"
                                        className="text-red-500 text-sm" />

                                        <Field 
                                        as="select"
                                        name="priority"
                                        placeholder="Enter Priority"
                                        className="w-full border p-2 rounded">
                                            <option value="">Select Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            </Field>
                                        <ErrorMessage 
                                        name="priority"
                                        component="div"
                                        className="text-red-500 text-sm" />

                                        <Field 
                                        as="select"
                                        name="assignedTo"
                                        className="w-full border p-2 rounded">
                                        <option value="">Select User</option>
                                        {users.map((user) => (
                                            <option key={user._id}
                                            value={user._id}>
                                                {user.name}
                                            </option>
                                        ))}
                                        </Field>

                                        <ErrorMessage 
                                        name="assignedTo"
                                        component="div"
                                        className="text-red-500 text-sm" />

                                        <Field 
                                        type="date"
                                        name="dueDate"
                                        className="w-full border p-2 rounded" />
                                        <ErrorMessage 
                                        name="dueDate"
                                        component="div"
                                        className="text-red-500 text-sm" />

                                           <button 
                                           type="submit"
                                        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-500">Add Task</button>
                            </Form>
                    
                        </Formik>
                     )}
                     
                       <h3 className="text-lg font-bold mb-2">Tasks</h3>
                       <div className="space-y-3">

                        {tasks.map((task) => (
                            <div 
                            key={task._id}
                            className="border p-3 rounded shadow-sm">

                                <p className="font-bold">
                                    {task.title}
                                </p>
                                <p>
                                    Description: {task.description}
                                </p>
                                <p>
                                    Priority: {task.priority}
                                </p>
                                <p>
                                    assignedTo: {task.assignedTo?.name || task.assignedTo}
                                </p>
                                <p>
                                   Due Date: {task.dueDate}
                                </p>
                                 <p>
                                    Status: {task.status}
                                 </p>

                                 {role === "employee" && (
                                  <select 
                                  value={task.status}
                                  onChange={(e) => 
                                    handleStatusChange(task._id,
                                        e.target.value)}
                                        className="border p-1 rounded">
                                            <option
                                            values="pending">Pending</option>
                                              <option
                                            values="in-progress">In-Progress</option>
                                              <option
                                            values="completed">Completed</option>
                                        </select>
                                 )}
                                {role === "admin" && (
                                    <div className="flex gap-2 mt-2">
                                        <button 
                                        onClick={() => handleUpdate(task._id)}
                                        className="bg-yellow-400 px-3 py-1 rounded">Update</button>

                                        <button 
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-400 px-3 py-1 rounded">Delete</button>
                                        </div>
                                )}
                                </div>
                        ))}
                       </div>
                         <button 
                             onClick={handleLogout}
                             className="mt-6 w-full bg-gray-800 text-white py-2 rounded">Logout</button>
                             </div>
                             </div>
                             </>
              );
            }   
                     
 export default Dashboard;