import { SlideConfig } from "../core/types";

// Section 0: 오프닝 (3장)
import TitleSlide from "./opening/TitleSlide";
import SpeakerIntroSlide from "./opening/SpeakerIntroSlide";
import SummarySlide from "./opening/SummarySlide";

// Section 1: 왜 지금 AI 에이전트인가 (7장)
import KeyNumbersSlide from "./module1/KeyNumbersSlide";
import ParadigmShiftSlide from "./module1/ParadigmShiftSlide";
import AgencyFitSlide from "./module1/AgencyFitSlide";
import CoworkLaunchSlide from "./module1/CoworkLaunchSlide";
import RealCasesSlide from "./module1/RealCasesSlide";
import VibeCodingSlide from "./module1/VibeCodingSlide";
import KoreanMarketSlide from "./module1/KoreanMarketSlide";

// Section 2: Claude 생태계 한눈에 (10장)
import ThreeStageSlide from "./module2/ThreeStageSlide";
import EngineeringEvolutionSlide from "./module2/EngineeringEvolutionSlide";
import MCPSlide from "./module2/MCPSlide";
import SkillsSlide from "./module2/SkillsSlide";
import SubagentsSlide from "./module2/SubagentsSlide";
import WhatIsAgentSlide from "./module2/WhatIsAgentSlide";
import AgentTeamsSlide from "./module2/AgentTeamsSlide";
import ClaudeMDSlide from "./module3/ClaudeMDSlide";
import HooksSlide from "./module3/HooksSlide";
import AgentSDKSlide from "./module2/AgentSDKSlide";

// Section 3: 에이전시에 에이전틱 팀 도입하기 (13장)
import EcosystemSummarySlide from "./module2/EcosystemSummarySlide";
import WorkflowMappingSlide from "./module3/WorkflowMappingSlide";
import AgentTeamIntroSlide from "./module3/AgentTeamIntroSlide";
import BlogPipelineSlide from "./module3/BlogPipelineSlide";
import PipelineOptimizationSlide from "./module3/PipelineOptimizationSlide";
import AgencyPipelineSlide from "./module3/AgencyPipelineSlide";
import DesignFeedbackSlide from "./module3/DesignFeedbackSlide";
import ModelPricingSlide from "./module3/ModelPricingSlide";
import AgencyCostSlide from "./module3/AgencyCostSlide";
import CostInsightSlide from "./module3/CostInsightSlide";
import ScenarioKickoffSlide from "./module3/ScenarioKickoffSlide";
import ScenarioCodeReviewSlide from "./module3/ScenarioCodeReviewSlide";
import ScenarioWeeklyReportSlide from "./module3/ScenarioWeeklyReportSlide";

// Section 4: 라이브 데모 (6장)
import DemoIntroSlide from "./module4/DemoIntroSlide";
import Demo1NanobanaSlide from "./module4/Demo1NanobanaSlide";
import Demo2OpenclawSlide from "./module4/Demo2OpenclawSlide";
import Demo3NotebookLMSlide from "./module4/Demo3NotebookLMSlide";
import Demo4AgentTeamSlide from "./module4/Demo4AgentTeamSlide";
import Demo5BluemangoSlide from "./module4/Demo5BluemangoSlide";

// Section 5: 내일부터 할 수 있는 것 (9장)
import Level1Slide from "./module5/Level1Slide";
import Level2Slide from "./module5/Level2Slide";
import Level3Slide from "./module5/Level3Slide";
import RoadmapSlide from "./module5/RoadmapSlide";
import ResourcesSlide from "./module5/ResourcesSlide";
import FAQSlide from "./module5/FAQSlide";
import ClosingMessageSlide from "./module5/ClosingMessageSlide";
import QASlide from "./module5/QASlide";
import ThankYouSlide from "./module5/ThankYouSlide";

