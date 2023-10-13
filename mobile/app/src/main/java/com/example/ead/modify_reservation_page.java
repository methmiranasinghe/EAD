package com.example.ead;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class modify_reservation_page extends AppCompatActivity {

    Button update_reservation_btn, delete_reservation_btn;
    EditText reservation_id_modify, nic_updateReservation, origin_create, destination_create, date_create;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_modify_reservation_page);

        update_reservation_btn = findViewById(R.id.create_reservation_btn);
        delete_reservation_btn = findViewById(R.id.delete_reservation_btn);
        reservation_id_modify = findViewById(R.id.reservation_id_modify);
        nic_updateReservation = findViewById(R.id.nic_updateReservation);
        origin_create = findViewById(R.id.origin_create);
        destination_create = findViewById(R.id.destination_create);
        date_create = findViewById(R.id.date_create);


        update_reservation_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(modify_reservation_page.this, view_bookings_page.class);
                startActivity(intent);
            }
        });

        delete_reservation_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(modify_reservation_page.this, view_bookings_page.class);
                startActivity(intent);
            }
        });
    }
}