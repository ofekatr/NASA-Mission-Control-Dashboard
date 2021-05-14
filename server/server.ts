import "dotenv/config";
import app from "./src/app";

const port = process.env.PORT || 8080;

export default app.listen(port, () => {
    console.log(`Server has started. Running on port ${port}`);
});