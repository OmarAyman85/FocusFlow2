import 'package:flutter/material.dart';
import 'package:focusflow_mobile/screens/login_screen.dart';
import 'package:focusflow_mobile/screens/home_screen.dart';
import 'package:focusflow_mobile/providers/task_provider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TaskProvider(),
      child: MaterialApp(
        title: 'FocusFlow',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: LoginScreen(),
        routes: {
          '/home': (context) => HomeScreen(),
          '/login': (context) => LoginScreen(),
        },
      ),
    );
  }
}
