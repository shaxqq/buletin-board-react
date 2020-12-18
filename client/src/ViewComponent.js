import React, { useEffect, useState } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import apis from "./api/api";
import EditIcon from "@material-ui/icons/Edit";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const TabPanel = ({ children, value, index }) => {
  return <div>{value === index && <div>{children}</div>}</div>;
};

const ViewComp = (props) => {
  const {
    changeTitle,
    changeName,
    changeContent,
    handlePost,
    updatePost,
    tab,
    handleChange,
    postsByCity,
    open,
    dateFormat,
    visible,
    post,
    handleClose,
    setPost,
    setVisible,
    classes,
    posts
  } = props;

  const [not, setNot] = useState(false);
  const [cit, setCity] = useState('');
  //const las = Object.keys(postsByCity).map((city) => postsByCity[city][city.length -1])
  //const las2 = las.map((post)=> post)
 
  useEffect(() => {
    if (posts.length > localStorage.getItem("count")){
   //     console.log(posts.length > localStorage.getItem("count"))
        let lasti = posts[posts.length -1].city
        // console.log(lasti)
        // console.log(posts)
   //     console.log(postsByCity)
   //     console.log(posts[posts.length -1])
   //     console.log(Object.keys(postsByCity).map((city) => postsByCity[city][city.length]))
        setNot(true)
        setCity(lasti)
    }
    localStorage.setItem("count", posts.length)
  }, [posts]);
 //console.log(localStorage)

    return (
      <div>
      <Container className={classes.createRoot}>
        <Box className={classes.createInputBox}>
          <TextField
            id="title"
            label="Nickname"
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
              <MenuItem value={'Предложения по обучению'}>Предложения по обучению</MenuItem>
              <MenuItem value={'Предложения по КЛН'}>Предложения по КЛН</MenuItem>
              <MenuItem value={'Общие предложения'}>Общие предложения</MenuItem>
              <MenuItem value={'Решённые/Отклонены'}>Решённые/Отклонены</MenuItem>
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
           // onClick={localStorage.clear()}
            href='/'
          >
            отменить
          </Button>
          {visible ? (
            <Button
              color="primary"
              variant="contained"
              visible="true"
              onClick={handlePost}
            >
              добавить
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              visible="false"
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
          style={{ overflow: "inherit" }}
        >
          {Object.keys(postsByCity).map((city) => (
            <Tab
              label={city}
              value={city}
              key={city}
              className={`tab-link ${+city === +cit && not? `${classes.bar1}` : ''}`}
               style={{ width: '250px' }}
              onClick={()=> city === cit ? setNot(false) : ''}
             // onClick={console.log(city)}
             // onClick={console.log(cit)}

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
                    <Typography style={{ marginTop: "25px", whiteSpace: 'pre-wrap' }}>
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
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Пост добавлен!
        </Alert>
      </Snackbar>
    </div>
  );
}

export { ViewComp };
