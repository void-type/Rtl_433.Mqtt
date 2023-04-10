﻿using Swashbuckle.AspNetCore.SwaggerUI;
using System.Reflection;
using System.Text;
using VoidCore.AspNet.Security;
using VoidCore.Model.Guards;

namespace HomeSensors.Web.Configuration;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSwaggerWithCsp(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            // Set the comments path for the Swagger JSON and UI.
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        });

        // Add CSP nonces to Swashbuckle's embedded resources.
        // Borrowed from https://mderriey.com/2020/12/14/how-to-lock-down-csp-using-swachbuckle/
        services
            .AddOptions<SwaggerUIOptions>()
            .Configure<IHttpContextAccessor>((swaggerUiOptions, httpContextAccessor) =>
            {
                // Get a reference to the original stream factory
                var originalStreamFactory = swaggerUiOptions.IndexStream;

                // Override the factory
                swaggerUiOptions.IndexStream = () =>
                {
                    // Get the original index.html contents
                    using var originalStream = originalStreamFactory();
                    using var originalStreamReader = new StreamReader(originalStream);
                    var originalHtml = originalStreamReader.ReadToEnd();

                    // Get the request-specific nonce generated by the VoidCore.AspNet.Security CSP Middleware.
                    var nonce = httpContextAccessor.HttpContext.EnsureNotNull().GetNonce();

                    // Replace inline `<script>` and `<style>` tags by adding a `nonce` attribute to them
                    var newHtml = originalHtml
                    .Replace("<script>", $"<script nonce=\"{nonce}\">", StringComparison.OrdinalIgnoreCase)
                    .Replace("<style>", $"<style nonce=\"{nonce}\">", StringComparison.OrdinalIgnoreCase);

                    // Return a new Stream that contains our modified contents
                    return new MemoryStream(Encoding.UTF8.GetBytes(newHtml));
                };
            });

        return services;
    }
}
