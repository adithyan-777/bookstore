import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import { Button, DeleteForeverIcon } from '@material-ui/core'
import Api from '../Api'

const useStyles = makeStyles((theme) => ({
    books: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export const AuthorTable = ({
    loaded,
    authors,
    count,
    apicall,
    handleClose,
}) => {
    const classes = useStyles()
    const [Addmodal, setAddmodal] = useState(false)
    const [Upmodal, setUpmodal] = useState(false)

    const upauthorOpen = () => {
        setUpmodal(true)
    }
    const upauthorClose = () => {
        setUpmodal(false)
    }
    const addauthorOpen = () => {
        setAddmodal(true)
    }
    const addauthorClose = () => {
        setAddmodal(false)
    }
    const handledelete = (id) => {
        Api.delete(`author/${id}`).then((res) => {
            console.log(res)
            apicall()
            handleClose()
        })
    }
    const handleUpdate = (authordata) => {
        upauthorOpen()
        return authordata
    }
    if (!loaded) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Author</TableCell>
                                <TableCell align="right">No of Books</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map((author, i) => (
                                <TableRow key={author._id}>
                                    <TableCell component="th" scope="row">
                                        {i}
                                    </TableCell>
                                    <TableCell align="right">
                                        {author.author}
                                    </TableCell>
                                    <TableCell align="right">
                                        {count[author.author] || '0'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={() => handleUpdate(author)}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            onClick={addauthorOpen}
                                        >
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
