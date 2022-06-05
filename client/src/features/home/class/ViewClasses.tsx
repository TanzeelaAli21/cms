import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import {useAppDispatch, useAppSelector} from '../../../hooks';
import { useNavigate } from "react-router-dom";
import { courseTableHead } from "../../../models/course.model";
import { getClassesAsync } from './classes.slice';
import useGetHeight from "../../../custom hooks/useGetHeight";

const ViewClass = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const getClasses = async () => await dispatch(getClassesAsync(localStorage.getItem('token') as string));
    getClasses();
  },[])
  const {classes} = useAppSelector(state=> state.classes);
  const state = useAppSelector(state=> state);

  console.log('........classes..............', state);
  
  const handleCLick = () => {
    navigate("/courses/add");
  };    
  return (
    <>
      <Button
        onClick={handleCLick}
        variant="contained"
        color="primary"
        startIcon={<Add />}
      >
        Add Class
      </Button>
      <br /> <br />
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer
        sx={{maxHeight: (+useGetHeight().height-175)}}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {courseTableHead.map((item, index) => (
                <TableCell sx={{ fontWeight: 'bold'}} key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.length <=0 ? (
              "NO Course found"
            ) : classes.map(item => (
              <TableRow key={item.id} hover>
                <TableCell style={{minWidth: 100}}>{item.courseId}</TableCell>
                <TableCell style={{minWidth: 100}}>
                  <IconButton
                    onClick={() => navigate(`/courses/${item.id}`)}
                    color="success"
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </>
  );
};

export default ViewClass;
