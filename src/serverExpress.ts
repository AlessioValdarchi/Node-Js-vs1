import "dotenv/config";

import app from "./appExpress";

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
