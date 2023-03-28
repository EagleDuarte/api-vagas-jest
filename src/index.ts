import { RedisConnection } from "./main/database/redis.connection";
import { DatabaseConnection } from "./main/database/typeorm.connection";
import { runServer } from "./main/server/express.server";

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()])
.then(() => {
  runServer();
})
