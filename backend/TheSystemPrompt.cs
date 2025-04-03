namespace CareerAnalystAI;

public class TheSystemPrompt
{
    public string SystemText { get; private set; } = "";

    public TheSystemPrompt() { }
    public TheSystemPrompt(string input)
    {
        this.SystemText = input;
    }
}
