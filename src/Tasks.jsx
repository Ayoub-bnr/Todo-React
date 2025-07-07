import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";
import { useState } from "react";
// dialog imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
export default function Tasks({ todo }) {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TaskContext);
  // events handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleDeleteClick() {
    setshowDeleteModal(true);
  }
  function handleUpdateClick() {
    setshowUpdateModal(true);
  }

  function handleModalDeleteClose() {
    setshowDeleteModal(false);
  }
  function handleModalUpdateClose() {
    setshowUpdateModal(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
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
  }
  return (
    <>
      {/* this is the modal for delting  */}

      <Dialog
        onClose={handleModalDeleteClose}
        open={showDeleteModal}
        closeAfterTransition={false}
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
      {/* this is the modal for delting  */}

      {/* this the modal for editing  */}
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
      {/* this the modal for editing  */}
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#437057",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                sx={{
                  textAlign: "left",
                  padding: "5px 10px",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
                variant="h5"
              >
                {todo.title}
              </Typography>
              <Typography
                sx={{ textAlign: "left", padding: "5px 10px" }}
                variant="h6"
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 4 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* the check button  */}
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "3px solid #8bc34a",
                  transition: "all 0.3s  ",
                  "&:hover": {
                    backgroundColor: "black",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                  transition: "all 0.3s  ",

                  "&:hover": {
                    backgroundColor: "black",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={handleUpdateClick}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/* the delete button  */}
              <IconButton
                aria-label="delete"
                sx={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "solid #b23c17 3px",
                  transition: "all 0.2s !important ",
                  "&:hover": {
                    backgroundColor: "black",
                    boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
