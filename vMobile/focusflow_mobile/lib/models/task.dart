class Task {
  final String id;
  final String title;
  final String description;

  Task({required this.id, required this.title, required this.description});

  // Convert JSON to Task object
  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['_id'],
      title: json['title'],
      description: json['description'],
    );
  }
}
