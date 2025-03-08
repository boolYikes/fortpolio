import React, { useEffect, useState } from "react";
import { Typography, Grid2 } from "@mui/material";
import axios from 'axios';

const Stacks = () => {
    const [stacks, setStacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/test')
        .then(resp => setStacks(resp.data))
        .catch(err => console.error('Error!: ', err));
    }, []);

    return (
        <Grid2 container spacing={2} sx={{ width: '80%', margin: 'auto' }}>
            {stacks.map((stack) => (
                <Grid2 item xs={12} sm={6} md={4} key={stack.id}>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        {stack.title}
                    </Typography>
                </Grid2>
            ))}
        </Grid2>
    )
}

export default Stacks