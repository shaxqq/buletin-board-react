import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        background: '#a5a1a16e'
    },
    rootContainer: {
        width: '80%',
    },
    createRoot: {          
          display: "flex",
          flexDirection: 'column'
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
      allUserPost: {
        marginBottom: 12,
      },
      allFooterCardPost: {
        display: "flex",
        justifyContent: "flex-end",
      },
      allCreatePost: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "35px 10px 15px 0",
      },
      allTextPost: {
        marginRight: 18,
      },
      allCardPost: {
        marginBottom: '10px',
        background: '#c8c8c8'
      },
      postsTable: {
        flexGrow: 1,
        display: 'flex',
        height: 224,
        
      },
      formControl: {
        minWidth: 120,
      },
}))