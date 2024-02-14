using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.Extensions;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("MyConnectionString")));
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IWebHostEnvironment>(builder.Environment);

var secretKey= builder.Configuration.GetSection("AppSettings:Key").Value;

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
                        {
                            opt.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuer = false,
                                ValidateAudience = false,
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = key
                            };
                        });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

    //app.ConfigureExceptionHandler(); xu ly loi
      app.UseMiddleware<ExceptionMiddlewares>();
    // app.ConfigureBuiltinExceptionHandler();


   

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseCors(p=>p.AllowAnyOrigin().AllowAnyMethod());
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });



app.Run();
//app.UseExceptionHandler(
//    options=> options.Run(
//            async context =>
//            {
//                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
//                var ex = context.Features.Get<IExceptionHandlerFeature>();
//                if(ex != null)
//                {
//                    await context.Response.WriteAsync(ex.Error.Message);
//                }
//            }
//        )
//    );