from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os,json
from bson import json_util
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

def parse_json(data):
    return json.loads(json_util.dumps(data))

class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        todos = db.todos.find()  # retrieve all documents from the 'todos' collection
        todo_list = []
        for todo in todos:
            todo_list.append(todo)  # add each document to the list
        return Response(parse_json(todo_list), status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        todo_data = request.data  # retrieve the todo item from the request
        result = db.todos.insert_one(todo_data)  # insert the todo item into the 'todos' collection
        print(result,type(result))
        print(request,type(request))
        print(todo_data,type(todo_data))
        if result.acknowledged:
            return Response(parse_json(todo_data), status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Failed to create todo item"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

