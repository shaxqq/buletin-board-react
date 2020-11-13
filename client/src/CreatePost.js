import React, { useState } from "react";
import { TextField, Container, Button, Box } from "@material-ui/core";
import apis from "./api/api";
import { useStyles } from "./styles";

export const CreatePost = () => {
  const classes = useStyles();
  const [post, setPost] = useState({
    title: "",
    username: "",
    content: "",
  });
  const changeTitle = (e) => {
    e.persist();
    setPost((param) => {
      return {
        ...param,
        title: e.target.value,
      };
    });
  };
  const changeName = (e) => {
    e.persist();
    setPost((param) => {
      return {
        ...param,
        username: e.target.value,
      };
    });
  };
  const changeContent = (e) => {
    e.persist();
    setPost((param) => {
      return {
        ...param,
        content: e.target.value,
      };
    });
  };
  const handlePost = async () => {
    await apis.createPost(post).then(() => {
      if(post.content === ''){
        window.alert("Нужно заполнить все поля");
        return post
      }
      window.alert("Post add success");
      setPost(post);
      window.location.href = "/";
      console.log(post.content);
    });
  };
  return (
    <div >
      <Container className={classes.createRoot}>
        <Box className={classes.createInputBox}>
          <TextField id="title" label="Title" onChange={changeTitle} />
          <TextField id="username" label="nickName" onChange={changeName} />
        </Box>
        <TextField
          id="content"
          label="Text"
          rows={3}
          multiline
          rowsMax={50}
          className={classes.createInputField}
          onChange={changeContent}
        />
      </Container>
      <Container className={classes.createContent}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.createButton}
          href={"/"}
        >
          отменить
        </Button>
        <Button color="primary" variant="contained" onClick={handlePost}>
          добавить
        </Button>
      </Container>
    </div>
  );
};
