
import React from 'react';
import ChatInterface from '../../components/ChatInterface';
import { projectCreationConfig } from './config';

const AssistantPage = () => (
    <div className="-m-8">
        <ChatInterface
            systemPrompt={projectCreationConfig.systemPrompt}
            welcomeMessage={projectCreationConfig.welcomeMessage}
            containerClassName="h-[calc(100vh-200px)] max-h-[800px] rounded-2xl"
            chatContext="project_creation_assistant"
        />
    </div>
);

export default AssistantPage;