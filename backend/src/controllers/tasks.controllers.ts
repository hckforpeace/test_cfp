import {
	Task,
	addTask,
	getTasks,
	taskSchema,
	removeTask,
	changeState,
} from "../services/tasks.service";
import {
	FastifyReply,
	FastifyRequest,
} from "fastify";

export function retreiveTasks(_req: FastifyRequest, rep: FastifyReply) {
	const result: Array<Task> = getTasks();

	// Let Fastify handle JSON + use correct charset
	return rep
		.code(200)
		.header("Content-Type", "application/json; charset=utf-8")
		.send(result);
}

export function createTaskController(req: FastifyRequest, rep: FastifyReply) {
	const result = taskSchema.safeParse(req.body);

	if (!result.success) {
		return rep.code(400).send(result.error);
	}
	let taskid: number = addTask(result.data);
	return rep.code(201).send(JSON.stringify({ id: taskid }));
}

export function removeTaskById(
	req: FastifyRequest<{ Params: { id: string } }>,
	rep: FastifyReply,
) {
	let id = Number(req.params.id);
	if (isNaN(id)) {
		return rep.code(400).send("wrong type params");
	}
	try {
		removeTask(id);
		return rep.send("success").code(200);
	} catch (error) {
		return rep.code(400).send(error);
	}
}

export function toggleStatus(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply) {
	let id = Number(req.params.id);
	if (isNaN(id)) {
		return rep.code(400).send("wrong type params");
	}
	try {
		changeState(id);
		return rep.send("success").code(200);
	} catch (error) {
		return rep.code(400).send(error);
	}
}
