import axios from 'axios';

const simular = async () => {
    try {
        const response = await axios.post('http://localhost:4000/final/simular', { cant_iteraciones_a_mostrar: 5000, dia_inicio_muestra: 2, hora_inicio_muestra: 0 });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

const colasServices = {
    simular
}

export { colasServices }