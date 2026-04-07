
import React from 'react';
import ChatInterface from '../../components/ChatInterface';
import { is3Config } from './config';

const AssistantPage = () => (
    <div className="-m-8">
        <ChatInterface
            systemPrompt={is3Config.systemPrompt}
            welcomeMessage={is3Config.welcomeMessage}
            containerClassName="h-[calc(100vh-200px)] max-h-[800px] rounded-2xl"
            chatContext="is3_assistant"
        />
    </div>
);

export default AssistantPage;