
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

let tasks = [
    { id: 1, employee: "Rahul", task: "Complete project" },
    { id: 2, employee: "Amit", task: "Prepare report" }
];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Employee Task Management API');
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Add new task
app.post('/tasks', (req, res) => {

    console.log("Body received:", req.body);

    let data = req.body;

    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (error) {
            return res.status(400).json({ message: "Invalid JSON" });
        }
    }

    const { employee, task } = data || {};

    if (!employee || !task) {
        return res.status(400).json({
            message: "Employee and task are required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        employee,
        task
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).send('Task not found');
    }

    task.employee = req.body.employee || task.employee;
    task.task = req.body.task || task.task;

    res.json({
        message: 'Task updated successfully',
        updatedTask: task
    });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.send('Task deleted successfully');
});

// Start server
app.listen(4000, () => {
    console.log('Express server running on port 4000');
});
