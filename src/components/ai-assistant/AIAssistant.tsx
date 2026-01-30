import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  Minimize2,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are my obligations as a deployer?",
  "When do I need a FRIA?",
  "What is the February 2025 deadline?",
  "How do I classify my AI system?",
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const streamChat = async (userMessage: string) => {
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Add empty assistant message to start streaming into
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                if (updated[updated.length - 1]?.role === "assistant") {
                  updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                }
                return updated;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev.filter(m => m.content !== ""),
        {
          role: "assistant",
          content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    streamChat(input.trim());
  };

  const handleSuggestedQuestion = (question: string) => {
    streamChat(question);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-accent hover:scale-110 transition-transform"
        size="icon"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        "fixed z-50 flex flex-col shadow-2xl border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300",
        isExpanded
          ? "inset-2 sm:bottom-4 sm:right-4 sm:left-auto sm:top-4 sm:w-[600px]"
          : "bottom-4 right-4 left-4 sm:left-auto w-auto sm:w-[380px] h-[70vh] sm:h-[560px] max-h-[calc(100vh-2rem)]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-success border-2 border-background" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-sm">Klarvo AI</h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground">EU AI Act Expert</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">How can I help you?</h4>
              <p className="text-sm text-muted-foreground">
                Ask me anything about EU AI Act compliance or how to use Klarvo.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Suggested questions</p>
              {SUGGESTED_QUESTIONS.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="w-full text-left text-sm p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                          code: ({ children }) => (
                            <code className="bg-background/50 px-1 py-0.5 rounded text-xs">{children}</code>
                          ),
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        }}
                      >
                        {message.content || "..."}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about EU AI Act compliance..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          AI-powered guidance, not legal advice
        </p>
      </form>
    </Card>
  );
}
