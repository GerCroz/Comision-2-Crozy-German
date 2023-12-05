import express from 'express';
import cors from 'cors';
import { startDb } from './src/settings/database.js';
import { config } from './src/settings/config.js';
import { authRouter} from './src/routes/auth.routes.js';
import { postRouter} from './src/routes/post.routes.js';
import { commentRouter} from './src/routes/comment.routes.js';

const app = express();
const port = config.port;

app.use(express.json());
app.use(cors());

app.use('/api', authRouter)
app.use('/api', postRouter)
app.use('/api', commentRouter)

app.listen(port, async () => {
    await startDb({uri: config.mongo_uri, database: config.database_name })
    console.log(`server listening on http://localhost:${port}`);
})
