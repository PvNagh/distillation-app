import { useState, useEffect, useContext } from 'react';
import { Typography, Card, CardContent, CardActions, IconButton, Grid, Divider, Avatar, CircularProgress, CardHeader } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, removeCard } from '../state/reducers';
import { AccountContext } from '../context/AccountProvider';
import Modal from './Modal';
import { getResult } from '../service/api';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const RightBox = ({ onEditCard }) => {

    const cards = useSelector((state) => state.cards);
    const dispatch = useDispatch();

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
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    {cards.map((card) => (
                        <Grid item xs={12} md={6} lg={3} key={card.id}>
                            <Card style={{ backgroundColor: '#EEEEEE' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt="User"
                                            src={account.picture}
                                            style={{ marginLeft: 'auto' }}
                                        />
                                    }

                                    title={<Typography sx={{ color: "#222831" }}>{account.name}</Typography>}
                                    subheader={card.date}
                                />
                                <CardContent>
                                    <Typography variant="body1" color="textSecondary">Number of Trays: {card?.numberOfTrays}</Typography>
                                    <Typography variant="body1" color="textSecondary">Feed Tray Position: {card?.feedTrayPosition}</Typography>
                                    <Typography variant="body1" color="textSecondary">Feed Composition: {card?.feedComposition}</Typography>
                                    <Typography variant="body1" color="textSecondary">Feed Temperature: {card?.feedTemperature}</Typography>
                                    <Typography variant="body1" color="textSecondary">Feed Flow Rate: {card?.flowRate}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid container spacing={4} justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <IconButton onClick={() => handleCardClick(card)}>
                                                <PlayCircleFilledWhiteIcon
                                                    sx={{ color: "#393E46" }}
                                                />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={1} alignItems="center">
                                                <Grid item>
                                                    <IconButton onClick={() => handleEditCard(card)}>
                                                        <EditIcon sx={{ color: "#393E46" }} />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton onClick={() => handleDeleteCard(card.id)}>
                                                        <DeleteIcon sx={{ color: "#393E46" }} />
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