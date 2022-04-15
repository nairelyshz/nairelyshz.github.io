import axios from "axios";


export const getSpots = () => async (dispatch) => {
    const headers = {
        "headers": {
            "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        }
    }
    const response = await axios.get(process.env.REACT_APP_BASE_URL + "/spots", headers);
    const spots = [];
    response.data.data.spots.map((spot) => spots.push({...spot, lat: spot.latitude, lng: spot.longitude}));
    dispatch({
        type:'get_spots',
        payload: {spots, total: response.data.meta.total}
    })

}

export const getSpotsByFilters = (data) => async (dispatch) => {
    const headers = {
        "headers": {
            "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        }
    }
    const response = await axios.get(process.env.REACT_APP_BASE_URL + `/spots?type=${data.type}&term=${data.type}&square_space=${data.square_space}`, headers);
    const spots = [];
    response.data.data.spots.map((spot) => spots.push({...spot, lat: spot.latitude, lng: spot.longitude}));
    dispatch({
        type:'get_spots',
        payload: spots
    })

}


export const getSpotById = (id) => async (dispatch) => {
    const headers = {
        "headers": {
            "Authorization": "Bearer " + process.env.REACT_APP_TOKEN
        }
    }
    const response = await axios.get(process.env.REACT_APP_BASE_URL + "/spots/" + id, headers);
    return response;

}

