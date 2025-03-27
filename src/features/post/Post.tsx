import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store/store";
import { addPost, removePost } from "./postSlice";
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";


import { useEffect } from "react";
import { fetchPostsRequest } from "./postSlice";



export default function Post() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.counter.ArrayPostsState);
  const [searchTerm, setSearchTerm] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const deletePost = (id: number) => {
    dispatch(removePost(id));
  };

  const { ArrayPostsState, loading, error } = useSelector((state: RootState) => state.counter);
    const filteredPosts = ArrayPostsState.filter((post) =>
    post.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const addNewPost = () => {
    if (nombre.trim() && descripcion.trim()) {
      const newPost = {
        id: posts.length + 1,
        nombre,
        descripcion,
      };
      dispatch(addPost(newPost));
      setNombre("");
      setDescripcion("");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        margin: "auto",
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        Posts
      </Typography>

      <TextField
        label="Filtrar por nombre"
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Eliminar</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.nombre}</TableCell>
                <TableCell>{post.descripcion}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => deletePost(post.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <TextField
          label="Nombre"
          variant="outlined"
          size="small"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          size="small"
          fullWidth
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addNewPost}>
          Crear
        </Button>
      </Box>
    </Box>
  );
}

