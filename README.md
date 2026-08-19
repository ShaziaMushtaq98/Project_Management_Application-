# Mini Project Management Application

A React-based project and task management tool.
## Features
Login UI with client-side validation. Dashboard with live stats showing total, completed, and pending tasks. Projects page with a card grid view. Tasks page with search, status filtering, add, edit, and delete functionality, a delete confirmation dialog, the ability to assign tasks to users, and toast notifications for every action. Loading, error, and empty states are handled across all data views. State is managed with Redux Toolkit, and all API calls go through a centralized Axios-based service layer. The UI is fully responsive using Tailwind CSS.

## Tech Stack
React with Vite, React Router DOM, Redux Toolkit, Axios, Tailwind CSS, and react-hot-toast for notifications.

## Project Structure
The `src` folder is organized into `components` for reusable UI pieces like Sidebar, Topbar, TaskModal, ConfirmDialog, StatCard, and Layout. `pages` holds the route-level pages: Login, Dashboard, Projects, and Tasks. `services` contains the Axios instance and API service functions. `store` holds the Redux Toolkit slices for auth, tasks, and projects. `hooks` is for custom hooks, and `utils` is for helper functions.

## Getting Started

Clone the repository using `git clone https://github.com/ShaziaMushtaq98/Project_Management_Application-.git` and then move into the folder with `cd Project_Management_Application-`.

Install dependencies with `npm install`.
Create a `.env` file in the root of the project and add `VITE_API_BASE_URL=https://jsonplaceholder.typicode.com`.

Run the development server with `npm run dev`, then open `http://localhost:5173` in your browser.

## API Notes

This project uses JSONPlaceholder as a base for network calls, combined with an in-memory mock data layer inside the task and project service files, so that create, update, and delete actions behave realistically during a session. These mock arrays can be swapped for real backend endpoints later without changing any other part of the app, since all API logic is isolated in the service layer.

## Login Credentials

This is a demo login. Any valid email format along with a password of six or more characters will work, since no real backend authentication is connected yet.

## Author

Built by Shazia Mushtaq as part of the Frontend Engineering Internship, Week 6 assignment.
