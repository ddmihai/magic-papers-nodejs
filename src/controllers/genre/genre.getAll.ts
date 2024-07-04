import { Request, Response } from 'express';
import Genre from '../../models/genere.model';
import { logger } from '../../../app';

const getALlGenre = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find();
        return res.status(200).json(genres);
    }

    catch (error) {
        logger.error('Error getting all genres', error);

        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        else {
            return res.status(400).json(error);
        }
    }
};

export default getALlGenre;

