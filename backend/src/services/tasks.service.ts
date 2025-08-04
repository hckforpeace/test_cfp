import { z } from "zod";

let id_max = 0;

export type Task = {
	id: number;
	title: string;
	description: string;
	status: statusT;
};

export enum statusT {
	pending,
	done,
}

export const taskSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	status: z.enum(statusT),
});

export const idSchema = z.object({
	id: z.number(),
});

export let tasks = new Map<number, Task>();

export function addTask(t: Task): number {
	t.id = id_max;
	tasks.set(t.id, t);
	id_max++;
	return t.id;
}

export function getTasks(): Array<Task> {
	return Array.from(tasks.values());
}

export function removeTask(id: number) {
	if (!tasks.has(id)) {
		throw new Error("Wrong id");
	}
	return tasks.delete(id);
}

export function changeState(id: number) {
	if (!tasks.has(id)) {
		throw new Error("Wrong id");
	}
	let task = tasks.get(id);
	if (!task) {
		throw new Error("unexpected error");
	}
	task.status = task.status == 1 ? 0 : 1;
}
