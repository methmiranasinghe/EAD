using TicketReservation.Controllers;
using TicketReservation.Data;
using TicketReservation.Services;
using TravelerAppService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("ConnectionStrings"));

builder.Services.AddSingleton<TravellerServices>();
builder.Services.AddSingleton<BackofficerServices>();
builder.Services.AddSingleton<BookingService>();
builder.Services.AddSingleton<ReservationService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<TrainService>();

builder.Services.AddControllers();




builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
