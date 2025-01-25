import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:focusflow_mobile/screens/home_screen.dart';

class AddTaskScreen extends StatefulWidget {
  @override
  _AddTaskScreenState createState() => _AddTaskScreenState();
}

class _AddTaskScreenState extends State<AddTaskScreen> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _storage = const FlutterSecureStorage();

  // Function to add a new task
  Future<void> addTask() async {
    final token = await _storage.read(key: 'token');
    final url = Uri.parse('http://192.168.1.4:3001/api/tasks');
    try {
      final response = await http.post(
        url,
        body: json.encode({
          'title': _titleController.text,
          'description': _descriptionController.text,
          "category": "Work",
          "status": "in-progress",
          "priority": "high",
          "dueDate": "2025-02-15T00:00:00.000Z",
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 201) {
        Navigator.pop(context); // Navigate back to the Home Screen
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to add task')),
        );
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('An error occurred!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add Task')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Task Title'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: const InputDecoration(labelText: 'Task Description'),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: addTask,
              child: const Text('Add Task'),
            ),
          ],
        ),
      ),
    );
  }
}