export const slides: SlideConfig[] = [
  // Section 0: 오프닝 (3장, #0~2)
  { id: "title", section: 0, component: TitleSlide },
  { id: "speaker-intro", section: 0, component: SpeakerIntroSlide },
  { id: "summary", section: 0, component: SummarySlide },

  // Section 1: 왜 지금 AI 에이전트인가 (7장, #3~9)
  { id: "key-numbers", section: 1, component: KeyNumbersSlide },
  { id: "paradigm-shift", section: 1, component: ParadigmShiftSlide },
  { id: "agency-fit", section: 1, component: AgencyFitSlide },
  { id: "cowork-launch", section: 1, component: CoworkLaunchSlide },
  { id: "real-cases", section: 1, component: RealCasesSlide },
  { id: "vibe-coding", section: 1, component: VibeCodingSlide },
  { id: "korean-market", section: 1, component: KoreanMarketSlide },

  // Section 2: Claude 생태계 한눈에 (10장, #10~19)
  { id: "three-stage", section: 2, component: ThreeStageSlide },
  { id: "engineering-evolution", section: 2, component: EngineeringEvolutionSlide },
  { id: "mcp", section: 2, component: MCPSlide },
  { id: "skills", section: 2, component: SkillsSlide },
  { id: "subagents", section: 2, component: SubagentsSlide },
  { id: "what-is-agent", section: 2, component: WhatIsAgentSlide },
  { id: "agent-teams", section: 2, component: AgentTeamsSlide },
  { id: "claude-md", section: 2, component: ClaudeMDSlide },
  { id: "hooks", section: 2, component: HooksSlide },
  { id: "agent-sdk", section: 2, component: AgentSDKSlide },

  // Section 3: 에이전시에 에이전틱 팀 도입하기 (13장, #20~32)
  { id: "ecosystem-summary", section: 3, component: EcosystemSummarySlide },
  { id: "workflow-mapping", section: 3, component: WorkflowMappingSlide },
  { id: "agent-team-intro", section: 3, component: AgentTeamIntroSlide },
  { id: "blog-pipeline", section: 3, component: BlogPipelineSlide },
  { id: "pipeline-optimization", section: 3, component: PipelineOptimizationSlide },
  { id: "agency-pipeline", section: 3, component: AgencyPipelineSlide },
  { id: "design-feedback", section: 3, component: DesignFeedbackSlide },
  { id: "model-pricing", section: 3, component: ModelPricingSlide },
  { id: "agency-cost", section: 3, component: AgencyCostSlide },
  { id: "cost-insight", section: 3, component: CostInsightSlide },
  { id: "scenario-kickoff", section: 3, component: ScenarioKickoffSlide },
  { id: "scenario-code-review", section: 3, component: ScenarioCodeReviewSlide },
  { id: "scenario-weekly-report", section: 3, component: ScenarioWeeklyReportSlide },

  // Section 4: 라이브 데모 (6장, #33~38)
  { id: "demo-intro", section: 4, component: DemoIntroSlide },
  { id: "demo-1-nanobana", section: 4, component: Demo1NanobanaSlide },
  { id: "demo-2-openclaw", section: 4, component: Demo2OpenclawSlide },
  { id: "demo-3-notebooklm", section: 4, component: Demo3NotebookLMSlide },
  { id: "demo-4-agent-team", section: 4, component: Demo4AgentTeamSlide },
  { id: "demo-5-bluemango", section: 4, component: Demo5BluemangoSlide },

  // Section 5: 내일부터 할 수 있는 것 (9장, #39~47)
  { id: "level-1", section: 5, component: Level1Slide },
  { id: "level-2", section: 5, component: Level2Slide },
  { id: "level-3", section: 5, component: Level3Slide },
  { id: "roadmap", section: 5, component: RoadmapSlide },
  { id: "resources", section: 5, component: ResourcesSlide },
  { id: "faq", section: 5, component: FAQSlide },
  { id: "closing-message", section: 5, component: ClosingMessageSlide },
  { id: "qa", section: 5, component: QASlide },
  { id: "thank-you", section: 5, component: ThankYouSlide },
];
