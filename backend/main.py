from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()  # loads .env file into environment variables

app = FastAPI()
origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

MONGO_DETAILS = os.getenv("MONGO_URI")
if not MONGO_DETAILS:
    raise Exception("MONGO_URI environment variable not set")

client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.todo_db
tasks_collection = db.tasks

class Task(BaseModel):
    id: str
    title: str
    description: str = ""
    status: str  # todo, inprogress, done
    userId: str

def task_helper(task) -> dict:
    return {
        "id": task["id"],
        "title": task["title"],
        "description": task.get("description", ""),
        "status": task["status"],
        "userId": task["userId"],
    }

@app.get("/tasks", response_model=List[Task])
async def get_tasks(userId: str = Query(...)):
    tasks = []
    cursor = tasks_collection.find({"userId": userId})
    async for task in cursor:
        tasks.append(task_helper(task))
    return tasks

@app.post("/tasks")
async def add_task(task: Task):
    await tasks_collection.insert_one(task.dict())
    return {"message": "Task added."}

@app.put("/tasks/{task_id}")
async def update_task(task_id: str, updated_task: Task):
    result = await tasks_collection.update_one({"id": task_id}, {"$set": updated_task.dict()})
    if result.modified_count == 1:
        return {"message": "Updated"}
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    result = await tasks_collection.delete_one({"id": task_id})
    if result.deleted_count == 1:
        return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Task not found")
