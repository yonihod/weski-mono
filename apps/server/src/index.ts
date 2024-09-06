import express, { type Request, type Response } from "express";
import cors from "cors";
import { getAllHotels } from "./provider";
import { MAX_GROUP_SIZE, PORT } from "./constants";
import { Query } from "shared-types";
import z from "zod";

const app = express();
app.use(express.json());
app.use(cors());

const sseResults = async (req: Request<{}, {}, {}, Query>, res: Response) => {
  const query = req.query;
  const querySchema = z
    .object({
      ski_site: z.number(),
      group_size: z.number(),
      from_date: z.string(),
      to_date: z.string(),
    })
    .safeParse(query);

  if (!querySchema.success) {
    res.status(400).json({ error: querySchema.error });
    return;
  }

  // Set headers for server-sent events
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const groupSizes = ((groupSize: number) => {
    const sizes = [groupSize];
    for (let i = groupSize; i <= Math.min(groupSize + 2, MAX_GROUP_SIZE); i++) {
      sizes.push(i);
    }
    return sizes;
  })(querySchema.data.group_size);

  const fetchAll = async (query: Query) => {
    const promises = groupSizes.map(async (groupSize) => {
      return getAllHotels({ ...query, group_size: groupSize });
    });

    Promise.allSettled(promises).then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          res.write(`data: ${JSON.stringify(result.value)}\n\n`);
        } else {
          console.error(result.reason); // Log error
          res.write(`data: ${JSON.stringify(result.reason)}\n\n`); // Send error message if any
        }
      });
    });
  };

  fetchAll(querySchema.data);
};

app.get("/s", (req: Request<{}, {}, {}, Query>, res) => {
  sseResults(req, res).catch((error) => {
    console.error("Stream failed:", error);
    res.status(500).json({ error: error.message });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
