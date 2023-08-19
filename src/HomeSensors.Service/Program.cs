﻿using HomeSensors.Model.Data;
using HomeSensors.Model.Emailing;
using HomeSensors.Model.Repositories;
using HomeSensors.Service;
using HomeSensors.Service.Mqtt;
using HomeSensors.Service.Workers;
using Microsoft.EntityFrameworkCore;
using MQTTnet;
using Serilog;
using VoidCore.Model.Configuration;
using VoidCore.Model.Emailing;
using VoidCore.Model.Time;

var host = Host.CreateDefaultBuilder(args)
    .UseWindowsService()
    .UseSerilog()
    .ConfigureServices((context, services) =>
    {
        services.AddSettingsSingleton<ApplicationSettings>(context.Configuration, true).Validate();
        services.AddSettingsSingleton<MqttSettings>(context.Configuration);
        services.AddSettingsSingleton<NotificationsSettings>(context.Configuration);

        services.AddDbContext<HomeSensorsContext>(ctxOptions => ctxOptions
            .UseSqlServer("Name=HomeSensors", sqlOptions => sqlOptions
                .MigrationsAssembly(typeof(HomeSensorsContext).Assembly.FullName)));

        services.AddScoped<TemperatureReadingRepository>();
        services.AddScoped<TemperatureDeviceRepository>();
        services.AddScoped<TemperatureLocationRepository>();

        services.AddSingleton<IEmailFactory, HtmlEmailFactory>();
        services.AddSingleton<IEmailSender, SmtpEmailer>();
        services.AddSingleton<EmailNotificationService>();
        services.AddSingleton<IDateTimeService, UtcNowDateTimeService>();
        services.AddSingleton<MqttFactory>();

        services.AddScoped<CheckTemperatureLimitsService>();
        services.AddScoped<CheckDevicesService>();

        services.AddHostedService<AlertsWorker>();
        services.AddHostedService<GetMqttTemperaturesWorker>();
        services.AddHostedService<SummarizeTemperatureReadingsWorker>();
    })
    .Build();

var config = host.Services.GetRequiredService<IConfiguration>();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(config)
    .CreateLogger();

try
{
    Log.Information("Configuring host for {Name} v{Version}", ThisAssembly.AssemblyTitle, ThisAssembly.AssemblyInformationalVersion);

    await host.RunAsync();

    Log.Information("Starting host.");
    host.Run();
    return 0;
}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly.");
    return 1;
}
finally
{
    Log.Information("Stopping host.");
    Log.CloseAndFlush();
}
