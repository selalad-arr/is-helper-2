
import React from 'react';
import ChatInterface from '../../components/ChatInterface';
import { is2Config } from './config';

const AssistantPage = () => (
    <div className="-m-8">
        <ChatInterface
            systemPrompt={is2Config.systemPrompt}
            welcomeMessage={is2Config.welcomeMessage}
            containerClassName="h-[calc(100vh-200px)] max-h-[800px] rounded-2xl"
            chatContext="is2_assistant"
        />
    </div>
);

export default AssistantPage;