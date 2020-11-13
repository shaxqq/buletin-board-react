import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Fab, TextField, Container, Button, Box 
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
 // import AddIcon from "@material-ui/icons/Add";
import apis from "./api/api";
import { useStyles } from "./styles";

export const AllPost = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [post, setPost] = useState({
    title: "",
    username: "",
    content: [],
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
    //  console.log(post.content);
    });
  };

 // console.log(text.config);

  const postContent = useEffect(() => {
    apis.getAllPost().then((post) => {
      //   setText(post)
      const dataPost = post.data.data.map((child) => {
        const deletePost = (e) => {
          e.preventDefault();
          if (window.confirm(`Удалить данный пост ${child._id} ?`)) {
            apis.deletePostById(child._id);
            window.location.reload();
          }
        };
        const updatePost = async () => {
          await apis.updatePostById(child._id, child).then(() => {
  //          console.log(child._id, child);

            // window.location.href = `/post/${child._id}`
          });
        };

   //     console.log(child);
        return (
          <Card key={child._id} className={classes.allCardPost}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {child.title}
              </Typography>
              <Typography color="textSecondary" className={classes.allUserPost}>
                {child.username}
              </Typography>
              <Typography variant="body2" component="p">
                {child.content}
              </Typography>
            </CardContent>
            <CardActions className={classes.allFooterCardPost}>
              <Fab
                color="primary"
                aria-label="edit"
                size="small"
                onClick={updatePost}
              >
                <EditIcon />
              </Fab>

              <Fab
                color="secondary"
                aria-label="delete"
                size="small"
                onClick={deletePost}
              >
                <DeleteIcon />
              </Fab>
            </CardActions>
          </Card>
        );
      });
      return setText(dataPost);
    });
  }, []);
 // console.log(text);
 // console.log(postContent);

  return (
    <div>
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
      {text}
    </div>
  );
};
