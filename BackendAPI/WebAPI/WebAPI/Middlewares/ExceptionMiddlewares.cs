using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Net;
using WebAPI.Errors;

namespace WebAPI.Middlewares
{
    public class ExceptionMiddlewares
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddlewares> logger;
        private readonly IHostEnvironment env;

        public ExceptionMiddlewares(RequestDelegate next , ILogger<ExceptionMiddlewares> logger, IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task Invoke( HttpContext context)

        {
            try
            {
                await next(context);
            }
            catch (Exception ex ) 
            {
                ApiError response;
                HttpStatusCode statusCode =HttpStatusCode.InternalServerError;
                string message ;
                var exceptionType = ex.GetType();
                if( exceptionType == typeof(UnauthorizedAccessException)) {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorized";
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Some unkonw error occoured";
                }

                if (env.IsEnvironment("Development"))
                {
                    response = new ApiError((int)statusCode, ex.Message, ex.StackTrace.ToString());
                }else{
                    response = new ApiError((int)statusCode,message);
                }
                logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response.ToString());
            }

        }
    }
}
