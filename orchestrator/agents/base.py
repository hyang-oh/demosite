"""Base agent class for team orchestration."""
from abc import ABC, abstractmethod
from typing import Optional
from anthropic import Anthropic


class BaseAgent(ABC):
    """Base class for all agents in the team."""

    def __init__(self, name: str, model: str, system_prompt: str):
        """Initialize agent with Anthropic client and configuration.

        Args:
            name: Agent identifier (e.g., 'Reader', 'Designer')
            model: Claude model ID (e.g., 'claude-opus-4-6')
            system_prompt: System prompt for the agent
        """
        self.name = name
        self.model = model
        self.client = Anthropic()
        self.system_prompt = system_prompt
        self.messages = []

    def send_message(self, user_message: str) -> str:
        """Send message and get response from Claude.

        Args:
            user_message: The message to send to Claude

        Returns:
            Claude's response text
        """
        self.messages.append({
            "role": "user",
            "content": user_message
        })

        response = self.client.messages.create(
            model=self.model,
            max_tokens=8000,
            system=self.system_prompt,
            messages=self.messages
        )

        assistant_message = response.content[0].text
        self.messages.append({
            "role": "assistant",
            "content": assistant_message
        })

        return assistant_message

    @abstractmethod
    def run(self, input_data: Optional[str] = None) -> str:
        """Run the agent's main task.

        Args:
            input_data: Optional input data from previous agent

        Returns:
            Agent's output
        """
        pass

    def save_output(self, filename: str, content: str) -> None:
        """Save agent output to file.

        Args:
            filename: Output filename
            content: Content to save
        """
        import os
        output_dir = os.path.join(os.path.dirname(__file__), '..', 'output')
        os.makedirs(output_dir, exist_ok=True)

        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✅ Saved: {filename}")
