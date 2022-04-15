import { connect } from 'react-redux';
import * as spotsActions from '../redux/spotsActions';
import { Select, Button, InputLabel, MenuItem,
    ListItem, List,FormControl, Slider } from '@mui/material';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
function Filter(props) {

	const handleSubmitFilters = (data) => {
        console.log(data)
        props.getSpotsByFilters(data);

	}

    const schema = yup.object().shape({
        type: yup.string(),
        term: yup.string()
    });

    const { register, handleSubmit } = useForm({
        resolver : yupResolver(schema),
        mode: "onTouched"
    });

    return(
        <form onSubmit={handleSubmit(handleSubmitFilters)}>
            <List>
                <ListItem button>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo de Spot</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tipo de Spot"
                            inputlabelprops={{
                                shrink: true,}}
                                {...register("type")}
                            value={""}
                        >
                            <MenuItem value={"1"}>Street Spot</MenuItem>
                            <MenuItem value={"2"}>In mall Spot</MenuItem>
                            <MenuItem value={"3"}>In mall island</MenuItem>
                            <MenuItem value={"4"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo de Renta</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Tipo de Renta"
                            inputlabelprops={{
                                shrink: true,}}
                                {...register("term")}
                            value={""}
                        >
                                <MenuItem value={"1"}>Short Term</MenuItem>
                                <MenuItem value={"2"}>Long Term</MenuItem>
                                <MenuItem value={"3"}>Both</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <InputLabel id="demo-simple-select-label">Tamaño (<small>m<sup>2</sup></small>)</InputLabel>
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
    
                        <Slider inputlabelprops={{
                                shrink: true,}}
                                {...register("square_space")} aria-label="Tamaño" defaultValue={50} valueLabelDisplay="auto" />
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <Button type='submit' fullWidth variant="contained">Buscar</Button>
                </ListItem>
    
            </List>
        </form>

    );
}
// export default MapComp;
const mapStateToProps = (reducers) => {
    return reducers.spotsReducer
}

export default connect(mapStateToProps, spotsActions)(Filter)