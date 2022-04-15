const INITIAL_STATE = {
    spots: [],
    totalSpots: 0
}

const spotsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'get_spots':
            return { ...state, spots: action.payload.spots, totalSpots: action.payload.total }
        default: return state;
    }
}
export default spotsReducer;