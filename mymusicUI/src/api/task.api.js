import axios from 'axios' 

//export const getAllTask = ()=> taskApi.get('/');

//export const getTask = (id)=> taskApi.get('/'+id);

//export const createTask = (task)=> taskApi.post('/',task);

//export const deleteTask = (id)=> taskApi.delete('/'+id);

//export const updateTask = (id,task)=> taskApi.put('/'+id+'/',task);

export const createSong = (song) => {
    return axios.post('http://localhost:8000/mymusic/api/v1/songs/',song);
};

export const createMusician = (musician) => {
    return axios.post('http://localhost:8000/mymusic/api/v1/musicians/', musician, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
};