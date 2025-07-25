import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTodos } from "./contexts/TaskContext";

import { useToast } from "./contexts/ToastContext";
export default function Tasks({ todo, showDelete, showUpdate }) {
  const { dispatch } = useTodos();
  const { showHideToast } = useToast();
  // events handlers
  function handleCheckClick() {
    const isBecomingCompleted = !todo.isCompleted;

    dispatch({ type: "btnCheck", payload: todo });

    if (isBecomingCompleted) {
      showHideToast("Task completed successfully!");
    } else {
      showHideToast("Task marked as incomplete");
    }
  }

  function handleDeleteClick() {
    showDelete(todo);
  }
  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
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
              {/* the editing button  */}
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
