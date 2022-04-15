import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import * as spotsActions from '../redux/spotsActions';
import { Card, CardContent, Typography, Divider, Chip, Stack} from '@mui/material';
function SpotDetails(props) {

    const { id } = useParams();
    const [spot, setSpot] = useState({
        name: '',
        description: '',
        state: {
            name: ''
        } 
    });
    
    useEffect(() => {
        async function getInfo() {
            const data = await props.getSpotById(id);

            setSpot(data.data.data);
        }
        getInfo();
    }, [id])
    return (
        <Box style={{paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%'}}>
            <Card>
                <CardContent>

                    <Typography variant='h6'>
                        {spot.name }
                    </Typography>
                    <Divider style={{marginBottom: '10px'}}></Divider>
                    <Stack style={{marginBottom: '15px'}} direction="row" spacing={1}>
                        {spot.term === 1 && <Chip label="Short Term" />}
                        {spot.term === 2 && <Chip label="Long Term" />}
                        {spot.term === 3 && <Chip label="Both Term" />}
                    </Stack>
                    <Typography  style={{marginBottom: '15px'}} variant="body2" component="div">
                        {spot.description}
                    </Typography>

                    <Typography variant="subtitle">
                        Direccion
                    </Typography>
                    <Divider style={{marginBottom: '10px'}}></Divider>
                    <Typography style={{marginBottom: '15px'}} color="text.secondary">
                        {spot.street} {spot.state.name}
                    </Typography>

                    <Typography variant="subtitle">
                        Dimensiones
                    </Typography>
                    <Divider style={{marginBottom: '10px'}}></Divider>
                    <Typography color="text.secondary">
                        {spot.square_space}<small>m<sup>2</sup></small>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
const mapStateToProps = (reducers) => {
    return reducers.spotsReducer
}

export default connect(mapStateToProps, spotsActions)(SpotDetails)