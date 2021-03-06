import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Fab,
  TextField,
  Container,
  Button,
  Box,
  Select,
  MenuItem,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// import AddIcon from "@material-ui/icons/Add";
import apis from "./api/api";
import { useStyles } from "./styles";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const TabPanel = ({ children, value, index }) => {
  return <div>{value === index && <div>{children}</div>}</div>;
};

const groupBy = (xs, fn) => {
  return xs.reduce(function (rv, x) {
    (rv[fn(x)] = rv[fn(x)] || []).push(x);
    return rv;
  }, {});
};
const dateFormat = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const monthString = month >= 10 ? month : `0${month}`;
  const dayString = day >= 10 ? day : `0${day}`;
  return `${date.getFullYear()}-${monthString}-${dayString} ${hour}:${minutes}`;
};

export const AllPost = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    title: "",
    city: "",
    content: [],
  });
  const [tab, setTab] = useState("0");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  const changeTitle = (e) => {
    e.persist();
    setPost((param) => {
      // console.log(param);
      return {
        ...param,
        title: e.target.value,
      };
    });
  };
  const changeName = (e) => {
    e.preventDefault();
    setPost((param) => {
      //   console.log(param);
      return {
        ...param,
        city: e.target.value,
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
      if (post.content === "") {
        window.alert("Нужно заполнить все поля");
        return false;
      }
      if (post.title === "") {
        window.alert("Нужно заполнить все поля");
        return false;
      }
      if (post.city === "") {
        window.alert("Нужно заполнить все поля");
        return false;
      }
      apis.getAllPost().then((post) => {
        setPosts(post.data.data);
        setOpen(true);
        setPost(()=>{
          return {
            title: '',
            city: "",
            content: []
          };
        });
      });
    });
  };
  const updatePost = async () => {
    await apis.updatePostById(post._id, post).then(() => {
      apis.getAllPost().then((post) => {
        setPosts(post.data.data)})
        setVisible(true)
        setPost(()=>{
          return {
            title: '',
            city: "",
            content: []
          };
        });
    });
  };

  // console.log(TabPanel())

  useEffect(() => {
    apis.getAllPost().then((post) => {
      setPosts(post.data.data);
    });
  }, []);

  const postsByCity = groupBy(posts, (post) => post.city);
  const items = Object.keys(postsByCity).map((city)=> postsByCity[city].length)

  useEffect(() => {
    if (items > localStorage.getItem("count")){
        setColor(true)
        setCount(items)
        localStorage.setItem("count", items)
    }
  }, [items]);

  console.log('item>loacl',items > localStorage.getItem("count"))
  console.log('items ', items)
  console.log('local ', localStorage.getItem("count"))

  console.log('count ', count)
  console.log('color', color)
//  const tabStyle = () => {
//    {(window.localStorage.getItem("count") < count) ?  setColor(true) :  setColor(false) }
//  };
//    console.log(color)
//
 // console.log(Object.keys(postsByCity).map((city)=> postsByCity[city].length))

  return (
    <div>
      <Container className={classes.createRoot}>
        <Box className={classes.createInputBox}>
          <TextField
            id="title"
            label="Title"
            onChange={changeTitle}
            value={post.title}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Options </InputLabel>
            <Select
              labelId="city"
              id="city"
              value={post.city}
              onChange={changeName}
              style={{ paddingRight: "1px" }}
            >
              <MenuItem value={`0`}>option-0</MenuItem>
              <MenuItem value={`1`}>option-1</MenuItem>
              <MenuItem value={`2`}>option-2</MenuItem>
              <MenuItem value={`3`}>option-3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="content"
          label="Text"
          rows={6}
          multiline
          value={post.content}
          rowsMax={50}
          className={classes.createInputField}
          onChange={changeContent}
        />
        <Container className={classes.createContent}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.createButton}
            href={"/"}
          >
            отменить
          </Button>
          {visible ? (
            <Button
              color="primary"
              variant="contained"
              visible="false"
              onClick={handlePost}
            >
              добавить
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              visible="true"
              onClick={updatePost}
            >
              обновить
            </Button>
          )}
        </Container>
      </Container>
      <div className={classes.postsTable}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          textColor="primary"
          style={{ overflow: "inherit", }}
        >
          {Object.keys(postsByCity).map((city) => (
                <Tab
                  label={city}
                  value={city}
                  key={city}
                  // onClick={console.log('city', +city)}
                  // onClick={console.log('color', +color)}
                  // onClick={console.log( 'items--', items )}
                  // onClick={console.log('items-', +city === +color && items.map((key)=>items[key]))}
            //      onClick={console.log('items1', items)}
                  onClick={()=> setColor(false)}
                  className={`${+city == +count && color ? `${classes.bar1}` : `${classes.bar2}`}`}
                  
                  //   className={classes.tabColor}
                />
          ))}
        </Tabs>
        {Object.keys(postsByCity).map((city) => (
          <TabPanel
            value={tab}
            index={city}
            key={city}
            style={{ height: "50%", color: "green" }}
          >
            <Box className={classes.cardActual}>
              {postsByCity[city].map((post) => (
                <Card key={post._id} className={classes.cardPost}>
                  <CardContent>
                    <Box className={classes.titleCardPost}>
                      <Typography>{post.title}</Typography>
                      <Typography>{dateFormat(new Date(post.date))}</Typography>
                    </Box>
                    {/* <Typography */}
                    {/* color="textSecondary" */}
                    {/* className={classes.userPost} */}
                    {/* > */}
                    {/* {post.city} */}
                    {/* </Typography> */}
                    <Typography
                      style={{ marginTop: "25px", whiteSpace: "pre-wrap" }}
                    >
                      {post.content}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.footerCardPost}>
                    <Fab
                      color="primary"
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        setPost(post);
                        setVisible(false);
                      }}
                    >
                      <EditIcon />
                    </Fab>

                    <Fab
                      color="secondary"
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(`Удалить данный пост ${post._id} ?`)
                        ) {
                          apis.deletePostById(post._id);
                          window.location.reload();
                        }
                      }}
                    >
                      <DeleteIcon />
                    </Fab>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </TabPanel>
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Пост добавлен!
        </Alert>
      </Snackbar>
    </div>
  );
};