import 'package:flutter/material.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(slivers: [
        SliverAppBar(
          title:
              Center(child: Text('Settings', style: TextStyle(fontSize: 22))),
          backgroundColor: Colors.black,
          automaticallyImplyLeading: true,
          actions: [
            SizedBox(
              child: TextButton(
                  onPressed: () {},
                  child: const Text('Save',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 22,
                          color: Colors.green))),
            )
          ],
        ),
        SliverList(
          delegate: SliverChildListDelegate([
            // ADD API CONNECTION HERE
            // SHOW THE ACTIVE USER'S EMAIL AS THE APP BAR TITLE
            // DELETE THIS COMMENT
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Text('Signed in as "email here"',
                  style: TextStyle(fontSize: 20)),
            ),
            Divider(
              thickness: 1,
            ),

            // THIS BUTTON MAKES A POPUP TO CONFIRM PASSWORD AND ENTER NEW PASSWORD
            ElevatedButton(
              onPressed: () {},
              child: Text('Change password?'),
              style: ElevatedButton.styleFrom(
                primary: Colors.red,
                textStyle: TextStyle(fontSize: 20),
              ),
            ),

            // SIGNS OUT OF APP
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/login');
              },
              child: Text('Sign out'),
              style: ElevatedButton.styleFrom(
                primary: Colors.orange,
                textStyle: TextStyle(fontSize: 20),
              ),
            ),
            SizedBox(height: 20),
            Row(
              children: [
                SizedBox(
                  width: 20,
                ),
                Text('Profile', style: TextStyle(fontSize: 25)),
              ],
            ),
            SizedBox(height: 20),
            Row(
              children: [
                SizedBox(width: 20),
                Expanded(
                  // ADD API CONNECTION HERE
                  // SHOW THE USER'S FIRST NAME IN THE LEFT FIELD
                  // DELETE THIS COMMENT
                  child: TextField(
                    onChanged: (text) {},
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        hintText: "First name",
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32.0))),
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  // ADD API CONNECTION HERE
                  // SHOW THE USER'S LAST NAME IN THE RIGHT FIELD
                  // DELETE THIS COMMENT
                  child: TextField(
                    onChanged: (text) {},
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        hintText: "Last name",
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32.0))),
                  ),
                ),
                SizedBox(width: 20),
              ],
            ),
            Row(
              children: [
                SizedBox(width: 20),
                Expanded(
                  child: TextField(
                    onChanged: (text) {},
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        hintText: "Password",
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32.0))),
                  ),
                ),
                SizedBox(width: 20),
              ],
            ),
            // ADD API CONNECTION HERE
            // UPDATE THE USER'S SETTINGS
            // DELETE THIS COMMENT
            ElevatedButton(
              onPressed: () {},
              child: Text('Update'),
              style: ElevatedButton.styleFrom(
                primary: Colors.blue,
                textStyle: TextStyle(fontSize: 20),
              ),
            ),
            SizedBox(height: 300),
            ElevatedButton(
              // ADD API CONNECTION HERE
              // DELETE USER'S ACCOUNT
              // DELETE THIS COMMENT
              onPressed: () {},
              child: Text('Delete account'),
              style: ElevatedButton.styleFrom(
                primary: Colors.red,
                textStyle: TextStyle(fontSize: 20),
              ),
            ),
          ]),
        )
      ]),
    );
  }
}
