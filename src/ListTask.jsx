import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect, useMemo } from "react";
import Tasks from "./Tasks";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";

import { useToast } from "./contexts/ToastContext";
// dialog imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function ListTask() {
  // new changes for lifting edit
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    details: "",
  });
  // ends here
  const { showHideToast } = useToast();

  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [modalTodo, setModalTodo] = useState(null);
  const { todos, setTodos } = useContext(TaskContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      ("calling completedTodos filter");
      return t.isCompleted;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      ("calling not completedTodos filter");
      return !t.isCompleted;
    });
  }, [todos]);

  let displayedTodos = todos;
  if (displayedTodosType === "done") {
    displayedTodos = completedTodos;
  } else if (displayedTodosType === "still") {
    displayedTodos = notCompletedTodos;
  } else if (displayedTodosType === "all") {
    displayedTodos = todos;
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storedTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // handlers
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddTask() {
    const newTask = {
      id: uuidv4(),
      title: titleInput,
      details: "this is ayoub ",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showHideToast("Task added successfully!");
  }
  function handleDeleteModal(todo) {
    setModalTodo(todo);
    setshowDeleteModal(true);
  }
  function handleModalDeleteClose() {
    setshowDeleteModal(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== modalTodo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setshowDeleteModal(false);

    showHideToast("Task deleted successfully!");
  }
  // here the handlers for the edit

  function handleUpdateModal(todo) {
    setModalTodo(todo);
    setUpdatedTodo({ title: todo.title, details: todo.details }); // set actual data

    setshowUpdateModal(true);
  }
  function handleModalUpdateClose() {
    setshowUpdateModal(false);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == modalTodo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setshowUpdateModal(false);
    showHideToast("Task updated successfully!");
  }
  const todo = displayedTodos.map((t) => {
    return (
      <Tasks
        key={t.id}
        todo={t}
        showDelete={handleDeleteModal}
        showUpdate={handleUpdateModal}
      />
    );
  });
  return (
    <>
      <Dialog
        onClose={handleModalDeleteClose}
        open={showDeleteModal}
        closeAfterTransition={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          are you sure you want to delete this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            handout create a lazy people im not impress with you want something
            in life why dont you go and get it
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalDeleteClose}>close</Button>
          <Button onClick={handleDeleteConfirm}>confirm</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleModalUpdateClose}
        open={showUpdateModal}
        closeAfterTransition={false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">edit yout task</DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="email"
              label="task title"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="email"
              label="task details"
              type="email"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, details: e.target.value })
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalUpdateClose}>close</Button>
          <Button onClick={handleUpdateConfirm}>confirm</Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h2" sx={{ color: "black" }}>
              to-do list
            </Typography>
            <Divider />

            {/*====  filter button  ====*/}

            <ToggleButtonGroup
              color="primary"
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="Platform"
            >
              <ToggleButton value="all">all</ToggleButton>
              <ToggleButton value="done">done</ToggleButton>
              <ToggleButton value="still">still</ToggleButton>
            </ToggleButtonGroup>
            {/* -----------the of filter button ------ */}
            {/* all task  */}
            {/* <Tasks></Tasks> */}
            {todo}
            {/* here is the input and the add button  */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label="Task Name"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "98%" }}
                  onClick={() => {
                    // Add task logic here

                    handleAddTask();
                  }}
                  disabled={titleInput <= 0}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
