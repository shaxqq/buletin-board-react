import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        background: '#a5a1a16e',
        height: '100vh',
        overflow: 'overlay',
    },
    rootContainer: {
     
    },
    createRoot: {          
          display: "flex",
          flexDirection: 'column',
          width: '80%',
          marginBottom: '20px'
      },
      createContent: {
        margin: theme.spacing(2),
        display: "flex",
      },
      createButton: {
        marginRight: 18,
      },
      createInputBox: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: '35px',
      },
      createInputField: {
        marginTop: '35px',
      },
      userPost: {
        marginBottom: 12,
      },
      footerCardPost: {
        display: "flex",
        justifyContent: "flex-end",
      },
      titleCardPost: {
        display: "flex",
       justifyContent: 'space-between',
      },
      createPost: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "35px 10px 15px 0",
      },
      textPost: {
        marginRight: 18,
      },
      cardPost: {
        marginBottom: '10px',
        background: '#c8c8c8',
      },
      postsTable: {
        flexGrow: 1,
        display: 'flex',
        height: '100%',
        marginBottom: '20px',

      },
      formControl: {
        minWidth: 120,
      },
      cardActual: {
        padding: '0 25px',
        display: 'flex',
        flexDirection: 'column-reverse',
      },
      tabColor: {
        color: 'grey',
        '& active': {
          color: 'red'
        },
        overflow: "inherit",
      },
      MuiTab:{
        textColorPrimary: {
          color: 'green',
          '& active': {
            color: 'red'
          },
      }
      },
      bar1: {
        color: 'red',
      },
      bar2: {
        color: 'grey',
      },
      
}))