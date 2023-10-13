package com.example.ead;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class create_reservation_page extends AppCompatActivity {

    Button create_reservation_btn;
    EditText reservation_id_create, origin_create, date_create, destination_create;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_reservation_page);

        create_reservation_btn = findViewById(R.id.create_reservation_btn);
        reservation_id_create = findViewById(R.id.reservation_id_create);
        origin_create = findViewById(R.id.origin_create);
        date_create = findViewById(R.id.date_create);
        destination_create = findViewById(R.id.destination_create);

        create_reservation_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(create_reservation_page.this, view_bookings_page.class);
                startActivity(intent);
            }
        });
    }
}