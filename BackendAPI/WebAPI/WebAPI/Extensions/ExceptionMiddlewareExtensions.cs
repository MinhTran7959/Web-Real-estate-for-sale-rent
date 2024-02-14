using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using WebAPI.Middlewares;

namespace WebAPI.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddlewares>();
        }
            public static void ConfigureBuiltinExceptionHandler(this IApplicationBuilder app) {
          
                app.UseExceptionHandler(
                    options => options.Run(
                            async context =>
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                var ex = context.Features.Get<IExceptionHandlerFeature>();
                                if (ex != null)
                                {
                                    await context.Response.WriteAsync(ex.Error.Message);
                                }
                            }
                        )
                    );
            }
        }
    }

