import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:focusflow_mobile/screens/home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _storage = const FlutterSecureStorage();

  // Function to handle login
  Future<void> login() async {
    final url = Uri.parse('http://192.168.1.4:3001/api/auth/login');
    try {
      final response = await http.post(
        url,
        body: json.encode({
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        await _storage.write(key: 'token', value: data['token']);
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) =>
                  HomeScreen()), // Navigate to HomeScreen on successful login
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login failed!')),
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
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: login,
              child: const Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}
