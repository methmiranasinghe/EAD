package com.example.ead;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class profile_page extends AppCompatActivity {

    Button update_profile_btn, delete_profile_btn;
    EditText nic_profile, firstname_profile, lastname_profile, email_profile, gender_profile, number_profile, status_profile, password_profile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_page);

        update_profile_btn = findViewById(R.id.update_profile_btn);
        delete_profile_btn = findViewById(R.id.delete_profile_btn);
        nic_profile = findViewById(R.id.nic_profile);
        firstname_profile = findViewById(R.id.firstname_profile);
        lastname_profile = findViewById(R.id.lastname_profile);
        email_profile = findViewById(R.id.email_profile);
        gender_profile = findViewById(R.id.gender_profile);
        number_profile = findViewById(R.id.number_profile);
        status_profile = findViewById(R.id.status_profile);
        password_profile = findViewById(R.id.password_profile);

        update_profile_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(profile_page.this, dashboard.class);
                startActivity(intent);
            }
        });

        delete_profile_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(profile_page.this, dashboard.class);
                startActivity(intent);
            }
        });

    }
}