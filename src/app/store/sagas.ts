import { call, put, takeLatest } from "redux-saga/effects";
import {fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure, removePost, addPost, addPostSuccess } from "../../features/post/postSlice";
import { PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  nombre: string;
  descripcion: string;
}

async function fetchPostsApi(): Promise<Post[]> {
  const response = await fetch("http://localhost:3000/api/posts");
  if (!response.ok) {
    throw new Error("Error al obtener los posts");
  }
  return response.json();
}

async function removePostApi(action: PayloadAction<number>): Promise<Post> {
    const response = await fetch(`http://localhost:3000/api/posts/${action.payload}`, {
      method: "DELETE",
    });
    console.log(response)
    if (!response.ok) {
      throw new Error("Error al eliminar el post");
    }
    return response.json();
  }

async function addPostApi(action: PayloadAction<Post>): Promise<Post> {
    const response = await fetch(`http://localhost:3000/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        "post_name": action.payload.nombre, 
        "post_desc": action.payload.descripcion
      })
    });
  
    if (!response.ok) {
      throw new Error("Error al crear el post");
    }
  
    return response.json();
  }

  function* addPostSaga(action: PayloadAction<Post>) {
    try {
      const post: Post = yield call(addPostApi, action);
      yield put(addPostSuccess(post));
    } catch (error) {
      console.error('Error en addPostSaga:', error);
    }
  }


function* fetchPostsSaga(): Generator<unknown, void, Post[]> {
  try {
    const posts: Post[] = yield call(fetchPostsApi);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchPostsFailure(error.message));
    } else {
      yield put(fetchPostsFailure("Error desconocido"));
    }
  }
}

export function* watchFetchPosts() {
    yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
    yield takeLatest(removePost.type, removePostApi);
    yield takeLatest(addPost.type, addPostSaga);
}

