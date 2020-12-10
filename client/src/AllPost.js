import React, { useState, useEffect } from "react";
import apis from "./api/api";
import { useStyles } from "./styles";
import { ViewComp } from './ViewComponent'

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
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    title: "",
    city: "",
    content: [],
  });
  const [tab, setTab] = useState("0");
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const badgeVisible = () => {
    // setVisible(!visible);
  };
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
        return post;
      }
      setOpen(true);
      setPost(post);
      apis.getAllPost().then((post) => {
        setPosts(post.data.data);
      });
      
      setPost(() => {
        return {
          title: '',
          city: "",
          content: []
        };
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

  useEffect(() => {
    apis.getAllPost().then((post) => {
      setPosts(post.data.data);
    });
  }, [post]);
  const classes = useStyles();
  const postsByCity = groupBy(posts, (post) => post.city);

  return <ViewComp 
            classes={classes}
            postsByCity={postsByCity}
            updatePost={updatePost}
            handlePost={handlePost}
            changeContent={changeContent}
            changeName={changeName}
            changeTitle={changeTitle}
            handleChange={handleChange}
            handleClose={handleClose}
            dateFormat={dateFormat}
            posts={posts}
            post={post}
            setPost={setPost}
            tab={tab}
            open={open}
            visible={visible}
            setVisible={setVisible}
          />;
};

//   <TextField id="username" label="nickName" onChange={changeName} />

//  { text ? <TabPanel value={0} index={0} /> : null }
//  { text ? <TabPanel value={1} index={1} /> : null }
//  { text ? <TabPanel value={2} index={2} /> : null }


