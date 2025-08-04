import {
  retreiveTasks,
  createTaskController,
  removeTaskById,
  toggleStatus,
} from "../controllers/tasks.controllers";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function routes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get("/tasks", retreiveTasks);
  fastify.post("/task", createTaskController);
  fastify.delete("/task/:id", removeTaskById);
  fastify.patch("/task/:id", toggleStatus);
}

export default routes;
