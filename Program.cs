using powerbi_netcore_react_demo.Models;
using powerbi_netcore_react_demo.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped(typeof(AadService));
builder.Services.AddScoped(typeof(PbiEmbedService));

builder.Services.AddControllersWithViews();

builder.Services.Configure<AzureAd>(builder.Configuration.GetSection("AzureAd"));
builder.Services.Configure<PowerBI>(builder.Configuration.GetSection("PowerBI"));

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

app.MapFallbackToFile("index.html");

app.Run();
