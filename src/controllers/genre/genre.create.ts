import { Request, Response } from 'express';
import Genre from '../../models/genere.model';
import { logger } from '../../../app';



const createGenre = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        // validate 
        if (!name || !description || name.trim() === '' || description.trim() === '') {
            return res.status(400).json({ message: 'Name and description are required fields' });
        }

        // Check if already exist
        const existingGenre = await Genre.findOne({ name: name.trim().toLowerCase() });
        if (existingGenre) {
            return res.status(400).json({ message: 'Genre already exists' });
        };


        const genre = await Genre.create({ name, description });
        res.status(201).json(genre);
    }
    catch (err) {
        logger.error(err);
        res.status(500).json({ message: err });
    }
};


export default createGenre;