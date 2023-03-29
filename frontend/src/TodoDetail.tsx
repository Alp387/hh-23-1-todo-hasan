import React, {useEffect, useState} from "react";
import {Todo} from "./Todo";
import axios from "axios";
import {useParams} from "react-router-dom"
import {Typography} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom"

export default function TodoDetail() {

    const [todo, setTodo] = useState<Todo>()

    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            loadTodoById(id)
        }
    }, [])

    function loadTodoById(id: string) {
        axios.get("/api/todo/" + id)
            .then((response) => {
                setTodo(response.data)
            })
            .catch((error) => {
                toast.error("Todo not found")
            })

        return (
            <div>
                {todo
                    ? <div><Typography>(todo.id)</Typography>
                        <Typography>(todo.description)</Typography>
                        <Typography>(todo.status)</Typography>
                    </div>
                    : <div> waiting... </div>
                }</div>
        )
    }
}

