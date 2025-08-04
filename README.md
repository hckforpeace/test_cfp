# Installation
``` bash
git clone https://github.com/hckforpeace/test_cfp
cd test_cfp
```

## Run backend
* Open a new Terminal
``` bash
cd backend && npm run start
```

## Run frontend 
* Open a new Terminal
``` bash
cd frontend && npm run dev
```

## Tech Stack
* backend (node.js / fastify / Typescript)
* frontend (node.js / react.js / Typescript)

### Access the site Via
url: http://localhost:5173

### What I did
A simple site where you have tasks displayed in a table
you can add, delete, change (status), list the tasks

backend routes:
* GET /tasks Returns all the tasks
* POST /tasks Creates a task
* DELETE /tasks/:id Deletes a task using it's id
* PATCH /tasks/:id (Optionnel) Updates status of of the task (pending, done)
