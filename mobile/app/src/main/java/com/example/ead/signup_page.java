package com.example.ead;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class signup_page extends AppCompatActivity {

    Button register_btn;
    EditText firstname_sign, lastname_sign, nic_sign, gender_sign, email_sign, number_sign, password_sign, status_sign;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup_page);

        register_btn = findViewById(R.id.register_btn);
        nic_sign = findViewById(R.id.nic_profile);
        firstname_sign = findViewById(R.id.firstname_profile);
        lastname_sign= findViewById(R.id.lastname_profile);
        gender_sign = findViewById(R.id.gender_profile);
        status_sign = findViewById(R.id.status_profile);
        email_sign = findViewById(R.id.email_profile);
        number_sign = findViewById(R.id.number_profile);
        password_sign = findViewById(R.id.password_profile);

        register_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //traveler trl = new traveler();
                String nic = nic_sign.getText().toString().trim();
                String firstName = firstname_sign.getText().toString().trim();
                String lastName = lastname_sign.getText().toString().trim();
                String gender = gender_sign.getText().toString().trim();
                String email = email_sign.getText().toString().trim();
                String number = number_sign.getText().toString().trim();
                String status = status_sign.getText().toString().trim();
                String pw = password_sign.getText().toString().trim();

                //trl.setTravelerNic(nic);
                //trl.setTravelerPassword(pw);

                Toast.makeText(signup_page.this, "You have registered", Toast.LENGTH_SHORT).show();
                Intent moveTologin = new Intent(signup_page.this, login_page.class);
                startActivity(moveTologin);
            }
        });
    }
}