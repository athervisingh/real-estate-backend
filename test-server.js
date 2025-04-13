import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

// app.get("*", (req, res) => {
//   console.log("req",req.url)
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

app.listen(5000, () => {
  console.log("Test server running on http://localhost:5000");
});