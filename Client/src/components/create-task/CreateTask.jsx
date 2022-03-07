import React, { useState } from 'react';
import { SaveIcon } from '@heroicons/react/outline';
import axios from 'axios';

const CreateTask = ({ setOpen }) => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [duration, setDuration] = useState(0);
  const [importance, setImportance] = useState('');

  const submitTask = (e) => {
    const task = new FormData();

    task.append('title', title);
    task.append('image', img);
    task.append('duration', duration);
    task.append('importance', importance);

    e.preventDefault();
    axios
      .post('http://localhost:3030/tasks/create', task)
      .then((res) => setOpen(false));
  };

  return (
    <div className="bg-white p-4">
      <form
        className="flex flex-col gap-8"
        onSubmit={submitTask}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-2">
          <label>Task Name</label>
          <input
            type="text"
            className="bg-slate-50 py-2 px-4 rounded-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            className="bg-slate-50 py-2 px-4 rounded-lg"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setImg(e.target.files[0]);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Set Duration</label>
          <input
            type="number"
            className="bg-slate-50 py-2 px-4 rounded-lg"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Set Importance</label>
          <select
            className="bg-slate-50 py-2 px-4 rounded-lg"
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value=""></option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-slate-600 flex gap-2 py-2 px-4 rounded-lg text-white justify-center active:bg-slate-900 active:translate-y-1"
        >
          {' '}
          <SaveIcon className="h-6 w-6" /> Save Task{' '}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
