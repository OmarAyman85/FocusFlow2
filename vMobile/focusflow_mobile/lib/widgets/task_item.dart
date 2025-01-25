import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';

class TaskItem extends StatelessWidget {
  final Task task;

  TaskItem({required this.task});

  void _deleteTask(BuildContext context) {
    Provider.of<TaskProvider>(context, listen: false).deleteTask(task.id);
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(task.title),
      subtitle: Text(task.description),
      trailing: IconButton(
        icon: Icon(Icons.delete),
        onPressed: () => _deleteTask(context),
      ),
    );
  }
}
