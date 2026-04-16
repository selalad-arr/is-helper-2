export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ManualSource {
    type: 'manual';
    topic: string;
    author: string;
    publication: string;
}

export interface ImageSource {
    type: 'image';
    value: string;
    mimeType: string;
}

export interface PresentationSection {
    header: string;
    bullet_points: string[];
}

export interface PresentationContent {
    title: string;
    sections: PresentationSection[];
}

export interface ReportSection {
    header: string;
    guideline: string;
}

export interface ReportChapter {
    chapter_number: number;
    title: string;
    sections: ReportSection[];
}

export interface ReportStructure {
    title: string;
    chapters: ReportChapter[];
}

export interface ChapterGuideline {
    chapter_number: number;
    title: string;
    sections: ReportSection[];
}
