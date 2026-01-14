import { xAckBulk, xReadGroup } from "@repo/redisstore/client";
import { prisma, HealthStatus } from "@repo/database";

import axios from "axios";
const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

if (!REGION_ID) {
  throw new Error("No region id is provided");
}

if (!WORKER_ID) {
  throw new Error("No worker id is provided");
}

async function main() {
  while (1) {
    //read from stream

    const response = await xReadGroup(REGION_ID, WORKER_ID);
    if (!response) {
      continue;
    }
    //process the website and store the result in the db

    let promises = response.map(({ message }) =>
      fetchWebsites(message.url, message.id)
    );

    await Promise.all(promises);

    //TODO :: It should be routed through a queue in a bulk DB update

    //ack back
    xAckBulk(
      REGION_ID,
      response.map(({ id }) => id)
    );
  }
}

async function updateDB(
  websiteId: string,
  regionId: string,
  status: HealthStatus,
  ping: number
) {
  await prisma.websiteTick.create({
    data: {
      websiteId,
      regionId,
      status,
      ping,
    },
  });
}
async function fetchWebsites(url: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    axios
      .get(url)
      .then(async () => {
        const endTime = Date.now();
        await updateDB(id, REGION_ID, "UP", endTime - startTime);
        resolve();
      })
      .catch(async () => {
        const endTime = Date.now();
        await updateDB(id, REGION_ID, "DOWN", endTime - startTime);
        resolve();
      });
  });
}

//before calling main let's check the region id is valid or not

async function validateRegion() {
  try {
    const regionId = await prisma.region.findFirst({
      where: {
        id: REGION_ID,
      },
    });

    if (!regionId) {
      throw new Error("Region Id is not valid");
    }
    //it means the region id is valid
    main(); //calling main function
  } catch (error) {
    console.log("Something went wrong while starting a worker...!!");
    console.log(error);
  }
}

validateRegion();
