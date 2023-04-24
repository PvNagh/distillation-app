import { Dialog, DialogTitle, DialogContent, Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const dialogStyle = {
    height: '70%',
    width: '70%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
};
const cardStyle = {
    boxShadow: 'none', 
};
const gridStyle = {
    margin: 0, 
    width: '100%',
};

const Modal = ({ open, onClose, card,output}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{ sx: dialogStyle }}
        >
            <DialogTitle color="#222831">Results:</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={gridStyle}>
                    <Grid item xs={6}>
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography variant="h6" color="#222831">Input Values:</Typography>
                                <Typography variant="body1">Number of Trays: {card?.numberOfTrays}</Typography>
                                <Typography variant="body1">Feed Tray Position: {card?.feedTrayPosition}</Typography>
                                <Typography variant="body1">Feed Composition: {card?.feedComposition}</Typography>
                                <Typography variant="body1">Feed Quantity: {card?.feedQuantity}</Typography>
                                <Typography variant="body1">Feed Temperature: {card?.feedTemperature}</Typography>
                                <Typography variant="body1">Feed Flow Rate: {card?.flowRate}</Typography>
                                <Typography variant="body1">Type of condenser: {card?.typeCon}</Typography>
                                <Typography variant="body1">Column Pressure: {card?.columnPressure}</Typography>
                                <Typography variant="body1">Reflux Ratio: {card?.rr}</Typography>
                                <Typography variant="body1">D: {card?.d}</Typography>
                                
                            </CardContent>
                        </Card>
                        <Card sx={cardStyle}>
                            <CardContent>
                                <Typography variant="h6" color="#222831">Output Values:</Typography>
                                <Typography variant="body1">Distillate Composition: {output}</Typography>
                                <Typography variant="body1">Bottoms Composition: </Typography>
                                <Typography variant="body1">Distillate Flow Rate: </Typography>
                                <Typography variant="body1">Bottoms Flow Rate: </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardMedia component="img" src="https://ars.els-cdn.com/content/image/3-s2.0-B978012816994000004X-f04-05-9780128169940.jpg" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>

        </Dialog>
    );
};

export default Modal;