import productivity from "./productivity-writing.json";
import designGraphics from "./image-editing.json";
import devTools from "./dev-tools.json";
import writingDocs from "./writing-docs.json";
import privacySecurity from "./privacy-security.json";
import utilities from "./utilities.json";
import dataAnalytics from "./data-analytics.json";
import videoEditing from "./video-editing.json";
import audioMusic from "./audio-music.json";
import education from "./education.json";
import lists from "./lists.json";
import chatbotsAssistants from "./chatbots-assistants.json";
import audioVoice from "./audio-voice.json";
import automation from "./automation.json";

// Combine video and audio into Media
const media = [...videoEditing, ...audioMusic];

const toolsData = [
  { title: "Productivity", icon: "⚡", slug: "productivity", tools: productivity },
  { title: "Design & Graphics", icon: "🎨", slug: "design-graphics", tools: designGraphics },
  { title: "Development", icon: "💻", slug: "development", tools: devTools },
  { title: "Writing & Docs", icon: "✍️", slug: "writing-docs", tools: writingDocs },
  { title: "Privacy & Security", icon: "🔒", slug: "privacy-security", tools: privacySecurity },
  { title: "Utilities", icon: "🛠️", slug: "utilities", tools: utilities },
  { title: "Data & Analytics", icon: "📊", slug: "data-analytics", tools: dataAnalytics },
  { title: "Media", icon: "🎬", slug: "media", tools: media },
  { title: "Education", icon: "🎓", slug: "education", tools: education },
  { title: "Lists", icon: "📜", slug: "lists", tools: lists },
  { title: "Chatbots & Assistants", icon: "🤖", slug: "chatbots-assistants", tools: chatbotsAssistants },
  { title: "Audio & Voice", icon: "🎙️", slug: "audio-voice", tools: audioVoice },
  { title: "Automation", icon: "🔌", slug: "automation", tools: automation }
];

export default toolsData;