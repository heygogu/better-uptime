import { createClient } from "redis";

const STREAM_NAME = "betteruptime:website";

const client = await createClient()
  .on("error", (err) => {
    console.log("Redis client error", err);
    throw new Error("Redis client error");
  })
  .connect();

type WebsiteEvent = {
  url: string;
  id: string;
};

type MessageType = {
  id: string;
  message: {
    url: string;
    id: string;
  };
};

async function xAdd({ url, id }: WebsiteEvent) {
  await client.xAdd(STREAM_NAME, "*", {
    url,
    id,
  });
}

async function xAck(consumerGroup: string, stream_id: string) {
  await client.xAck(STREAM_NAME, consumerGroup, stream_id);
}

export async function xReadGroup(
  consumerGroup: string,
  workerId: string
): Promise<MessageType[] | undefined> {
  const res = await client.xReadGroup(
    consumerGroup,
    workerId,
    {
      key: STREAM_NAME,
      id: ">",
    },
    {
      COUNT: 5,
    }
  );

  //@ts-ignore
  let messages: MessageType[] | undefined = res?.[0]?.messages;

  return messages;
}

// export async function xAck() {
//   await client.xAck("betteruptime:website", "");
// }
export async function xAddBulk(websites: WebsiteEvent[]) {
  websites.forEach(async (x) => {
    await xAdd({
      url: x.url,
      id: x.id,
    });
  });
}

export async function xAckBulk(consumerGroup: string, eventsIds: string[]) {
  eventsIds.forEach(async (x) => {
    await xAck(consumerGroup, x);
  });
}
