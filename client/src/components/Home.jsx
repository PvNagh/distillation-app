import { useState } from 'react';
import { Box } from '@mui/system';
import Navbar from "./Navbar";
import CardForm from './CardForm';
import RightBox from './RightBox';

const Home = () => {
    
    const [editMode, setEditMode] = useState(false);
    const [cardToEdit, setCardToEdit] = useState(null);

    const handleEditCard = (card) => {
        setCardToEdit(card);
        setEditMode(true);
    };

    return (
        <Box>
            <Navbar />
            <Box
                display="flex"
                flexDirection="row"
                style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/ag-square.png)' }}
                justifyContent="center"
                alignItems="flex-start"
                height="100vh">
                <Box m={1} width="30%">
                    <CardForm
                        editMode={editMode}
                        setEditMode={setEditMode}
                        card={cardToEdit}
                    />
                </Box>
                <Box width="70%">
                    <RightBox onEditCard={handleEditCard} />
                </Box>
            </Box>
        </Box>
    );
};

export default Home;