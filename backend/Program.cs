using CareerAnalystAI;
using CareerAnalystAI.Hubs;
using OpenAI.Chat;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();

var gpt_version = Environment.GetEnvironmentVariable("GPT_MODEL");
var gpt_api_key = Environment.GetEnvironmentVariable("GPT_API_KEY");

var openAIClient = new ChatClient(model: gpt_version, apiKey: gpt_api_key);
builder.Services.AddSingleton(openAIClient);

var system_test = File.ReadAllText("systems_prompt.txt");
builder.Services.AddSingleton(new TheSystemPrompt(system_test));

// TODO: This will need to change if in prod
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowed(_ => true);
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// TODO: This will need to change before production
//app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();
app.MapHub<PromptHub>("/prompthub");

app.Run();
