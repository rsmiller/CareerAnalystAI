export class StreamFormatter {
    private buffer: string = '';
    private output: string = '';
  
    clear()
    {
      this.output = "";
      this.buffer = "";
    }

    appendChunk(chunk: string) {
      this.buffer += chunk;
      this.processBuffer();
    }
  
    flush() {
      // Flush any remaining content (can close tags if you want)
      this.output += this.buffer
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>')
        .replace(/(\r\n|\r|\n)/g, '<br/>');
      this.buffer = '';
      return this.output;
    }
  
    private processBuffer() {
      let match;
      let processed = '';
  
      // Heading H1
      const h1Regex = /^# (.*)(\r\n|\r|\n)/;
      match = this.buffer.match(h1Regex);
      if (match) {
        processed += `<h1>${match[1]}</h1><br/>`;
        this.buffer = this.buffer.slice(match[0].length);
      }
  
      // Heading H2
      const h2Regex = /^## (.*)(\r\n|\r|\n)/;
      match = this.buffer.match(h2Regex);
      if (match) {
        processed += `<h2>${match[1]}</h2><br/>`;
        this.buffer = this.buffer.slice(match[0].length);
      }
  
      // Simple line breaks
      const brRegex = /^([^\n\r]*)(\r\n|\r|\n)/;
      while ((match = this.buffer.match(brRegex))) {
        let line = match[1];
  
        // Replace inline bold and italics
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
        processed += line + '<br/>';
        this.buffer = this.buffer.slice(match[0].length);
      }
  
      this.output += processed;
    }
  }
  