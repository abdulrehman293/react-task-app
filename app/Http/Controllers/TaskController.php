<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        // Fetch all tasks, ordered by newest first
        $tasks = Task::orderBy('id', 'desc')->get();

        // Render the React component and pass tasks as props
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Create the task
        Task::create($validated);

        // Redirect back (Inertia updates without full reload)
        return redirect()->back();
    }
}
