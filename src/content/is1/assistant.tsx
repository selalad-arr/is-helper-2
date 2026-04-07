
import React from 'react';
import ChatInterface from '../../components/ChatInterface';
import { is1Config } from './config';

const AssistantPage = () => (
    <div className="-m-8"> 
        <ChatInterface
            systemPrompt={is1Config.systemPrompt}
            welcomeMessage={is1Config.welcomeMessage}
            containerClassName="h-[calc(100vh-200px)] max-h-[800px] rounded-2xl" 
            chatContext="is1_assistant"
        />
    </div>
);

export default AssistantPage;