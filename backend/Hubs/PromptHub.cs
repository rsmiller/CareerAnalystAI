using Microsoft.AspNetCore.SignalR;
using OpenAI.Chat;
using System.ClientModel;

namespace CareerAnalystAI.Hubs;

public class PromptHub : Hub
{
    private readonly ChatClient _apiClient;
    private readonly TheSystemPrompt _systemPrompt;

    public PromptHub(ChatClient chatClient, TheSystemPrompt systemPrompt)
    {
        _apiClient = chatClient;
        _systemPrompt = systemPrompt;
    }

    public async Task StreamChat(string prompt_text)
    {
        List<ChatMessage> messages =
        [
            new SystemChatMessage(_systemPrompt.SystemText),
            new UserChatMessage(prompt_text),
        ];


        AsyncCollectionResult<StreamingChatCompletionUpdate> completionUpdates = _apiClient.CompleteChatStreamingAsync(messages);

        await foreach (StreamingChatCompletionUpdate completionUpdate in completionUpdates)
        {
            if (completionUpdate.ContentUpdate.Count > 0)
            {
                await Clients.Caller.SendAsync("ReceiveChunk", completionUpdate.ContentUpdate[0].Text);
            }
        }

        await Clients.Caller.SendAsync("Complete");
    }
}
