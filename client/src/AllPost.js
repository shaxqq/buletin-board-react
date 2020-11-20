import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Fab, TextField, Container, Button, Box, Select, MenuItem, Tabs, Tab, FormControl, InputLabel,  
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
    city: "",
    content: [],
  });
  const [tab, setTab] = useState(0);


  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  const changeTitle = (e) => {
    e.persist();
    setPost((param) => {
      console.log(param)
      return {
        ...param,
        title: e.target.value,
      };
    });
  };
  const changeName = (e) => {
    e.preventDefault();
    setPost((param) => {
      console.log(param)
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

  const TabPanel = () => {
 
    for (let i = 0; i < text.length; i++) {
      const element = text[i].props.children[0].props.children[1].props.children;
    //  console.log(value)
    //  console.log(index)
     
      if(element === `${tab}`) {
        console.log(text[i])
      return( <div>
          <Box p={3}>
            {text[i]}
          </Box>
      </div>)
    } 
  }
    
  }

  console.log(TabPanel())

 
  

  useEffect(() => {
    apis.getAllPost().then((post) => {
        
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
    //  console.log(child._id, child);

            // window.location.href = `/post/${child._id}`
          });
        };

      //  console.log(child.city);
        return (
          <Card key={child._id} className={classes.allCardPost}>
            <CardContent>
              <Typography >
                {child.title}
              </Typography>
              <Typography color="textSecondary" className={classes.allUserPost}>
                {child.city}
              </Typography>
              <Typography >
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
 
 //console.log(text)


 
 

 //const forms = text.map((child)=>{console.log(child)})

  return (
    <div>
       <Container className={classes.createRoot}>
        <Box className={classes.createInputBox}>
          <TextField id="title" label="Title" onChange={changeTitle} />
          <FormControl className={classes.formControl} >
        <InputLabel id="demo-simple-select-label">City </InputLabel>
        <Select
          labelId="city"
          id="city"
          value={post.city}
          onChange={changeName}
          style={{paddingRight: '1px'}}
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

      <div className={classes.postsTable}>
        <Tabs  orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        aria-label="Vertical tabs example">
           <Tab label="Item One" index={0} />
        <Tab label="Item Two"  index={1} />
        <Tab label="Item Three" index={2}/>
        <Tab label="Item four" index={3}/>
           </Tabs>
        
          { text ? <TabPanel /> : null }
          { text ? <TabPanel /> : null }
       
      </div>
     
    </div>
  );
};
//   <TextField id="username" label="nickName" onChange={changeName} />


   
//      <TabPanel value={0} index={0}>
//                 
//      </TabPanel>
//      <TabPanel value={`1`} index={1}>
//      
//      </TabPanel>
//      <TabPanel value={'2'} index={2}>
//      
//      </TabPanel>


//  { text ? <TabPanel value={0} index={0} /> : null }
//  { text ? <TabPanel value={1} index={1} /> : null }
//  { text ? <TabPanel value={2} index={2} /> : null }
