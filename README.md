# A Todo List Trello

```
# Trello-A-Todo-List

A simple task management board inspired by Trello, built with React (Vite) frontend and FastAPI backend.  
Users can organize tasks by dragging and dropping them between **To Do**, **In Progress**, and **Done** columns.  
The app supports creating, editing, deleting, and moving tasks, with data persistence via MongoDB.

---

## Live Demo

Frontend deployed on Vercel:https://a-todo-list-trello.vercel.app/
Backend deployed on Render: https://trello-a-todo-list-backend.onrender.com/

---

## Features

- View tasks organized into three columns: To Do, In Progress, Done  
- Create new tasks with title and optional description  
- Edit existing tasks  
- Delete tasks  
- Drag and drop tasks between columns with `react-beautiful-dnd`  
- State persists and syncs with backend MongoDB database  

---

## Technologies Used

### Frontend

- React with Vite  
- Tailwind CSS  
- react-beautiful-dnd  
- Axios  

### Backend

- FastAPI  
- Motor (Async MongoDB driver)  
- MongoDB Atlas  
- CORS Middleware  

---

## Getting Started

### Prerequisites

- Node.js (v16+) and npm/yarn  
- Python 3.9+  
- MongoDB Atlas or local MongoDB instance  
- Git

### Setup Instructions

1. Clone the repo:  
   `git clone https://github.com/ygyashgoyal/Trello.git`  
   `cd Trello`

2. Backend setup:  
```

cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

```
Create a `.env` file with your MongoDB URI:  
`MONGO_URI=your_mongodb_connection_string`  
Run backend:  
`uvicorn main:app --reload`

3. Frontend setup:  
```

cd ../frontend
npm install

```
Add `.env` file with backend URL:  
`VITE_API_URL=http://localhost:8000`  
Start frontend:  
`npm run dev`

Open `http://localhost:3000` in browser.

---

## Deployment

- Backend deployed on Render: https://trello-a-todo-list-backend.onrender.com  
- Frontend deployed on Vercel: https://your-frontend-url.vercel.app

Make sure frontend `.env` points to your deployed backend URL.

---

## AI Usage Disclosure

This project was assisted by AI tools (OpenAI’s ChatGPT) to enhance development speed and code quality.

---

## Contact

For questions, contact:  
Developer – yashgoyal@example.com

---

## License

MIT License

---

Thank you for checking out my project!
```
