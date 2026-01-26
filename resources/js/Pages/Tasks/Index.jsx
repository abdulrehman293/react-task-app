import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, tasks }) {
    // Handle form data and submission
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Send POST request to 'tasks.store' route
        post(route('tasks.store'), {
            onSuccess: () => reset(), // Clear the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Task List
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* THE FORM */}
                        <form onSubmit={submit} className="flex gap-4 mb-8">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                                    placeholder="What needs to be done?"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && (
                                    <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                            >
                                Add Task
                            </button>
                        </form>

                        {/* THE TASK LIST */}
                        <div className="space-y-4">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
                                    >
                                        <span className="text-gray-800">{task.title}</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(task.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">
                                    No tasks yet. Add one above!
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
