import { useEffect, useState } from 'react';
import { Button, Typography, FormControl, InputLabel, Input, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { createCard, updateCard } from '../state/reducers';
import { v4 as uuidv4 } from 'uuid';
import LayersIcon from '@mui/icons-material/Layers';
import Filter3Icon from '@mui/icons-material/Filter3';
import ScienceIcon from '@mui/icons-material/Science';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterIcon from '@mui/icons-material/Water';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CompressIcon from '@mui/icons-material/Compress';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const CardForm = ({ card, editMode, setEditMode }) => {
  const dispatch = useDispatch();

  const [numberOfTrays, setNumberOfTrays] = useState('');
  const [feedTrayPosition, setFeedTrayPosition] = useState('');
  const [feedQuantity, setFeedQuantity] = useState('');
  const [feedComposition, setFeedComposition] = useState('');
  const [feedTemperature, setFeedTemperature] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [columnPressure, setColumnPressure] = useState('');
  const [typeCon, setTypeCon] = useState('');
  const [rr, setRr] = useState('');
  const [d, setD] = useState('');
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    setCurrentCard(card);
    if (card !== null) {
      setNumberOfTrays(card.numberOfTrays);
      setFeedTrayPosition(card.feedTrayPosition);
      setFeedComposition(card.feedComposition);
      setFeedTemperature(card.feedTemperature);
      setFeedQuantity(card.feedQuantity);
      setColumnPressure(card.columnPressure);
      setTypeCon(card.typeCon);
      setRr(card.rr);
      setFlowRate(card.flowRate);
      setD(card.d);
    } else {
      setNumberOfTrays('');
      setFeedTrayPosition('');
      setFeedComposition('');
      setFeedTemperature('');
      setFeedQuantity('');
      setColumnPressure('');
      setTypeCon('');
      setRr('');
      setFlowRate('');
      setD('');
    }
  }, [card]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dated = new Date();
    const formattedDate = "" + `${dated.toLocaleTimeString()}`;

    const updatedCard = {
      id: currentCard ? currentCard.id : uuidv4(),
      numberOfTrays,
      feedTrayPosition,
      feedComposition,
      feedQuantity,
      rr,
      d,
      columnPressure,
      typeCon,
      feedTemperature,
      flowRate,
      date: formattedDate,
    };

    if (currentCard && editMode) {
      dispatch(updateCard(updatedCard));
      setEditMode(false);
    } else {
      dispatch(createCard(updatedCard));
    }
    // Reset all fields after form submission
    setNumberOfTrays('');
    setFeedTrayPosition('');
    setFeedComposition('');
    setFeedTemperature('');
    setFeedQuantity('');
    setColumnPressure('');
    setTypeCon('');
    setRr('');
    setFlowRate('');
    setD('');
    setCurrentCard(null);
  };
  const handleReset = () => {
    setNumberOfTrays('');
    setFeedTrayPosition('');
    setFeedComposition('');
    setFeedTemperature('');
    setFeedQuantity('');
    setColumnPressure('');
    setTypeCon('');
    setRr('');
    setFlowRate('');
    setD('');
    setCurrentCard(null);
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center" width="90%" ml={2} mt={10}
      bgcolor="#EEEEEE"
      borderRadius={5}
      p={2}
      boxShadow={1}
      zIndex={999}
    >
      <Box m={1}>
        <Typography fontWeight="bold"
          fontSize="1.8rem" color="#393E46">{editMode ? 'Edit' : 'Add'} Details</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={3}>
              <LayersIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Number of Trays">Number of Trays</InputLabel>
                <Input
                  name="Number of Trays"
                  value={numberOfTrays}
                  type="number"
                  inputProps={{ step: 1 }}
                  onChange={(event) =>
                    setNumberOfTrays(parseInt(event.target.value, 10))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <Filter3Icon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Feed Tray Position">Feed Tray Position</InputLabel>
                <Input
                  name="Feed Tray Position"
                  value={feedTrayPosition}
                  type="number"
                  inputProps={{ step: 1 }}
                  onChange={(event) =>
                    setFeedTrayPosition(parseInt(event.target.value, 10))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <ScienceIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Feed Composition">Feed Composition</InputLabel>
                <Input
                  name="Feed Composition"
                  value={feedComposition}
                  onChange={(event) =>
                    setFeedComposition(event.target.value)
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <ScienceIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Feed Quantity">Feed Quantity</InputLabel>
                <Input
                  name="Feed Quantity"
                  value={feedQuantity}
                  type="number"
                  inputProps={{ step: 0.1 }}
                  onChange={(event) =>
                    setFeedQuantity(parseFloat(event.target.value))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <DeviceThermostatIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Feed Temperature">Feed Temperature</InputLabel>
                <Input
                  name="Feed Temperature"
                  value={feedTemperature}
                  type="number"
                  inputProps={{ step: 0.1 }}
                  onChange={(event) =>
                    setFeedTemperature(parseFloat(event.target.value))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <WaterIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Flow Rate">Flow Rate</InputLabel>
                <Input
                  name="Flow Rate"
                  value={flowRate}
                  type="number"
                  inputProps={{ step: 0.1 }}
                  onChange={(event) =>
                    setFlowRate(parseFloat(event.target.value))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <HelpOutlineIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Type of condenser">Type of condenser</InputLabel>
                <Input
                  name="Type of condenser"
                  value={typeCon}
                  onChange={(event) =>
                    setTypeCon(event.target.value)
                  }
                  required={true}
                />
              </FormControl>


            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <CompressIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Column Pressure">Column Pressure</InputLabel>
                <Input
                  name="Column Pressure"
                  value={columnPressure}
                  type="number"
                  inputProps={{ step: 0.1 }}
                  onChange={(event) =>
                    setColumnPressure(parseFloat(event.target.value))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <KeyboardReturnIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="Reflux Ratio">Reflux Ratio</InputLabel>
                <Input
                  name="Reflux Ratio"
                  value={rr}
                  type="number"
                  inputProps={{ step: 0.1 }}
                  onChange={(event) =>
                    setRr(parseFloat(event.target.value))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="flex-end" mt={2}>
              <WaterDropIcon sx={{ color: 'action.active', mr: 2, my: 1.1 }} />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="D">D</InputLabel>
                <Input
                  name="D"
                  value={d}
                  type="number"
                  inputProps={{ step: 0.1 }}
                  onChange={(event) =>
                    setD(parseFloat(event.target.value))
                  }
                  required={true}
                />
              </FormControl>
            </Box>
          </Grid>

        </Grid>
        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#393E46", color: "#EEEEEE" }}
            type="submit"
            fullWidth
          >
            {editMode ? 'Save Changes' : 'Add'}
          </Button>

        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#393E46", color: "#EEEEEE" }}
            onClick={handleReset}
            fullWidth
          >Reset</Button></Box>
      </form>
    </Box>
  );
};
export default CardForm;