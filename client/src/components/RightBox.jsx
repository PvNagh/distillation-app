import { useState, useEffect, useContext } from 'react';
import { Typography, Card, CardContent, CardMedia, CardActions, IconButton, Grid, Divider, Checkbox, FormControlLabel, Button, CardActionArea, Avatar, CircularProgress } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, removeCard } from '../state/reducers';
import { AccountContext } from '../context/AccountProvider';
import Modal from './Modal';
import { getResult } from '../service/api';

const RightBox = ({ onEditCard }) => {

    const cards = useSelector((state) => state.cards);
    const dispatch = useDispatch();

    const [selectedCards, setSelectedCards] = useState([]);
    const [openIframe, setOpenIframe] = useState(false);
    const [clickedCard, setClickedCard] = useState(null);
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { account } = useContext(AccountContext);

    const handleDeleteCard = (cardId) => {
        console.log(cardId);
        dispatch(removeCard(cardId));
    };

    const handleEditCard = (card) => {
        onEditCard(card);
    };

    useEffect(() => {
        dispatch(fetchCards());
    }, [onEditCard]);

    const handleCardClick = async (card) => {
        setIsLoading(true);
        setClickedCard(card);

        const response = await getResult(card);
        console.log(response);
        setOutput(response);
        setIsLoading(false);
        setOpenIframe(true);

    }

    const handleMultipleDeleteCard = () => {
        selectedCards.forEach((cardId) => dispatch(removeCard(cardId)));
        setSelectedCards([]);
    };

    const handleCardSelect = (cardId) => {
        if (selectedCards.includes(cardId)) {
            setSelectedCards(selectedCards.filter((id) => id !== cardId));
        } else {
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    return (
        <Box alignItems="center" width="96%">
            {isLoading && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    width="100%"
                    position="absolute"
                    bgcolor="rgba(0, 0, 0, 0.5)"
                    zIndex={9999}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                >
                    <CircularProgress color="primary" />
                </Box>
            )}
            <Box mt={4} >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={13} mb={1}>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        fontWeight="bold"
                        color={cards.length > 0 ? "#222831" : "textSecondary"}
                    >
                        {cards.length > 0 ? "Cards" : "Your cards will appear here..."}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        {selectedCards.length > 0 && (
                            <Box mr={2} >
                                <Button
                                    variant="contained" color="error"
                                    onClick={handleMultipleDeleteCard}>
                                    Delete selected cards
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    {cards.map((card) => (
                        <Grid item xs={12} md={6} lg={3} key={card.id}>
                            <Card style={{ backgroundColor: '#EEEEEE' }}>
                                <CardActionArea onClick={() => handleCardClick(card)}>
                                    <CardMedia
                                        component="img"
                                        color="#f0f0f0"
                                        height="150"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Colonne_distillazione.jpg/250px-Colonne_distillazione.jpg"
                                        title={card.numberOfTrays}
                                    />
                                </CardActionArea>
                                <CardContent>
                                    <Grid container spacing={4}
                                        style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Grid item><Typography gutterBottom variant="h6">
                                            {account.name} </Typography>  </Grid><Grid item> <Avatar
                                                alt="User"
                                                src={account.picture}
                                                style={{ marginLeft: 'auto' }}
                                            /></Grid>
                                    </Grid>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p">
                                        {card.date}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <IconButton onClick={() => handleEditCard(card)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={0.000001} alignItems="center">
                                                <Grid item>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={selectedCards.includes(card.id)}
                                                                onChange={() => handleCardSelect(card.id)}
                                                            />
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <IconButton onClick={() => handleDeleteCard(card.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Modal
                    card={clickedCard}
                    open={openIframe}
                    output={output}
                    onClose={() => setOpenIframe(false)}
                />
            </Box>
        </Box>
    );
};

export default RightBox;