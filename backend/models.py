from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str = ""
    status: str

class TaskUpdate(TaskCreate):
    pass

class Task(TaskCreate):
    id: int
