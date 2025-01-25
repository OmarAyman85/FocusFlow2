import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:focusflow_mobile/providers/task_provider.dart';
import 'package:provider/provider.dart';
import 'package:focusflow_mobile/screens/add_task_screen.dart';
import 'package:focusflow_mobile/widgets/task_item.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _storage = const FlutterSecureStorage();

  // Check if the user is logged in
  Future<void> _checkLoginStatus() async {
    final token = await _storage.read(key: 'token');
    if (token == null) {
      // If no token found, navigate to login screen
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
    Provider.of<TaskProvider>(context, listen: false).fetchTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        AddTaskScreen()), // Navigate to AddTaskScreen
              );
            },
            child: const Text('Add Task'),
          ),
          Consumer<TaskProvider>(
            builder: (context, taskProvider, _) {
              return Expanded(
                child: ListView.builder(
                  itemCount: taskProvider.tasks.length,
                  itemBuilder: (context, index) {
                    return TaskItem(task: taskProvider.tasks[index]);
                  },
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
