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
import { useState, useEffect } from "react";
import Tasks from "./Tasks";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";

export default function ListTask() {
  const { todos, setTodos } = useContext(TaskContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  // const [alignment, setAlignment] = useState("web");
  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };
  // filtration arrays
  const completedTodos = todos.filter((t) => t.isCompleted);
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  let displayedTodos = todos;
  if (displayedTodosType === "done") {
    displayedTodos = completedTodos;
  } else if (displayedTodosType === "still") {
    displayedTodos = notCompletedTodos;
  } else if (displayedTodosType === "all") {
    displayedTodos = todos;
  }
  const todo = displayedTodos.map((t) => {
    return <Tasks key={t.id} todo={t} />;
  });
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storedTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  }
  return (
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
  );
}
