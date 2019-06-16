import * as React from "react";

import { makeStyles, Theme, StyleRules } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { CTX, TTopics, IState, TChatIitemState } from "./Store"

const useStyles = makeStyles((theme: Theme) => ({
    root: { 
        margin: "50px",
        padding: theme.spacing(3, 2),
        textAlign: "center",
    },
    flex: {
        display: "flex",
        alignItems: "center",
    },
    topicsWindow: {
        width: "30%",
        height: "300px",
        borderRight: "1px solid grey",
    },
    chatWindow: {
        width: "70%",
        height: "300px",
        padding: "20px",
    },
    chatBox: {
        width: "85%",
    },
    button: {
        width: "15%",
    },
}))

const Dashboard: React.FC = (): JSX.Element => {

    const classes: Record<string, string> = useStyles({})

    const { allChats, sendChatAction, users } = React.useContext<IState>(CTX)
    const topics = Object.keys(allChats);

    const [activeTopics, changeActiveTopics] = React.useState<TTopics>(topics[0] as TTopics)
    const [selectValue, changeSelectValue] = React.useState<string>(users[0])
    const [textValue, changeTextValue] = React.useState<string>("")

    return (
        <>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat App
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopics}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem  
                                        button
                                        key={topic}
                                        onClick={(e: React.MouseEvent<{}>) => {
                                            changeActiveTopics((e.target as HTMLElement).textContent as TTopics)
                                        }}
                                    >
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopics].map((chat: TChatIitemState, i: number) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} />
                                    <Typography variant="body1" gutterBottom>{chat.msg}</Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <Select
                        value={selectValue}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            changeSelectValue(e.target.value)
                        }}
                    >
                        {users.map((user: string) => (<MenuItem value={user} key={user}>{user}</MenuItem>))}
                    </Select>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            changeTextValue(e.target.value);
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({from: selectValue, msg: textValue, topic: activeTopics})
                            changeTextValue("")
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </>
    )
}

export default Dashboard;
