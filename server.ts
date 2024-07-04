import http from 'http';
import app from './app';
import connectDatabase from './src/database/connection';
const port = process.env.PORT || 3000;
import createAdmin from './src/lib/autoCreateAdmin';


const startserver = async () => {
    try {
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });


        // Others functions here
        await connectDatabase();
        await createAdmin();
    }
    catch (error) {
        console.error(error);
    }
}


startserver();

