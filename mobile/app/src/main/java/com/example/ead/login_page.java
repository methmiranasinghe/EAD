package com.example.ead;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class login_page extends AppCompatActivity {

    Button login_page_btn;
    EditText nic_login, password_login;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_page);

        login_page_btn = findViewById(R.id.login_page_btn);
        nic_login = findViewById(R.id.nic_login);
        password_login = findViewById(R.id.password_login);

        login_page_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(login_page.this, dashboard.class);
                startActivity(intent);
            }
        });
    }
}