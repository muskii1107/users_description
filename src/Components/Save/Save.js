import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography , Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
     width: '100%',
     marginTop:'2rem'
    }
  }));

function Save(props) {
    const classes = useStyles();
    const { home , id, name, description, change, isUpdate, save} = props;
  return (
    <div>
          <TextField
          className={classes.root}
          label="UserId"
          disabled={isUpdate}
          placeholder="Placeholder"
          name="id"
          value={id}
          onChange={change}
        />
          <TextField
          className={classes.root}
          label="Username"
          placeholder="Placeholder"
          name="name"
          value={name}
          onChange={change}
        />
        <TextField
          className={classes.root}
          label="User's Description"
          placeholder="User's Description"
          name="description"
          value={description}
          onChange={change}
          multiline
          rows={3}
        />
        <Typography className={classes.root}>
        <Button onClick = { save } style={{marginRight : '2rem'}} variant="contained" color="primary">SAVE</Button>
        <Button onClick = { home } variant="contained" color="secondary">GO TO HOME</Button>
        </Typography>
    </div>
  )
}

export default Save;