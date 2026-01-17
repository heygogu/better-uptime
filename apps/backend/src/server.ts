import "dotenv/config";
import { app } from "@/index";

app.listen(3001, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
