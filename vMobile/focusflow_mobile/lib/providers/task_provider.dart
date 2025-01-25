import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/task.dart';

class TaskProvider with ChangeNotifier {
  List<Task> _tasks = [];
  final _storage = const FlutterSecureStorage();

  // Fetch tasks from the backend
  Future<void> fetchTasks() async {
    final token = await _storage.read(key: 'token');
    final url = Uri.parse('http://192.168.1.4:3001/api/tasks');
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );
    print(response.body);

    if (response.statusCode == 200) {
      final data = json.decode(response.body) as List;
      _tasks = data.map((item) => Task.fromJson(item)).toList();
      notifyListeners();
    }
  }

  // Delete a task
  Future<void> deleteTask(String id) async {
    final token = await _storage.read(key: 'token');
    final url = Uri.parse('http://192.168.1.4:3001/api/tasks/$id');
    final response = await http.delete(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      _tasks.removeWhere((task) => task.id == id);
      notifyListeners();
    }
  }

  // Get all tasks
  List<Task> get tasks => [..._tasks];
}
