import { makeStyles } from "@material-ui/core/styles";
import sidenav from "./sidenav.jpg";

export const useStyles = makeStyles((theme)=>({
    rootNav: {
      position: 'absolute',
    },
    rootContent: {
        display: 'flex',
        background: '#a5a1a16e',
        height: '100vh',
        overflow: 'overlay',
    },
    rootContainer: {
        marginTop: '90px',
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
        width: '250px'
      },
      bar2: {
        color: 'grey',
      },
      list: {
        width: 250,
        padding: 0,
        background: "rgba(225, 240, 255, 0.8)",
        height: "100%"
      },
      itemLogo: {
        height: 88,
        display: "flex",
        justifyContent: "center"
      },
      item: {
        height: 30
      },
      links: {
        textDecoration: "none"
      },
      menuHeader: {
        paddingLeft: "30px"
      },
      logo: {
        color: "#2196f3"
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      nested: {
        paddingLeft: theme.spacing(4),
        height: 30
      },
      bgImg: {
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${sidenav})`,
        backgroundRepeat: "no-repeat"
      },
      listActive: {
        background: "rgba(0, 0, 0, 0.14)"
      },
      rootSwitches: {
        flexGrow: 1,
        overflow: "hidden",
        padding: theme.spacing(0, 3),
      },
      paper: {
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
      title: {
          margin: '20px 0 0 20px',
      },
      titleDesc: {
          marginLeft: '25px',
      },
}))