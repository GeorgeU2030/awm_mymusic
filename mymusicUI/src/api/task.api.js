import axios from 'axios' 

//export const getAllTask = ()=> taskApi.get('/');

//export const getTask = (id)=> taskApi.get('/'+id);

//export const createTask = (task)=> taskApi.post('/',task);

//export const deleteTask = (id)=> taskApi.delete('/'+id);

//export const updateTask = (id,task)=> taskApi.put('/'+id+'/',task);

export const createSong = (song) => {
    return axios.post('http://localhost:8000/mymusic/api/v1/songs/',song,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
};

export const createMusician = (musician) => {
    return axios.post('http://localhost:8000/mymusic/api/v1/musicians/', musician, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
};

export const updateMusician = ({ musicianUpdates, startDate, endDate, week }) => {
  
  const dataToSend = {
    musicianUpdates,
    start_date: startDate,
    end_date: endDate,
    valueweek:week,
  };

  console.log('dataToSend:', dataToSend);

  return axios.post('http://localhost:8000/mymusic/update-musicians/', dataToSend, {
    headers: {
      'Content-Type': 'application/json', // Asegura que el tipo de contenido sea JSON
    },
  })
}