import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Todo = model("todo", TodoSchema);

export default Todo;